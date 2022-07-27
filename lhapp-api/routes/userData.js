const express = require('express')
const router = express.Router()
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('../config')
const Parse = require('parse/node')
const NewUser = require('../models/user')

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

router.get('/:user', async (req, res) => {
  try {
    const user = new Parse.Query("User");
    const userDataQuery = new Parse.Query("UserData");
    const userDataParse = await userDataQuery.equalTo('userID', req.params.user).first();

    user.get(req.params.user)
      .then((data) => {
        const logginUserData = data.toJSON()
        const userData = userDataParse.toJSON()
        console.log("Got user info")
        res.send({"userdata" : {logginUserData, userData}})
      }, (error) => {
        res.send({"error" : "No user found: " + error })
      });
  } catch (error) {
    res.status(400)
    res.send({"error" : "Error getting user: " + error })
  }
})

router.get('/:user/illnesses', async (req, res) => {
  try {
    const userDataQuery = new Parse.Query("Illnesses");
    const userDataParse = await userDataQuery.equalTo('userID', req.params.user).findAll()

    res.send(userDataParse)
  } catch (error) {
    res.status(400)
    res.send({"error" : "Error getting user: " + error })
  }
})

router.get('/:user/appointments', async (req, res) => {
  try {
    const userDataQuery = new Parse.Query("Appointments");
    const userDataParse = await userDataQuery.equalTo('userID', req.params.user).findAll()

    res.send(userDataParse)
  } catch (error) {
    res.status(400)
    res.send({"error" : "Error getting user: " + error })
  }
})

  module.exports = router
