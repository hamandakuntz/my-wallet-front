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
   
    transactions.forEach(item => {
        if(item.type === "entry") {
            totalAmount += item.value;
        } else {
            totalAmount -= item.value;
        }        
    });

  

    useEffect(() => {
        getTransactions()      
    }, []);

    

    function getTransactions() {
        const config = {
            headers: { Authorization: `Bearer ${userData || localUser}` },
        };

          const request = axios.get(
            `http://localhost:4000/transactions`,
            config
          );
          request.then((response) => {
              console.log(response.data)
              setTransactions(response.data.transactions); 
              setName(response.data.userName);               
          });

          request.catch(() => {
            alert("Houve uma falha ao obter suas transações, por favor, atualize a página.");
        });        
    }

    

    return (
       <Container>
           <Header>
            <Title>{`Olá, ${name}`}</Title>
            <Link to="/logout"> 
                <IoLogOutOutline className="logout-icon"/>
            </Link>
           </Header>  
           <TransactionsRegisterCard transactions={transactions}>
               {transactions.length === 0 ? <div>Não há registros de entrada ou saída</div> :                
               transactions.map((t, i) => (
                <Transaction  
                  transactions={transactions}                
                  item={t}
                  key={i}
                />               
               ))}
            {transactions.length === 0 ? "" : 
                <Total totalAmount={totalAmount}>
                    <h1>SALDO</h1>
                    <span>{(totalAmount/100).toFixed(2).replace(".",",").replace("-","")}</span>
                </Total>
            }                  
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
