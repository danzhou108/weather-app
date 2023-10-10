const express = require('express');
const hbs = require('hbs');
app = express();
path = require('path');
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'/assets')));
hbs.registerPartials(path.join(__dirname,'/partials'));
const weather = require('./getWeather');
var jsonOutput = {};

app.get('/',(req,res) => {
    res.render('',{
        title: 'Weather',
        name: "Daniel Zhou",
        message: "Welcome to the main page"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: "Daniel Zhou",
        message: "Welcome to the help page"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: "Daniel Zhou",
        message: "Welcome to the about page"
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({error: 'Missing address input'});
    };
    weather(req.query.address,(error,response) => {
        if (error) {
            var jsonOutput = {'error': error};
        } else {
            var jsonOutput = {'City': req.query.address,'Temperature': (9/5*response+32)+' Degrees F/'+response+' Degrees C'};
        };
        res.send(jsonOutput);
    });
});

app.get('*',(req,res) => {
    res.render('other',{
        title: '404 error',
        message: 'Please try again',
        name: 'Daniel'
    })
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});