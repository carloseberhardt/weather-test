import { GraphQLClient, gql } from 'graphql-request'

const { STEPZEN_URL, STEPZEN_KEY } = process.env

// default ip if we fail to resolve or are running locally.
let ip = "128.101.101.101"

const graphQLClient = new GraphQLClient(STEPZEN_URL, {
    headers: {
        authorization: `Apikey ${STEPZEN_KEY}`
    }
})

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
    console.log("headers: ", req.headers)
    if (req.headers["x-bb-ip"]) {
        ip = req.headers["x-bb-ip"]
    }
    let query = gql`
    {
        location(ip: "${ip}") {
            city
            weather {
                temp
                units
                feelsLike
                description
            }
        }
    }
    `
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