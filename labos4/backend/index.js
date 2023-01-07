var express = require("express");
var axios = require("axios");
var port = process.env.PORT || 3001;
var oAuth = require("./middleware/oAuth");
var app = express();
var cors = require('cors');


const castlesAPIEndpoint = "http://localhost:4000/castles";

app.use(cors());
app.use(oAuth);

app.get("/castles", async (req, res) => {

  try {
    const { access_token } = req.oauth;
    // console.log(access_token)

    const config = {
      method: 'get',
      url: castlesAPIEndpoint,
      headers: { 'Authorization': `Bearer ${access_token}` }
    }

    const response = await axios(config);

    res.json(response.data);
  } catch (error) {
    // console.log(error);
    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});
app.get('/userdata', async(req, res) => {
  try {
    const { access_token } = req.oauth;
    console.log('access_token')
    console.log('Bearer '+ access_token)
    const config = {
      method: 'get',
      url: 'https://dev-8se1x6zihwzalxrw.us.auth0.com/userinfo',
      headers: { 'Authorization': `Bearer ${access_token}` }
    }

    const response = await axios(config);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    // console.log(error);
    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});

app.listen(port, () => console.log("Started"));
