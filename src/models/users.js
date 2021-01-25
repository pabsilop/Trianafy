class User {

    constructor(username, fullName, email, password, id = 0) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}

let users = [
    new User('Pablo123', 'Pablo Silva López', 'pablo@gmail.com', '1234', 1),
    new User('Laura123', 'Laura Silva López', 'laura@gmail.com', '1234', 2)
];

const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < users.length && posicionEncontrado == -1; i++) {
        if (users[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const emailExists = (email) => {
    let emails = users.map(user => user.email);
    return emails.includes(email);
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
        const result = new User(newUser.username, newUser.fullName, newUser.email, newUser.email, newUser.password, newId);
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