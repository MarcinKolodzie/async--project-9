class Map {

    constructor(lng, lat) {
       this.lng = lng
       this.lat = lat
    }

    render() {

        const div = document.createElement('div')

        div.innerText = `lng ${this.lng} | lat ${this.lat}`

        return div

    }

}

export default Map