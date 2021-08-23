import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import CurrencyInput from "react-currency-masked-input";

export default function NewOutput() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  let history = useHistory();

  function send(e) {
    e.preventDefault();

    const formatedAmount = amount.replace(".", "");

    if (!(description && formatedAmount)) {
      alert("Por favor, preencha todos os campos");
      return "";
    }

    setLoad(true);

    const body = {
      value: formatedAmount,
      description: description,
      type: "output",
    };

    const config = {
      headers: { Authorization: `Bearer ${userData || localUser}` },
    };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/newtransaction`,
      body,
      config
    );

    request.then((response) => {
      alert("Sua nova saída foi cadastrada com sucesso!");
      history.push("/dashboard");
    });

    request.catch(() => {
      alert("Houve uma falha ao inserir sua nova saída. Tente novamente.");
    });
  }

  return (
    <Container>
      <Title>Nova saída</Title>
      <Form onSubmit={(e) => send(e)}>
        <CurrencyInput
          max="9999999.99"
          maxLength="10"
          disabled={load}
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e, m) => setAmount(m)}
          required
        />
        <input
          disabled={load}
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button disabled={load} type="submit">
          Salvar saída
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway";
  background: #8c21be;
  height: 100vh;
  padding: 20px;
  padding-top: 50px;
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

const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  color: white;
  padding-bottom: 50px;
`;

const Button = styled.button`
  background-color: #a328d6;
  color: #fff;
  width: 100%;
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
