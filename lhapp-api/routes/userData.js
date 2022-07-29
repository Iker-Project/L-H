const express = require('express')
const router = express.Router()
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('../config')
const Parse = require('parse/node')
const NewUser = require('../models/user')
var axios = require('axios');

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

router.get('/:user/medicine', async (req, res) => {
  try {
    const userDataQuery = new Parse.Query("Medicine");
    const userDataParse = await userDataQuery.equalTo('userID', req.params.user).findAll()

    res.send(userDataParse)
  } catch (error) {
    res.status(400)
    res.send({"error" : "Error getting user: " + error })
  }
})

const getHospitals = async (data) => {
  var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.lat},${data.lng}&radius=${data.radius}&type=hospital&keyword=cruise&key=AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o`,
      headers : {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
      }
  };

  const results = axios(config)
      .then(function (response) {
      return response.data.results
  })
  .catch(function (error) {
      console.log(error);
  });

  return results
}

router.post('/getHospitals', async (req, res) => {
  const allHospitals = await getHospitals(req.body)
  res.send(allHospitals).status(200)
})

  module.exports = router
