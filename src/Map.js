import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class Map {

    constructor(lng, lat, name) {
        this.lng = lng
        this.lat = lat
        this.name = name
    }

    render() {

        const div = document.createElement('div')
        div.style.width = '100%'
        div.style.height = '200px'

        setTimeout(() => {

            const map = L.map(div).setView([this.lat, this.lng], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([this.lat, this.lng], { opacity: 0 })
                .addTo(map)
                .bindPopup(this.name)
                .openPopup();

        }, 0
        )

        return div


    }

}

export default Map