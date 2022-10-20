import Input from './Input'
import Map from './Map'
import Message from './Message'
import Chart from './Chart'

import fetchData from './fetchData'
import debounce from './debounce'

const APPID = '10bf9616e88841d85fe06bbf6aadc634'

class App {

    constructor() {
        this.container = null
        this.query = 'Lublin,pl'

        this.isLoading = false
        this.hasError = null

        this.data = null

        this.fetchWeatherDebounced = debounce(1000)(this.fetchWeather)

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

    fetchWeatherDebounced(){

    }

    transformData(data) {
        const list = data && data.list
        const listMapped = list && list.map((dataItem) => {
            const dt = dataItem && dataItem.dt
            const timestamp = dt && dt * 1000
            const temp = dataItem && dataItem.main && dataItem.main.temp
            const feelsLike = dataItem && dataItem.main && dataItem.main.feels_like

            return { timestamp, temp, feelsLike }
        })
        return listMapped
    }

    onImput(event) {
        this.query = event.target.value
        this.isLoading = true
        this.fetchWeatherDebounced()
        // debounce(1000)(this.fetchWeather.bind(this))()
        this.render()
    }

    render() {
        if (this.container === null) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        const input = new Input(this.query, (event) => this.onImput(event))

        this.container.appendChild(input.render())

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

        const lat = this.data && this.data.city && this.data.city.coord && this.data.city.coord.lat
        const lng = this.data && this.data.city && this.data.city.coord && this.data.city.coord.lon
        const mapElement = new Map(lng, lat)
        this.container.appendChild(mapElement.render())


        const transformedData = this.transformData(this.data)
        const chartElement = new Chart(transformedData
        )

        this.container.appendChild(chartElement.render())

        return this.container
    }

}

export default App