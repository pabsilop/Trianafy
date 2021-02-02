import{ songs,  songsRepository} from '../models/songs';

const SongController = {

    todasLasCanciones : async (req, res) => {
        res.json(await songsRepository.findAll());
    },
    cancionPorId : async (req, res) => {
        let song = await songsRepository.findById(req.params.id);
        if(song != undefined) {
            res.json(song);
        }else {
            res.sendStatus(404);
        }
    }, 
    nuevaCancion : async (req, res) => {
        let nuevaSong = await songsRepository.create(new Song({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year
        }));
        res.status(201).json({
            id: nuevaSong.id,
            title: nuevaSong.title
        });
    },
    editarCancion: async (req, res) => {
        let cancionModificada = await songsRepository.updateById(req.params.id,{
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year
        });
        if (cancionModificada == undefined)
            res.sendStatus(404);
        else   
            res.status(200).json(cancionModificada);
    },
    eliminarCancion: async (req, res) => {
        let song = await songsRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export{
    SongController
}