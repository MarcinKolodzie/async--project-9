class Input {

    constructor(value, onInput) {
        this.value = value
        this.onInput = onInput
    }

    render() {

        const input = document.createElement('input')

        input.style.width = '100%'
        input.style.marginBottom = '10px'
        input.style.borderRadius = '4px'
        input.style.border = '1px solid gray'
        input.style.boxSizing = 'border-box'

        input.value = this.value

        input.addEventListener(
           'input',
           this.onInput 
        )

        setTimeout(
            () => input.focus(),
            0
        )

        return input

    }

}

export default Input