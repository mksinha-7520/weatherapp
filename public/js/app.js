console.log('other')
fetch('http://localhost:3000/weather?address=Patna').then((response) => {
    response.json().then((data) => {

        if (data.error) {
            console.log("error page")
        } else {
            console.log(data)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

messageOne.textContent = ''


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading...."
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
                //console.log("error page")
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data)
            }
        })
    })
    console.log(location)
})