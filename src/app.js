const path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
    app = express()

//connecting to DB
mongoose.connect('mongodb://localhost/fazt-crud-mongo', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err))

//importing routes
const indexRoutes = require('./routes/index')

//settings
app
    .set('port', process.env.PORT || 3000)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

//middlewares
app
    .use(morgan('dev'))
    .use(express.urlencoded({extended: false}))
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .use(bodyParser.json())

//routes
app 
    .use('/', indexRoutes)
    
//starting server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})