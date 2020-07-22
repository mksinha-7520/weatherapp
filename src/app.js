const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const goecode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define path for config
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

//set up static directory
app.use(express.static(path.join(__dirname, '../public')))

// Handle bar settings
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

app.listen(port, () => {
    console.log(chalk.inverse.green('server has been started on port  '+port))
})

app.get('', (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Manish",
        footer: "Huch Inc"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather About",
        name: "Rainy",
        footer: "Huch Inc"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'this is help page',
        footer: "Huch Inc"
    })
})

let products = new Array;
app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'provide the correct search.'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.send("hep section not found.")
})

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'Address is mandatory'
        })
    }
   
    goecode(address, (error, { latitude, longitude , location } = {}) => {

        if(error) {
            return res.send({
                error: 'Invalid data'
            })
        }
        console.log(chalk.inverse.blue(address))
        console.log(chalk.inverse.blue(latitude))
        console.log(chalk.inverse.blue(longitude))
        console.log(chalk.inverse.blue(location))

        forecast(longitude, latitude, (error, {weather_condition, weather_location}) => {
            res.send({
                forecast: weather_condition,
                location: weather_location
            })
        })
        

    });
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'does not exist'
    })
})

// app.get('/help', (req, res) => {

//     res.send(express.static(path.join(__dirname, 'help.html')))
// })

// app.get('/about', (req,res) => {
//     res.send('<h1><i>My work is Software Developer!</i></h>')
// })

