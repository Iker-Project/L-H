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
    const userData = new Parse.Query("UserData");

    database = await userData.find()

    user.get(req.params.user)
      .then((data) => {
        const logginUserData = data.toJSON()

        database.map((userData) => {
          const userJSON = userData.toJSON()

          if (userJSON.userID == req.params.user){

            res.send({"userdata" : {logginUserData, userJSON}})
          }
        })
      }, (error) => {
        res.send({"error" : "No user found: " + error })
      });
  } catch (error) {
    res.status(400)
    res.send({"error" : "Error getting user: " + error })
  }
})

  module.exports = router
