import { GraphQLClient, gql } from 'graphql-request'

const { STEPZEN_URL, STEPZEN_KEY } = process.env
const REFERERS=["https://weather-test.c3b.dev/", "http://localhost:3000/"]
// default ip if we fail to resolve or are running locally.
let ip = "128.101.101.101"

const graphQLClient = new GraphQLClient(STEPZEN_URL, {
    headers: {
        authorization: `Apikey ${STEPZEN_KEY}`
    }
})

export default async (req, res) => {
    console.log("headers: ", req.headers)
    
    // check sec-fetch-site header for same-origin
    if (req.headers["sec-fetch-site"] && req.headers["sec-fetch-site"] != "same-origin") {
        console.log("Not same-origin: ", req.headers["sec-fetch-site"])
        res.statusCode = 403
        res.send("FORBIDDEN")
        return
    } else if (! req.headers["sec-fetch-site"]) {
        // requiring sec-fetch-site header would current break on several popular browsers.
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Site
    }

    // check referer header for known referrers
    if (req.headers["referer"] && ! REFERERS.includes(req.headers["referer"])) {
        console.log("Bad referer: ", req.headers["referer"])
        res.statusCode = 403
        res.send("FORBIDDEN")
        return
    }

    // query
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