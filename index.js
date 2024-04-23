const express = requiere('express');
const mustacheExpress = requiere('mustache-express');
const path = requiere('path');
const session = requiere('express-session');
const bodyParser = require('body-parser');
const engine = mustacheExpress();
const app = express();

app.engine("mustache", engine);

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "mustache");

app.use(session({
    secret: "#@A4327Asdzw",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log("Server ligado");
})