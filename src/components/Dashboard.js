import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));

    function getTransactions() {
        const config = {
            headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
          };

          const request = axios.get(
            "https://localhost:4000/transactions",
            config
          );
          request.then((response) => {
            setTransactions(response.data.transactions);            
          });
          request.catch(() => {
            alert("Houve uma falha ao obter suas transações, por favor, atualize a página.");
        });
    }

    return (
       <Container>
           oi
       </Container>
    )
}

const Container = styled.div`
  background: #8c21be;
  height: 100vh;

  img {
    margin-top: 150px;
    margin-bottom: 35px;
    margin-left: 113px;
  }
`;

