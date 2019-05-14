const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocode, forecast } = require('./utils');

const app = express();

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Maria',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Maria',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help message',
        name: 'Maria',
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            })
        }

        forecast(latitude, longitude, (error, weather) => {
            if (error) {
                return res.send({
                    error,
                })
            }

            res.send({
                address,
                location,
                forecast: weather,
            })
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Maria',
        message: 'Help page not found',
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Maria',
        message: 'Page not found',
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});