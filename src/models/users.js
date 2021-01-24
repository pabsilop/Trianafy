class User {

    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}

let users = [
    new User(1, 'Pablo Silva López'),
    new User(2, 'Laura Silva López')
];

const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < users.length && posicionEncontrado == -1; i++) {
        if (users[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const userRepository = {
    
    findAll() {
        return users;
    },
    findById(id) {
        /*
        let result = users.filter(user => user.id == id);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
        */
       const posicion = indexOfPorId(id);
       return posicion == -1 ? undefined : users[posicion];
    },
    create(newUser){
        const lastId = users.length == 0 ? 0 : users[users.length-1].id;
        const newId = lastId + 1;
        const result = new User(newId, newUser.username);
        users.push(result);
        return result;
    },
    updateById(id, modifiedUser) {
        const posicionEncontrado = indexOfPorId(id)
        if (posicionEncontrado != -1) {
            users[posicionEncontrado].username = modifiedUser.username;
        }
        return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
    },
    update(modifiedUser){
        return this.update(modifiedUser.id, modifiedUser);
    },
    delete(id){
        const posicionEncontrado = indexOfPorId(id);
        if(posicionEncontrado != -1)
            users.splice(posicionEncontrado, 1);
    }
}

export {
    User,
    userRepository
}