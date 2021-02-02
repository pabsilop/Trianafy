import { Router } from "express";
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { SongController } from '../controllers/song'
import { token } from "../services/passport";

const router = Router();
//Gets
//Ver todas las canciones existentes
router.get('/', token(), SongController.todasLasCanciones);
//Ver la informacion de una canción seleccionada
router.get('/:id',
    validar, SongController.cancionPorId);
//Post
//Añade una nueva canción.
router.post('/', [
    body('title')
                .isLength({min:6}).withMessage('Longitud de titulo minima de 6 caracteres.')
                .exists().withMessage('El campo title es requerido.')
                .not().isEmpty().withMessage('El campo title es requerido.'),

    body('artist')
                .exists().withMessage('El campo artist es requerido.')
                .not().isEmpty().withMessage('El campo artist es requerido.'),

    body('album')
                .exists().withMessage('El campo album es requerido.')
                .not().isEmpty().withMessage('El campo album es requerido.')
],
    validar, SongController.nuevaCancion);
// Put
// Modificar el contenido de una canción
router.put('/:id', SongController.editarCancion);

//Delete
//Borrar una canción
router.delete('/:id', SongController.eliminarCancion);

export default router;