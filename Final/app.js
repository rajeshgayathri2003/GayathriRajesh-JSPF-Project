const express = require('express');
const { calendar } = require('googleapis/build/src/apis/calendar');

const port = process.env.PORT || 8000;

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

app.get('availability', function(req,res){
    return res.render('availability',{title:"availability"})
        
})

app.post('/created', function(req, Res){
    console.log(req.body['Name'])
    const {google } = require('googleapis')
    const {OAuth2} = google.auth
    const OAuth2Client = new OAuth2('40606938336-qev5lh7oivrn7b1op2g6anbhc922fa0g.apps.googleusercontent.com', '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')

    OAuth2Client.setCredentials({refresh_token: '1//04hmNtqpNmezwCgYIARAAGAQSNwF-L9IrauGYZLNpMi18QzogNwjbpE1KH8rXQF_2QWsWBzAG4eL1TriZixv61zVMmhK2oaiXNTI'})
    const calendar = google.calendar({version: 'v3', auth: OAuth2Client})

    const details = req.body['Name'] + req.body['Roll']+ 'Room' + req.body['Room'] 

    const eventStartTime = new Date(req.body['DateTime'])
    //console.log(eventStartTime)
    eventStartTime.setDate(eventStartTime.getDate())
    const eventEndTime = new Date(req.body['DateTime']) 
    eventEndTime.setDate(eventEndTime.getDate() )
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)

    const event = {
        summary: 'Washing Machine',
        location: 'NIT Trichy',
        description: details,
        start: {
            dateTime: eventStartTime,
            timeZone: "Asia/Kolkata"
        },
        end: {
            dateTime: eventEndTime,
            timeZone: "Asia/Kolkata"

        },
        colorId: 1,
    }

    calendar.freebusy.query(
        {
            resource: {
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                timeZone: "Asia/Kolkata",
                items: [{id :'primary'}],
            }
        },
        
    (err, res) => {
        if (err) return console.error('Free Busy Query', err)
        const eventsArr = res.data.calendars.primary.busy

        if (eventsArr.length == 0) return calendar.events.insert({calendarId: 'primary', resource: event }, 
        err => {if (err) return console.error('Calendar event creation error', err)

        return console.log('Calendar Event Created')}        
        )
        return console.log('Sorry The Machine is unavailable')
        
    }
)
return Res.sendFile(__dirname+'/views/created.html') 

})

app.listen(port, ()=>{console.log('Server started at http://localhost:8000')})  


//06c6v592dd7n2rg2flkt6q5i9o@group.calendar.google.com