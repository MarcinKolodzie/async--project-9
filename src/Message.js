class Message {

    constructor(text) {
        this.text = text
    }

    render() {

        const div = document.createElement('div')

        div.style.fontFamily = 'sans-serif'

        div.innerText = this.text

        return div

    }

}

export default Message