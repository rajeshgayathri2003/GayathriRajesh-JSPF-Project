
//var date = new Date();
//var offset = date.getTimezoneOffset();
//console.log(offset);
//console.log('Hi');

const {google } = require('googleapis')
const {OAuth2} = google.auth
const OAuth2Client = new OAuth2('40606938336-qev5lh7oivrn7b1op2g6anbhc922fa0g.apps.googleusercontent.com', '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')

OAuth2Client.setCredentials({refresh_token: '1//04hmNtqpNmezwCgYIARAAGAQSNwF-L9IrauGYZLNpMi18QzogNwjbpE1KH8rXQF_2QWsWBzAG4eL1TriZixv61zVMmhK2oaiXNTI'})
const calendar = google.calendar({version: 'v3', auth: OAuth2Client})

const eventStartTime = new Date()
//console.log(eventStartTime)
eventStartTime.setDate(eventStartTime.getDate() )

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDate() )
eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)

const event = {
    summary: 'Washing Machine',
    location: 'NIT Trichy',
    description: 'Name',
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



