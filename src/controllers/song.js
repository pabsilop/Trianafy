import{ songs,  songsRepository} from '../models/songs';

const SongController = {

    todasLasCanciones : (req, res) => {
        res.json(songsRepository.findAll());
    },
    cancionPorId : (req, res) => {
        let song = songsRepository.findById(req.params.id);
        if(song != undefined) {
            res.json(song);
        }else {
            res.sendStatus(400);
        }
    }, 
    me : (req, res) => {
        res.json(req.context.me);
    },
    nuevaCancion : (req, res) => {
        let cancionCreada = songsRepository.create(new Song(undefined, req.body.title));
        res.status(201).json(cancionCreada);
    },
    editarCancion: (req, res) => {
        let cancionModificada = songsRepository.updateById(req.params.id, new Song(undefined, req.body.title));
        if (cancionModificada == undefined)
            res.sendStatus(404);
        else   
            res.status(200).json(cancionModificada);
    },
    eliminarCancion: (req, res) => {
        songsRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export{
    SongController
}