const fetchData = (url, options = {}) => {
    const {
        startCallback = () => console.log(`[${url}] Start fetching`),
        catchCallback = (error) => console.error('Failed to fetch data', error),
        endCallback = () => console.log(`[${url}] Stop fetching`)
    } = options

    startCallback()

    return fetch(url)
        .then((response) => {
            if (response.status < 200 || response.status > 200) {
                throw new Error(response.status)
            }
            return response
        })
        .then((response) => response.json())
        .catch(catchCallback)
        .finally(endCallback)
}

export default fetchData