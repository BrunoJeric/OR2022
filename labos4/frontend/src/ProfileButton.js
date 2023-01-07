import React from "react";

const ProfileButton = () => {
  const profile = async () => {
    const domain = "dev-8se1x6zihwzalxrw.us.auth0.com";
    const audience = "https://www.castles-api.com";
    const scope = "openid%20profile%20email";
    const clientId = "eTVAuEHHbyIBWajhEQuIPCa2RhbCrXm5";
    const responseType = "code";
    const redirectUri = "http://localhost:3000/profile";

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
    <button className="Profile-button" onClick={() => profile()}>
      Profile
    </button>
  );
};

export default ProfileButton;
