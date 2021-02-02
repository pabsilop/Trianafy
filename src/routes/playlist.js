import { Router } from "express";
import { body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { PlaylistController } from '../controllers/playlist';
import { token } from "../services/passport";


const router = Router();

router.get('/', token(), PlaylistController.allPlaylist);

router.get('/:id', validar, PlaylistController.playlistById);

router.get('/:id/songs', [], validar, PlaylistController.allSongsOfPlaylist);

router.get('/:idSong/songs/:idPlaylist', [], validar, PlaylistController.songOfPlaylist);

router.post('/', [
    body('nombre')
        .exists().withMessage('Nombre requerido')
        .not().isEmpty().withMessage('No puedes dejar el nombre vacio'),
    body('userId')
        .not().exists().withMessage('No está permitido el campo usuario'),
    body('songList')
        .not().exists().withMessage('')
],
    validar, PlaylistController.newPlaylist);

router.post('/:idSong/songs/:idPlaylist', [], validar, PlaylistController.addSongToPlaylist);

router.put('/:id', PlaylistController.editPlaylist);

router.delete('/:id', PlaylistController.deletePlaylist);

router.delete('/:idSong/songs/:idPlayList', PlaylistController.deleteSongOfPlaylist);

export default router;