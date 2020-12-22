import { GraphQLClient, gql } from 'graphql-request'

const { STEPZEN_URL, STEPZEN_KEY } = process.env

const graphQLClient = new GraphQLClient(STEPZEN_URL, {
    headers: {
        authorization: `Apikey ${STEPZEN_KEY}`
    }
})

const defaultQuery = gql`
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
    // this is clunky, but it's just a test
    var query, usedDefault
    if (req.headers["x-bb-ip"]) {
        let ip = req.headers["x-bb-ip"]
        // use ip query
        query = gql`
        {  
            getLocation(ip: "${ip}") {
                city
                forecast {detailedForecast, icon}
            }
        }
        `
    } else {
        //use default query
        query = defaultQuery
    }
    try {
        const data = await graphQLClient.rawRequest(query)
        console.log(JSON.stringify(data))
        res.statusCode = 200
        res.json(data.data)
    } catch (error) {
        console.error("error:", error)
        res.statusCode = 500
        res.send("Server Error")
    }
}