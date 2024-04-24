// UsuarioModel.js

// Simulando armazenamento em memória (substitua por um banco de dados em produção)
let users = [
    { id: 1, username: 'usuario1', password: 'senha1' },
    { id: 2, username: 'usuario2', password: 'senha2' }
];

// Método para obter usuário pelo login
const getByLogin = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
};

// Método para obter usuário pelo nome de usuário
const getByUsername = (username) => {
    return users.find(user => user.username === username);
};

// Método para criar um novo usuário
const createUser = (username, password) => {
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    return newUser;
};

module.exports = { getByLogin, getByUsername, createUser };
