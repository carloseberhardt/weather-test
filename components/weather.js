import fetch from 'unfetch'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function Weather() {
    const { data, error } = useSWR('/api/weather', fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div><img src={data.getForecast.icon} alt="weather icon"/><p>{data.getForecast.detailedForecast}</p></div>        
}

