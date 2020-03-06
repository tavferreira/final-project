import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const fetch = require('node-fetch')

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const base = 'https://api.tink.se/api/v1'

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.static(path.join(__dirname, "../frontend/build")))
app.use(bodyParser.json())

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
})

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// This is the server API, where the client can post a received OAuth code.
app.post("/callback", (req, res) => {
  getAccessToken(req.body.code)
    .then(response => getData(response.access_token))
    .then(response => {
      res.json({
        response
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.toString() })
    })
})

const handleResponse = async (response) => {
  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}

const getData = async (accessToken) => {
  const [
    loanData,
    loanEvents,
    loanHistory
  ] = await Promise.all([
    getLoansData(accessToken),
    getLoansEvents(accessToken),
    getLoansHistory(accessToken)
  ])

  return {
    loanData,
    loanEvents,
    loanHistory
  }
}

const getAccessToken = async (code) => {
  const body = {
    code: code,
    client_id: CLIENT_ID, // Your OAuth client identifier.
    client_secret: CLIENT_SECRET, // Your OAuth client secret. Always handle the secret with care.
    grant_type: "authorization_code"
  }

  const response = await fetch(base + "/oauth/token", {
    method: "POST",
    body: Object.keys(body)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
      .join("&"),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  })
    .catch(err => console.log(err))

  return handleResponse(response);
}

const getAccountData = async (token) => {
  const response = await fetch(base + "/accounts/list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .catch(err => console.log(err))

  return handleResponse(response);
}

const getLoansData = async (token) => {
  const response = await fetch(base + "/loans", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .catch(err => console.log(err))

  return handleResponse(response);
}

const getLoansEvents = async (token) => {
  const response = await fetch(base + "/loans/events", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .catch(err => console.log(err))

  return handleResponse(response);
}

const getLoansHistory = async (token) => {
  const response = await fetch(base + "/loans/timelines", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .catch(err => console.log(err))

  return handleResponse(response);
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
