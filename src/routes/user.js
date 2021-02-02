import { Router } from 'express';
import { UserController } from '../controllers/user';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { emailExists } from '../models/users'
import { token } from '../services/passport';


const router = Router();

router.get('/', token(), UserController.todosLosUsuarios);

router.get('/:id', token(),
    validar,
    UserController.usuarioPorId);

router.post('/', token(), [
    body('username').isLength({ min: 5 }).withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
    body('email')
        .isEmail()
        .withMessage('El campo email debe ser un email válido')
        .custom(email => {
            if (emailExists(email)) {
                throw new Error('El email ya está registrado. Proporcione un valor diferente');
            } else {
                return true;
            }
        }),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
    validar,
    UserController.nuevoUsuario);

router.put('/:id', token(), UserController.editarUsuario);

router.delete('/:id', token(), UserController.eliminarUsuario);

export default router;