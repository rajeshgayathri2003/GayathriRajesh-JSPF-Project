const express = require('express')

const port = process.env.PORT || 5000;

const app = express();
const path =  require('path')

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('views'))


app.set('view engine', 'html')
app.set('views', path.join(__dirname,'views'))

app.get('/', function(req, res){
    return res.render('home',{title: "Home"})
})

app.get('/booking', function(req, res){
    return res.render('booking', {title: "Booking"})
})

app.post('/created', function(req, res){
    console.log(req.body)
    return res.sendFile(__dirname+'/views/created.html')
})

app.listen(port, ()=>{console.log('Server started at http://localhost:5000')})    