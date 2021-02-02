import { Router } from 'express';
import { body } from 'express-validator';
import { emailExists } from '../models/users';
import { AuthController } from '../controllers/auth';
import { validar } from '../middlewares/validacion';
import { password } from '../services/passport';


const router = Router();

router.post('/register', [
    body('username')
        .isLength({min: 5})
        .withMessage('Tiene que ser de 5 carácteres como mínimo')
       ,
    body('password').isLength({min: 8}).withMessage('Password debe ser como mínimo de 8 carácteres'),
    body('email')
        .isEmail()
        .withMessage('El campo email debe ser un email válido')
        .custom(async email => {
            if( await emailExists(email)) {
                throw new Error('Este email ya está registrado. Introduzca otro distinto');
            } else {  
                return true;
            }
        }),
    body('id').not().exists().withMessage('El ID se dará automaticamente')
],
validar, 
AuthController.register);

router.post('/login',
    password(),
    AuthController.login
    );


export default router;