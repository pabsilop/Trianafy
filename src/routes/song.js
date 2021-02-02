import { Router } from "express";
import { body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { SongController } from '../controllers/song'
import { token } from "../services/passport";

const router = Router();

router.get('/', token(), SongController.todasLasCanciones);

router.get('/:id',
    validar, SongController.cancionPorId);

router.post('/', [
    body('title')
        .isLength({min:6}).withMessage('El título debe tener como mínimo 6 carácteres')
        .exists().withMessage('El título es un campo requerido.')
        .not().isEmpty().withMessage('El title es requerido.'),

    body('artist')
        .exists().withMessage('El artista es requerido')
        .not().isEmpty().withMessage('El artista es requerido'),

    body('album')
        .exists().withMessage('El album es requerido')
        .not().isEmpty().withMessage('El album es requerido')
],
    validar, SongController.nuevaCancion);

router.put('/:id', SongController.editarCancion);

router.delete('/:id', SongController.eliminarCancion);

export default router;