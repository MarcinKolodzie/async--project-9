class Chart {

    constructor(data) {
        this.data = data
    }

    render() {

        const div = document.createElement('div')

        div.innerText = JSON.stringify(this.data)

        return div

    }

}

export default Chart