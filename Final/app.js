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

app.post('/created', function(req, Res){
    console.log(req.body['Name'])
    const {google } = require('googleapis')
    const {OAuth2} = google.auth
    const OAuth2Client = new OAuth2('615414796470-a84i783mpeci5gq9uaicgntls8d82ce7.apps.googleusercontent.com', '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')

    OAuth2Client.setCredentials({refresh_token: '1//04K3xxjboLj03CgYIARAAGAQSNwF-L9IrexN0ogOl0lSfw1ETzEii2oZGsBsu4CAjbPM0xmf6CsVqUE9fwKTi5-goar2EEiu-vzY'})
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
            timeZone: "America/Denver"
        },
        end: {
            dateTime: eventEndTime,
            timeZone: "America/Denver"

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

app.listen(port, ()=>{console.log('Server started at http://localhost:5000')})    