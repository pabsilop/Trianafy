import { Router } from 'express';

import { SongController } from '../controllers/song';


const router = Router();

router.get('/song', SongController.todasLasCanciones);

router.get('/me', SongController.me);

router.get('/:id', SongController.cancionPorId);

router.post('/', SongController.nuevaCancion);

router.put('/:id', SongController.editarCancion);

router.delete('/:id', SongController.eliminarCancion);

export default router;