import { useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import "./components/styles/reset.css";
import UserContext from "./contexts/UserContext";

function App() {

  const [userData, setUserData] = useState("");

  return (    
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>  
          <Route path="/dashboard" exact>      
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
