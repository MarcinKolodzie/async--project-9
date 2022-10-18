import Input from './Input'
import Button from './Button'
import Message from './Message'

import fetchData from './fetchData'

const APPID = '10bf9616e88841d85fe06bbf6aadc634'

class App {

    constructor() {
        this.container = null
        this.query = 'Lublin,pl'

        this.isLoading = false
        this.hasError = null

        this.data = null

        this.init()
    }

    init() {
        this.fetchWeather()
    }

    startCallback() {
        this.isLoading = true
        this.hasError = null
        this.render()
    }

    catchCallback(error) {
        this.hasError = error
        this.render()
    }

    endCallback() {
        this.isLoading = false
        this.render()
    }

    setData(data) {
        this.data = data
        this.render()
    }

    fetchWeather() {
        return fetchData(`https://api.openweathermap.org/data/2.5/forecast?appid=${APPID}&q=${this.query}&units=metric`,
            {
                startCallback: () => this.startCallback(),
                catchCallback: (error) => this.catchCallback(error),
                endCallback: () => this.endCallback()
            })
            .then((data) => this.setData(data))
    }

    transformData(data) {
        const list = data && data.list
        const listMapped = list && list.map((dataItem) => {
            const dt = dataItem && dataItem.dt
            const timestamp = dt && dt * 1000
            const temp = dataItem && dataItem.main && dataItem.main.temp

            return {timestamp, temp}
        })
        return listMapped
    }

    onImput(event) {
        this.query = event.target.value
        this.render()
    }

    onClick() {
        this.fetchWeather()
        this.render()
    }

    render() {
        if (this.container === null) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        const input = new Input(this.query, (event) => this.onImput(event))
        const button = new Button('fetch weather', () => this.onClick())

        this.container.appendChild(input.render())
        this.container.appendChild(button.render())

        if (this.hasError) {
            const messageElement = new Message('Error ocured!')
            this.container.appendChild(messageElement.render())
            return this.container
        }

        if (this.isLoading) {
            const messageElement = new Message('Loading...')
            this.container.appendChild(messageElement.render())
            return this.container
        }

        const text = document.createTextNode(
            JSON.stringify(
                this.transformData(this.data)
            )
        )
        this.container.appendChild(text)

        return this.container
    }

}

export default App