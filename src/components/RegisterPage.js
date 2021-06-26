import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../images/MyWallet.png";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

export default function RegisterPage() {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [load, setLoad] = useState(false);

    function subscribe(e) {
      e.preventDefault();

      if(password !== confirmPassword) {
        alert("As senhas não coincidem!");
        setPassword("");
        setConfirmPassword("");
      }

      if (!(email && password && name && confirmPassword)) {
        alert("Por favor, preencha todos os campos");
        return "";
      }

      setLoad(true);

      const body = {email, password, name, confirmPassword};

      const request = axios.post("http://localhost:4000/register", body);

      request.then(() => {
        history.push("/");
        setLoad(false);
      });

      request.catch((error) => {
        const statusCode = error.response.status;

        if (statusCode === 403) {
          alert("O email que você inseriu já está cadastrado. Tente novamente!");
        } else if(statusCode === 400) {
          alert(`Ocorreu um erro com as validações de nome (mínimo 3 caracteres), e-mail (o e-mail não é um e-mail válido), senha (mínimo 3 caracteres) ou confirmação de senha (não coincide com a senha digitada). Tente novamente!`)
        } else {
            alert(
              "Ocorreu um erro ao realizar o seu cadastro. Tente novamente!"
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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

    @media (max-width: 330px) {
      margin-top: 70px;
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
    font-family: 'Raleway', sans-serif;
    
    @media (max-width: 330px) {
      width: 280px;      
    }

    :focus {
      box-shadow: 0 0 1em white;
      outline: 0;
    }

    ::placeholder {
      color: black;
      font-family: 'Raleway', sans-serif;
      font-size: 20px;

      @media (max-width: 330px) {
        font-size: 16px;      
      }
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
    
