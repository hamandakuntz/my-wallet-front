import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState("");
  let totalAmount = 0;

  useEffect(() => {
    getTransactions();
  });

  transactions.forEach((item) => {
    if (item.type === "entry") {
      totalAmount += item.value;
    } else {
      totalAmount -= item.value;
    }
  }); 

  function getTransactions() {
    const config = {
      headers: { Authorization: `Bearer ${userData || localUser}` },
    };

    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`,
      config
    );
    request.then((response) => {
      setTransactions(response.data.transactions);
      setName(response.data.userName);
    });

    request.catch(() => {
      alert(
        "Houve uma falha ao obter suas transações, por favor, atualize a página."
      );
    });
  }

  return (
    <Container>
      <Header>
        <Title>{`Olá, ${name}`}</Title>
        <Link to="/logout">
          <IoLogOutOutline className="logout-icon" />
        </Link>
      </Header>
      <TransactionsRegisterCard transactions={transactions}>
        {transactions.length === 0 ? (
          <div className="text">Não há registros de entrada ou saída</div>
        ) : (
          transactions.map((t, i) => (
            <Transaction
              className={`${transactions.length - 1 === i ? "last" : ""}`}
              transactions={transactions}
              item={t}
              key={i}
            />
          ))
        )}
        {transactions.length === 0 ? (
          ""
        ) : (
          <Total totalAmount={totalAmount}>
            <h1>SALDO</h1>
            <span>
              {(totalAmount / 100)
                .toFixed(2)
                .replace(".", ",")
                .replace("-", "")}
            </span>
          </Total>
        )}
      </TransactionsRegisterCard>
      <Wrapper>
        <NewTransationCard>
          <Link to="/newentry">
            <AiOutlinePlusCircle className="plus-icon" />
            <h1>Nova</h1>
            <h2>entrada</h2>
          </Link>
        </NewTransationCard>
        <NewTransationCard>
          <Link to="/newoutput">
            <AiOutlineMinusCircle className="minus-icon" />
            <h1>Nova</h1>
            <h2>saída</h2>
          </Link>
        </NewTransationCard>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway";
  background: #8c21be;
  height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logout-icon {
    font-size: 30px;
    color: white;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  color: white;
`;

const TransactionsRegisterCard = styled.div`
  height: 446px;
  position: relative;
  border-radius: 5px;
  background: #fff;
  margin-top: 10px;
  padding: 10px;
  overflow-y: scroll;

  @media (max-width: 330px) {
    height: 350px;
  }

  .text {
    margin-top: 190px;
    margin-right: 50px;
    margin-left: 50px;
    text-align: center;
    color: #868686;
    font-size: 20px;

    @media (max-width: 330px) {
      margin-top: 150px;
      margin-right: 45px;
      margin-left: 45px;
      text-align: center;
      color: #868686;
      font-size: 18px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const NewTransationCard = styled.div`
  height: 114px;
  width: 155px;
  border-radius: 5px;
  background-color: #a328d6;
  display: flex;
  flex-direction: column;

  @media (max-width: 330px) {
    width: 130px;
  }

  .plus-icon,
  .minus-icon {
    color: white;
    font-size: 25px;
    margin: 10px;
    margin-bottom: 25px;
  }

  h1,
  h2 {
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    color: white;
    padding-left: 10px;
  }
`;

const Total = styled.div`
  width: 94%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 7px;
  background: white; 

  @media (max-width: 330px) {
    bottom: 155px;
    border-radius: 5px;
  }

  h1 {
    font-size: 17px;
    color: #000000;
    font-weight: 700;
  }

  span {
    color: ${(props) => (props.totalAmount < 0 ? "#C70000" : "#50AD0E")};
  }
`;
