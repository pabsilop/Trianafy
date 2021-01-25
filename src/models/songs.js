class Songs {

    constructor(id, title, artist, album, year) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year;
    }
}

let songs = [
    new Songs(1, 'Better Off(Diying)', 'Lil Peep', 'Come over when you re sober', '2017'),
    new Songs(2, 'Crybaby', 'Lil Peep', 'Crybaby', '2017'),
    new Songs(3, 'Driveaway', 'Lil Peep', 'Crybaby', '2017')
];

const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < songs.length && posicionEncontrado == -1; i++) {
        if (songs[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const songsRepository = {
    findAll() {
        return songs;
    },
    findById(id) {
       const posicion = indexOfPorId(id);
       return posicion == -1 ? undefined : songs[posicion];
    },
    create(newSong){
        const lastId = songs.length == 0 ? 0 : songs[songs.length-1].id;
        const newId = lastId + 1;
        const result = new User(newId, newSong.title, newSong.artist, newSong.album, newSong.year);
        users.push(result);
        return result;
    },
    updateById(id, modifiedSong) {
        const posicionEncontrado = indexOfPorId(id)
        if (posicionEncontrado != -1) {
            songs[posicionEncontrado].title = modifiedSong.title;
        }
        return posicionEncontrado != -1 ? songs[posicionEncontrado] : undefined;
    },
    update(modifiedSong){
        return this.update(modifiedSong.id, modifiedSong);
    },
    delete(id){
        const posicionEncontrado = indexOfPorId(id);
        if(posicionEncontrado != -1)
            songs.splice(posicionEncontrado, 1);
    }
}

export {
    Songs,
    songsRepository
}