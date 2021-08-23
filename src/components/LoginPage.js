import { useContext, useState } from "react";
import styled from "styled-components";
import logo from "../images/MyWallet.png";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  let history = useHistory();
  const { setUserData } = useContext(UserContext);

  function login(e) {
    e.preventDefault();

    if (!(email && password)) {
      alert("Por favor, preencha todos os campos");
      return "";
    }

    setLoad(true);

    const body = { email, password };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/login`,
      body
    );

    request.then((resp) => {
      setLoad(false);
      setUserData(resp.data);
      localStorage.setItem("user", JSON.stringify(resp.data));
      setEmail("");
      setPassword("");
      history.push("/dashboard");
    });

    request.catch((error) => {
      alert("Falha no login! Email ou senha incorretos.");
      setLoad(false);
    });
  }

  return (
    <Container>
      <img src={logo} alt="logo"></img>
      <Form onSubmit={(e) => login(e)}>
        <input
          disabled={load}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          disabled={load}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={load} type="submit">
          Entrar
        </Button>
        <Link to="/register">
          <Redirect>Primeira vez? Cadastre-se!</Redirect>
        </Link>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  background: #8c21be;
  height: 100vh;

  img {
    margin-top: 150px;
    margin-bottom: 35px;
    margin-left: 113px;

    @media (max-width: 330px) {
      margin-top: 130px;
      margin-left: 90px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
    border: none;
    margin-bottom: 15px;
    padding-left: 15px;
    font-family: "Raleway", sans-serif;

    @media (max-width: 330px) {
      width: 280px;
    }

    :focus {
      box-shadow: 0 0 1em white;
      outline: 0;
    }

    ::placeholder {
      color: black;
      font-family: "Raleway", sans-serif;
      font-size: 20px;

      @media (max-width: 330px) {
        font-size: 16px;
      }
    }
  }
`;

const Button = styled.button`
  background-color: #a328d6;
  color: #fff;
  width: 85%;
  height: 65px;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  margin-bottom: 13px;
  font-family: "Raleway", sans-serif;
  font-weight: 700;

  @media (max-width: 614px) {
    height: 55px;
  }
`;

const Redirect = styled.p`
  font-family: "Raleway", sans-serif;
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  margin-top: 5px;
  font-weight: 700;
`;
