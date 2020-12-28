import fetch from 'unfetch'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function Weather() {
    const { data, error } = useSWR('/api/weather', fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div><p>In {data.location.city}, it feels like {data.location.weather.feelsLike} {data.location.weather.units} with {data.location.weather.description}.</p></div>
}

