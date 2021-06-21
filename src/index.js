import { useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./components/styles/reset.css";
import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState("");  

  return (    
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>         
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
