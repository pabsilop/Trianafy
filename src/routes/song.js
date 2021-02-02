import { Router } from "express";
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { SongController } from '../controllers/song'
import { token } from "../services/passport";

const router = Router();

router.get('/', token(), SongController.todasLasCanciones);

router.get('/:id',
    validar, SongController.cancionPorId);

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

router.put('/:id', SongController.editarCancion);

router.delete('/:id', SongController.eliminarCancion);

export default router;