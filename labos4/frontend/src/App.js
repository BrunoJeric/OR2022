import "./App.css";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import Castles from "./Castles";
import Profile from "./Profile";

import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <div className="App-body">
        <span>
          <LoginButton />
          <LogoutButton />
        </span>
        <Route path="/castles" component={Castles} />
        <Route path="/profile" component={Profile} />
      </div>
    </div>
  );
}

export default App;
