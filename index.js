const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const engine = mustacheExpress();
const UsuarioModel = require('./models/UsuarioModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const app = express();


app.engine("mustache", engine);

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "mustache");
app.use(express.static('public'));


app.use(session({
    secret: "#@A4327Asdzw",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());


app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'senha'
}, async (username, password, done) => {
    try {
        let user = await UsuarioModel.getByLogin(username, password);
        if (!user) {

            user = await UsuarioModel.createUser(username, password);
        }
        if (!user) {

            return done(null, false, { message: 'Erro ao criar usuário' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

app.use(passport.authenticate('session'));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    done(null, UsuarioModel.getByUsername(username));
})



let user_atual = {
    login: true,
    nome: null,
    lista: null
};

let lista = {};

app.get('/', (req, res) => {
    res.render('index', user_atual);
});

app.get('/logou', (req, res) => {
    if (req.isAuthenticated()) {
        const username = req.user.username;
        const user = User.findOne({ where: { username: username } });
        if (user) {
            user_atual = lista.find(item => item.nome === username);
        }
        else {
            let novouser = {
                login: false,
                nome: username,
                lista: []
            };
            lista.append(novouser);
            user_atual = lista.find(item => item.nome === username);
        }
    }
    res.redirect('/');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/logou'
}))

app.post('/criartarefa', (req, res) => {
    const user = req.user;
    const tarefa = req.body.tarefas;
    const tarefas = user_atual.find(item => item.nome === username)?.lista || [];
    tarefas.push(tarefa);
    user_atual.push({ username: user.username, lista: tarefas }); // Atualiza a lista com as tarefas do usuário
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server ligado");
})