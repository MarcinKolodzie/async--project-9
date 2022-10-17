class Button {

    constructor(label, onClick) {
        this.label = label
        this.onClick = onClick
    }

    render() {

        const button = document.createElement('button')

        button.style.width = '100%'
        button.style.marginBottom = '10px'
        button.style.cursor = 'pointer'

        button.innerHTML = this.label

        button.addEventListener(
           'click',
           this.onClick 
        )

        return button

    }

}

export default Button