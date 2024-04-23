const express = requiere('express');
const mustacheExpress = requiere('mustache-express');
const path = requiere('path');
const session = requiere('express-session');
const bodyParser = require('body-parser');
const engine = mustacheExpress();
const passport = requiere('passport');
const LocalStrategy = requiere('passport-local').Strategy;
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
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'senha'
},
    function (username, password, done) {
        let user = UsuarioModel.getByLogin(username, password)
        if (user == null) {
            return done(null, false, { message: 'Usuário e sneha inválidos' })
        }
        return done(null, user);
    }))

let login = false; // Váriavel para gerenciar login

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', passport.authenticate('local', {
    sucessRedirect: '/',
    failureRedirect: ''
}))

app.listen(3000, () => {
    console.log("Server ligado");
})

