const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const router = express.Router()
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('./config')
const userData = require('./routes/userData.js')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.use("/app", userData)

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

app.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.email, req.body.password)
    res.send({"user" : user})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Login failed: " + error })
  }
})

app.post('/register', async (req, res) => {
  let user = new Parse.User(req.body)

  try {
      await user.signUp()
      res.status(201)
      res.send({"user" : user})
  } catch (error) {
      res.status(400)
      res.send({"error" : "Failed to create user: " + error })
  }
})

app.post('/createData', async (req, res) => {
  try {
    let userData = new Parse.Object("UserData", req.body)
    await userData.save()
    res.status(201)
    res.send({"userData" : userData})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Failed to create userdata: " + error })
  }
})

app.post('/updateData', async (req, res) => {
  try {
    let userData = new Parse.Object("UserData", req.body)
    await userData.save()
    res.status(201)
    res.send({"userData" : userData})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Failed to create userdata: " + error })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Life & Health ${port}`)
})
