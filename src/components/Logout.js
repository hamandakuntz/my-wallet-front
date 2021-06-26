import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

export default function Logout() {
    let history = useHistory();
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    const config = {
      headers: { Authorization: `Bearer ${userData || localUser}` },
    };    

    const request = axios.post("http://localhost:4000/logout", {}, config);

    request.then((resp) => {     
      history.push("/");
      localStorage.removeItem('user');
    });

    request.catch((error) => {
      alert("Falha ao deslogar. Tente novamente");   
      history.push("/dashboard");  
    });

    return (
        ""
    )   
}