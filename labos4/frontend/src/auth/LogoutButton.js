import React from "react";

const LogoutButton = () => {
  const logout = async () => {
    const domain = "dev-8se1x6zihwzalxrw.us.auth0.com";
    const clientId = "eTVAuEHHbyIBWajhEQuIPCa2RhbCrXm5";
    const returnTo = "http://localhost:3000";

    const response = await fetch(
      `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
      { redirect: "manual" }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => logout()}>
      Log out
    </button>
  );
};

export default LogoutButton;
