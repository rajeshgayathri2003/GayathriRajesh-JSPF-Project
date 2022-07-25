
//var date = new Date();
//var offset = date.getTimezoneOffset();
//console.log(offset);
//console.log('Hi');

const {google } = require('googleapis')
const {OAuth2} = google.auth
const OAuth2Client = new OAuth2('615414796470-a84i783mpeci5gq9uaicgntls8d82ce7.apps.googleusercontent.com', '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')

OAuth2Client.setCredentials({refresh_token: '1//04K3xxjboLj03CgYIARAAGAQSNwF-L9IrexN0ogOl0lSfw1ETzEii2oZGsBsu4CAjbPM0xmf6CsVqUE9fwKTi5-goar2EEiu-vzY'})
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



