import React, { useState, useEffect } from "react";
import "./Castles.css";
import ProfileButton from "./ProfileButton";

import queryString from "query-string";

const Castles = ({ location }) => {
  const { code } = queryString.parse(location.search);
  const [castlesData, setCastlesData] = useState("none");

  useEffect(() => {
    fetch(`http://localhost:3001/castles?code=${code}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(res => setCastlesData(JSON.stringify(res)))
  }, [code]);

  return (
    <div className="Castles-body">
      <ProfileButton/>
    </div>
  );
};

export default Castles;
