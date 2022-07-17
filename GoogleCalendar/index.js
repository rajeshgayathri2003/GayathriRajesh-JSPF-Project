
//var date = new Date();
//var offset = date.getTimezoneOffset();
//console.log(offset);
//console.log('Hi');

const {google } = require('googleapis')
const {OAuth2} = google.auth
const OAuth2Client = new OAuth2('40606938336-okvlo4ivlfa98ikvoiedecbb0jd9am3g.apps.googleusercontent.com','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')

OAuth2Client.setCredentials({refresh_token: '1//04dxIUivFfpdfCgYIARAAGAQSNwF-L9Irj5NBGQtL7X-Nijfd4F43LZVS_6juaNpqWCcdnUf5HRexOMcdGw4hGHjY-rc7V5jsqZ0'})
const calendar = google.calendar({version: 'v3', auth: OAuth2Client})

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() +2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() +2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary: 'Meet with Gayathri',
    location: 'NIT Trichy',
    description: 'Hostels',
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
            timeZone: "America/Denver",
            items: [{id :'primary'}],
        }
    },
    (err, res) => {
        if (err) return console.error('Free Busy Query', err)
        const eventsArr = res.data.calendars.primary.busy

        if (eventsArr.length == 0) return calendar.events.insert({calendarId: 'primary', resource: event }, 
        err => {if (err) return console.error('Calendar event creation error', err)
        return console.log('Calendar Event Created')})

        return console.log('Sorry, I am busy')
    }
)



