const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const engine = mustacheExpress();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const User = require('./models/User');

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
},
    function (username, password, done) {
        let user = UsuarioModel.getByLogin(username, password)
        if (user == null) {
            return done(null, false, { message: 'Usuário e senha inválidos' })
        }
        return done(null, user);
    })
)

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username

        });
    });
});

app.use(passport.authenticate('session'));

let login = true; // Váriavel para gerenciar login
let lista = {};

app.get('/', (req, res) => {
    res.render('index', login);
});

app.get('/logou', (req, res) => {
    if (req.isAuthenticated()) {
        const username = req.user.username;
        const user = User.findOne({ where: { username: username } });
        login = false;
        if (user) {

        }
        else {
            let novouser = {
                nome: username,
                lista: []
            };
            lista.append
        }
    } else {
        res.redirect('/login');
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/logou',
    failureRedirect: '/falha'
}))



app.listen(3000, () => {
    console.log("Server ligado");
})

