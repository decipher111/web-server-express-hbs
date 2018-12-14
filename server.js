const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express();

hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper('currentYear',() => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase()
})

app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var log = `${new Date().toString()} ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log("unable to write")
        }
    })
    next()
})

// app.use((req,res,next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public_static'))

app.get('/',(re1,res) => {
    res.render('home.hbs', {
        title: 'home',
        message: "welcome to home"
    })
})

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        title:'about',
    })
})

app.get('/error',(req,res) => {
    res.send({
        errorMessage: 'not found',
        statusCode : '404'
    })
})

app.listen(3000,() => {
    console.log("server has started on port 3000")
})