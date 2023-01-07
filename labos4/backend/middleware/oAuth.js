var axios = require("axios");

const tokenEndpoint = "https://dev-8se1x6zihwzalxrw.us.auth0.com/oauth/token";

 oAuth = (req, res, next) => {
  var code = req.query.code;

  if(!code) {
    res.status(401).send("Missing authorization code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "eTVAuEHHbyIBWajhEQuIPCa2RhbCrXm5");
  params.append("client_secret", "M6WNHyHh4_rRF5sUtiBZOxk7L6ewhnRcaWTuPhauI0iJdJeATMKsCxqy-4r8xzPC")
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/castles");

  // console.log(params)
  axios.post(tokenEndpoint, params)
  .then(response => {
    req.oauth = response.data;
    next();
  })
  .catch(err => {
    // console.log(err);
    res.status(403).json(`Reason: ${err.message}`);
  })
}

module.exports = oAuth;