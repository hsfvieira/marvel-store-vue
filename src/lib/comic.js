import querystring from 'querystring'

const apiKey = 'cc1d5484fa10b37a0931266dd6edfcb8'

export default async function getData(title, offset) {
    const query = {
        apikey: apiKey
    }

    title ? query.titleStartsWith = title : null
    offset ? query.offset = offset : null

    const response = await fetch(`http://gateway.marvel.com/v1/public/comics${query ? '?' + querystring.stringify(query) : null}`)
    return await response.json()
}

export async function getDataComic(id) {
    const response = await fetch(`http://gateway.marvel.com/v1/public/comics/${id}?apikey=${apiKey}`)
    return await response.json()
}