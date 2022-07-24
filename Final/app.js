const express = require('express')

const port = process.env.PORT || 5000;

const app = express();


app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))

app.set('public', "C:\\Users\\Gayathri Rajesh\\Documents\\GitHub\\JSPF2022\\final\\public")

app.get('/', function(req, res){
    return res.render('home',{title: "Home"})
})

app.get('/booking', function(req, res){
    return res.render('booking', {title: "Booking"})
})

app.post('/formPost', function(req, res){
    console.log(req)
    return res.redirect('/')
})

app.listen(port, ()=>{console.log('Server started at http://localhost:5000')})    