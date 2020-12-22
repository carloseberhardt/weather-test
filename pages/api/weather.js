import { GraphQLClient, gql } from 'graphql-request'

const { STEPZEN_URL, STEPZEN_KEY } = process.env

const graphQLClient = new GraphQLClient(STEPZEN_URL, {
    headers: {
        authorization: `Apikey ${STEPZEN_KEY}`
    }
})

const query = gql`
{
  getForecast(lat: 45.3194, long: -92.9719) {
    shortForecast
    detailedForecast
    icon
    isDaytime
    windSpeed
    windDirection
    temperatureTrend
    temperature
    temperatureUnit
  }
}
`

export default async (req, res) => {
    //console.log("req: ", req.headers)

    try {
        const data = await graphQLClient.rawRequest(query)
        //console.log(JSON.stringify(data))
        res.statusCode = 200
        res.json(data.data)
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2))
        res.statusCode = 500
        res.text("Server Error")
    }
}