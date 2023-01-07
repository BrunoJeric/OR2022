import React from "react";

const LoginButton = () => {
  const login = async () => {
    const domain = "dev-8se1x6zihwzalxrw.us.auth0.com";
    const audience = "https://www.castles-api.com";
    const scope = "read:castles";
    const clientId = "eTVAuEHHbyIBWajhEQuIPCa2RhbCrXm5";
    const responseType = "code";
    const redirectUri = "http://localhost:3000/castles";

    const response = await fetch(
      `https://${domain}/authorize?` + 
      `audience=${audience}&` + 
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}`, {
        redirect: "manual"
      }
    );
    console.log(response.url)
    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => login()}>
      Log In
    </button>
  );
};

export default LoginButton;
