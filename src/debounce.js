export const debounce = (time) => {
    return (fn) => {
        let timeoutId
        return function (...args) {
            if (timeoutId) clearTimeout(timeoutId)

            const fnBound = fn.bind(this, ...args)
            timeoutId = setTimeout(fnBound,time)
        }
    }
}

export default debounce