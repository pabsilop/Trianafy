import 'dotenv/config';
import mongoose from 'mongoose';
import { songsRepository} from './songs';
const {Schema} = mongoose;
const playlistSchema = new Schema({
    name: String,
    description: String,
    userId: String,
    songsList:[String]
});

const Playlist = mongoose.model('PlayList', playlistSchema);

const playlistRepository = {
    async findAll(){
        const result = await Playlist.find({}).exec();
        return result;
    },
    async findById(id) {
        const result = await Playlist.findById(id).exec();
        return result != null ? result : undefined;
    },
    async create(newPlaylist) {
        const playlist = new Playlist({
            name: newPlaylist.name,
            description: newPlaylist.description,
            userId: newPlaylist.userId,
            songsList: newPlaylist.songsList
        });
    const result = await newPlaylist.save();
    return result;
    },
    async updateById(id, playlistModified) {
        const saved = await Playlist.findById(id);
        if(saved != null) {
            return Object.assign(saved, playlistModified).save();

        }else{
            return undefined;
        }
    },
    async delete(id) {
        await Playlist.findOneAndDelete(id).exec();

    },
    async songListFromPlaylist(id) {
        let playlist = await Playlist.findById(id);
        return playList != null ? playList.songsList : undefined;
    },
    async oneSongFromPlaylist( idSong, idPlaylist ){
        let playlist = await Playlist.findById(idPlayList);
        if(playlist == null){
            return undefined;
        }else{
            let songList = playlist.songsList;
            let song = songsList.filter(song => song == idSong);
            if (song == null) {
                return undefined;
            }else{
                return song[0];
            }
        }
    },
    async addSongToPlaylist( idSong, idPlaylist ) {
        let playlist = await Playlist.findById(idPlaylist);
        if(playlist == null) {
            return undefined;
        }else {
            let song = await songsRepository.findById(idSong);
            if(song == null) {
                return undefined;
            } else {
                playlist.songList.push(idSong);
                return await playlist.save();
            }
        }
    },
    async delSongFromPlaylist(idSong, idPlaylist) {
        let playlist = await Playlist.findById(idPlaylist);
        if(playlist == null) {
            return undefined;
        } else {
            let song = await songsRepository.findById(idSong);
            if(song == null){
                return undefined;
            }else{
                playlist.songList.pull(idSong);
                return await playlist.save();
            }
        }
    }
}
export{
    Playlist,
    playlistRepository
}