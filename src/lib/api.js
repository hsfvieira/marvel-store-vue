const apiKey = 'cc1d5484fa10b37a0931266dd6edfcb8'

export default async function getData() {
    const response = await fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${apiKey}`)
    return await response.json()
}