import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Transaction from "./Transaction";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([
        {
            date: "30/11",
            description: "Almoço mãe",
            value: 3990,
            type: "output",
        },
        {
            date: "27/11",
            description: "Mercado",
            value: 54254,
            type: "output",
        },
        {
            date: "26/11",
            description: "Compras churrasco",
            value: 6760,
            type: "output",
        },
        {
            date: "20/11",
            description: "Empréstimo Maria",
            value: 50000,
            type: "entry",
        },
        {
            date: "15/11",
            description: "Salário",
            value: 300000,
            type: "entry",
        },
    ]);    
      
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState("");

    let total = 0;
   
    transactions.forEach(item => {
        if(item.type === "entry") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    // useEffect(() => {
    //     getTransactions()      
    // }, []);

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
            setName(response.data.user.name);           
          });
          request.catch(() => {
            alert("Houve uma falha ao obter suas transações, por favor, atualize a página.");
        });
    }

    return (
       <Container>
           <Header>
            <Title>{`Olá ${name}`}</Title>
            <IoLogOutOutline className="logout-icon"/>
           </Header>  
           <TransactionsRegisterCard transactions={transactions}>
               {transactions.length === 0 ? <div>Não há registros de entrada ou saída</div> :                
               transactions.map((t, i) => (
                <Transaction                  
                  item={t}
                  key={i}
                />               
               ))}
            {transactions.length === 0 ? "" : 
                <Total total={total}>
                    <h1>SALDO</h1>
                    <span>{(total/100).toFixed(2).replace(".",",").replace("-","")}</span>
                </Total>
            }                  
           </TransactionsRegisterCard>     
           <Wrapper>  
                <NewTransationCard>  
                    <AiOutlinePlusCircle className="plus-icon" />
                   <h1>Nova</h1>
                   <h2>entrada</h2>
                </NewTransationCard>
                <NewTransationCard> 
                    <AiOutlineMinusCircle className="minus-icon" />                   
                    <h1>Nova</h1>
                    <h2>saída</h2>
                </NewTransationCard>
           </Wrapper>  
       </Container>
    )
}

const Container = styled.div`
  font-family: "Raleway";
  background: #8c21be;
  height: 100vh;
  padding: 20px;  
`;

const Header = styled.div`
    display:flex;
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
    border-radius: 5px;
    background: #fff;
    margin-top: 10px;  
    padding: 10px;    
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
    background-color: #A328D6;
    display: flex;
    flex-direction: column;
    
    .plus-icon, .minus-icon {
        color: white;
        font-size: 25px;
        margin: 10px;
        margin-bottom: 25px;
    }

    h1, h2 {        
        font-size: 17px;        
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;        
        color: white;
        padding-left: 10px;
    }
`;

const Total = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;    
    bottom: 170px;
    padding-right: 60px;

    h1 {
        font-size: 17px;
        color: #000000;
        font-weight: 700;
    }

    span {
        color: ${props => props.total < 0 ? "#C70000" : "#50AD0E"}
    }
`;
