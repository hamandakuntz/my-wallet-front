import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Logout() {
  let history = useHistory();
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${userData || localUser}` },
  };

  const request = axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/logout`,
    {},
    config
  );

  request.then((resp) => {
    history.push("/");
    localStorage.removeItem("user");
  });

  request.catch((error) => {
    alert("Falha ao deslogar. Tente novamente");
    history.push("/dashboard");
  });

  return "";
}
