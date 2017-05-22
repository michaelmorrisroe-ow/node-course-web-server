const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcome: 'Hi, welcome to the website.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'NotAbout Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'You should log in. You must log in.'
    })
});

app.listen(3000), () => {
    console.log('Server is up on port 3000')
};