import {Playlist, playlistRepository } from '../models/playlist';
import {userRepository} from '../models/users';
import {validationResult} from 'express-validator';

var jwt = require('jwt-simple');
const PlaylistController = {


    todasLasPlaylist: async(req, res) => {
        res.json(await playlistRepository.findAll());
    },
    playlistPorId: async(req, res) => {
        let playlist = await playlistRepository.findById(req.params.id);
    if(playlist != undefined){
        res.json(playlist);
    } else {
        res.sendStatus(404);
    }
 },
    nuevaPlaylist : async(req, res) => {
        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, process.env.JWT_SECRET);
        let nuevaPlaylist = await playlistRepository.create(new Playlist({
            name : req.body.name,
            description : req.body.description,
            userId: req.body.userId,
            songList: []
        }));
        let usuario = await userRepository.findById(nuevaPlaylist.userId)
        res.status(201).json({
            id: nuevaPlaylist.id,
            name: nuevaPlaylist.name,
            user: usuario.name
        });
    },
    editarPlaylist : async (req, res) =>{
        let playlistModified = await playlistRepository.updateById(req.params.id,{
            name: req.body.name,
            description: req.body.description
        });
        if(playlistModified == undefined)
        res.sendStatus(404);
        else    
            res.status(200).json(playlistModified);
    },
    eliminarPlaylist: async (req, res) =>{
        let playlist = await playlistRepository.delete(req.params.id);
        res.sendStatus(204);
    },
    todasLasCancionesDeUnaPlaylist: async (req, res) => {
        let songList = await playlistRepository.songListFromPlaylist(req.params.id);
        if(songList == undefined) {
            res.sendStatus(404);
        }else{
            res.status(200).json(songList);
        }
    },
    añadirCancionToPlaylist : async(req, res)=>{
        let playlist = await playlistRepository.addSongToPlaylist(req.params.idSong, req.params.idPlaylist);
        if(playlist == undefined) {
            res.sendStatus(404);
        }else{
            res.status(200).json(playlist.songList);
        }
    },
    cancionDePlaylist: async(req, res) =>{
        let song = await playlistRepository.oneSongFromPlaylist(req.params.idSong, req.params.body.idPlaylist);
        if(song == undefined){
            res.sendStatus(404);
        }else{
            res.status(200).json(song);
        }
    },
    eliminarCancionDePlaylist: async (req, res) =>{
        let playlist = await playlistRepository.delSongFromPlaylist(req.params.idSong, req.params.idPlaylist);
        res.sendStatus(204)
    }
}
export{
    PlaylistController
}