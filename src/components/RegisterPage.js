import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../images/MyWallet.png";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";


export default function RegisterPage() {
    let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [username, setUsername] = useState("");
  const [load, setLoad] = useState(false);

  function subscribe(e) {
    e.preventDefault();
    if(password !== checkPassword) {
        alert("As senhas não coincidem!")
    }

    if (!(email && password && username && checkPassword)) {
      alert("Favor, preencha todos os campos");
      return "";
    }

    setLoad(true);

    const body = {
      email: email,
      password: password,
      username: username,      
    };
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",
      body
    );
    request.then(() => {
      history.push("/");
      setLoad(false);
    });

    request.catch((error) => {
      const statusCode = error.response.status;

      if (statusCode === 403) {
        alert("O email que você inseriu já está cadastrado. Tente novamente!");
      } else {
        alert(
          "Ocorreu um erro ao realizar o seu cadastro. Verifique se a imagem inserida na picture url termina em alguma extensão de imagem (ex: .jpg, .png) e tente novamente!"
        );
      }

      setLoad(false);
    });
  }

    return (               
        <Container>
          <img src={logo} alt="logo" />         
        <Form onSubmit={(e) => subscribe(e)}>
            <input
                disabled={load}
                type="text"
                placeholder="Nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
         <input
            disabled={load}
            type="password"
            placeholder="Confirme a senha"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
            <Button disabled={load} type="submit">
                Cadastrar
            </Button>
            <Link to="/">
                <Redirect>Já tem uma conta? Entre agora!</Redirect>
            </Link>
        </Form>
        </Container>
      
    );
}


const Container = styled.div`
  background: #8C21BE;
  height: 100vh;

  img {
    margin-top: 100px;
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
    
