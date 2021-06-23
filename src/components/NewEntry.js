import styled from "styled-components";
import { useContext, useState, useEffect } from "react";

export default function NewEntry() {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [load, setLoad] = useState(false);

    function send(e) {
        e.preventDefault();

        if (!(description && amount)) {
            alert("Por favor, preencha todos os campos");
            return "";
        }
        setLoad(true);
        alert("oi");             
    }

    return (
        <Container>
            <Title>Nova entrada</Title>        
            <Form onSubmit={(e) => send(e)}>
                <input
                disabled={load}
                type="number"
                placeholder="Valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
                <input
                disabled={load}
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}                
                />
                <Button disabled={load}  type="submit">
                    Salvar entrada
                </Button>
            </Form>
            
        </Container>
    )
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
    font-family: 'Raleway', sans-serif;

    :focus {
      box-shadow: 0 0 1em white;
      outline: 0;
    }

    ::placeholder {
      color: black;
      font-family: "Raleway", sans-serif;
      font-size: 20px;
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