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

JSON.safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
  };

export default async (req, res) => {
    console.log("req: ", JSON.safeStringify(req))
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