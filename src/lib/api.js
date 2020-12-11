const apiKey = 'cc1d5484fa10b37a0931266dd6edfcb8'

export default async function getData(title, offset) {
    const queryTitle = title ? `&titleStartsWith=${title}` : ''
    const queryOffset = offset ? `&offset=${offset}` : ''
    const response = await fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${apiKey}${queryTitle}${queryOffset}`)
    return await response.json()
}