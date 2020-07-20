const request = require("request")

const weatherForecat = (longitude, latitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=1fe465719f7ec2d1e0d57e4c6e18e55e&query=" + longitude + "," + latitude + "&units=s"

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            console.log("cannot find the request 1.")

        } else if (body.current.weather_descriptions.length === 0) {
            console.log("no data to fetch 2")
        } else {
            callback(undefined, {
                weather_condition: body.current.weather_descriptions[0],
                weather_location: body.current.location

            })
        }
    })
}

module.exports = weatherForecat