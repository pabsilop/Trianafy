import { Router } from "express";
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { PlayListController } from '../controllers/playList';
import { token } from "../services/passport";


const router = Router();

router.get('/', token(), PlayListController.todasLasPlayList);

router.get('/:id',
    validar, PlayListController.playListPorId);

router.get('/:id/songs', [], validar, PlayListController.todasLasCancionesDeUnaPlayList);

router.get('/:idSong/songs/:idPlayList', [], validar, PlayListController.cancionDePlayList);

router.post('/', [
    body('nombre')
        .exists().withMessage('El campo nombre es requerido')
        .not().isEmpty().withMessage('El campo nombre no puede estar vacio'),
    body('userId')
        .not().exists().withMessage('El campo del usuario no es permitido'),
    body('songList')
        .not().exists().withMessage('La lista de canciones no es permitida en la creacion de la lista')
],
    validar, PlayListController.nuevaPlayList);

router.post('/:idSong/songs/:idPlayList', [], validar, PlayListController.añadirCancionToPlayList);

router.put('/:id', PlayListController.editarPlayList);

router.delete('/:id', PlayListController.eliminarPlayList);

router.delete('/:idSong/songs/:idPlayList', PlayListController.eliminarCancionDePlayList);

export default router;