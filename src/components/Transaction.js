import styled from "styled-components";
import dayjs from "dayjs";

export default function Transaction(props) {
    const { date, description, value, type } = props.item;    
    const newDate = dayjs(date).format('DD/MM'); 

    return (
        <Container type={type}>
            <Wrapper>
                <Date>{newDate}</Date>
                <Description>{description}</Description>
            </Wrapper> 
            <span className="value">{(value/100).toFixed(2).replace(".",",")}</span>
        </Container>       
    );
}

const Container = styled.div`
    width: 100%;  
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding-top: 20px;    
    align-items: center;

    .value {
        color: ${props => props.type === "output" ? "#C70000" : "#03AC00"};        
    }
`;

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;      
`;

const Date = styled.div`
    padding-right: 10px;
    padding-bottom: 2px;
    color: #C6C6C6;
`;


const Description = styled.div`  
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: black;
`;
