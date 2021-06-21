import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../images/MyWallet.png";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);    

    function login(e) {
        e.preventDefault();
        alert("oi!")

        // if (!(email && password)) {
        // alert("Favor, preencha todos os campos");
        // return "";
        // }
        // const body = { email, password };
        // // const request = axios.post(         
        // // );
    
        // setLoad(true);
        // const body = { email, password };
        // const request = axios.post(
        //   "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in",
        //   body
        // );
    
        // request.then((resp) => {
        //   setLoad(false);
        //   setUserData(resp.data);
         
        //   setEmail("");
        //   setPassword("");          
        // });
    
        // request.catch((error) => {
        //   alert("Falha no login! Email ou senha incorretos.");
        //   setLoad(false);
        // });
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
       
    )
}

const Container = styled.div`
  background: #8C21BE;
  height: 100vh;

  img {
    margin-top: 150px;
    margin-bottom: 35px;
    margin-left: 113px;
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

    ::placeholder {
        color: black;
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
    }
  }
`;

const Button = styled.button`
  background-color: #A328D6;
  color: #fff;
  width: 85%;
  height: 65px;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  margin-bottom: 13px;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;

  @media (max-width: 614px) {
    height: 55px;
  }
`;

const Redirect = styled.p`
  font-family: 'Raleway', sans-serif;
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  margin-top: 5px;
  font-weight: 700;
`;