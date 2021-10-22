import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";
import { ethers} from 'ethers';
import CreateBurger from "../../../artifacts/contracts/CreateBurger.sol/CreateBurger.json";
import { Button } from "../../components/button";
import { NavBar } from "../../components/navbarHomepage";
import { BurgerCreatorUi } from "../../components/burgerCreator";

const createBurgerAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const ServicesContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
    `};
`;

const Title = styled.h1 `
    ${tw`
        text-4xl
        font-extrabold
        text-black
    `};
`;

const ServicesWrapper = styled.div`
    ${tw`
        flex
        flex-wrap
    `}


`;

const CardContainer = styled.div `
    ${tw`
        flex
        flex-col
        overflow-hidden
        mt-0.5 
        pt-12
        mb-5
        mr-2
        ml-9
    `};
    width: 340px;
    height: 220px;
    background-color: #fff;
    box-shadow: 0 0 3.9px rgba(0, 0 ,0, 0.27);
    border-bottom: 3px solid rgba(0, 0, 255, 1);
    border-top: 3px solid rgba(0, 0, 255, 1);
    border-left: 3px solid rgba(0, 0, 255, 1);
    border-right: 3px solid rgba(0, 0, 255, 1);
`;


const ContentContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
        justify-between
        pr-4
        pl-4
        pt-1
    `};

`;


const Title2 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-black
        text-base
    `};
`;

const Title3 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-red-900
        text-lg
    `};
`;

const SpecialistName = styled.h4 `

    ${tw`
        text-black
        text-base
        items-center
    `};
    font-size: 20px;


`;

const ButtonsContainer=styled.div`
    width: 200px;
    ${tw`
        flex    
        flex-wrap
        h-full
    `};
`;

const FooterContainer = styled.div `
    height:100%;
    ${tw`
        w-full
        flex
        flex-row
        items-center
    `};
    
`;

const Input = styled.input.attrs(props => ({
    type: "number",
  }))`
    border: 2px solid black;
    width: 50px;
    height: 40px;
    ${tw`
        text-4xl
        
    `};
`;

export function Services(props) {
    const [ordersId, setOrdersId] = useState('');

    const [orders, setOrders] = useState([]);
    const [mapping, setMapping] = useState('not')
    useEffect(() => {
        loadOrders()
    }, [])

    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    async function setOrderCompleted() {
        if( !ordersId ) {console.log("Put valid burger Id") ;
            return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, signer)
            const tx = await contract.completeOrder(ordersId)  
            await tx.wait()                      
        }
    }

    async function loadOrders() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, signer);
            const data = await contract.fetchOrdersCreated();

            const ordersL = await Promise.all(data.map(async i => {
                let orderL = {
                    orderId: i.orderId,
                    burgersId: i.burgersId,
                    quantity: i.quantity,
                    completed:i.completed
                }
                return orderL;
                
            }))
            console.log(ordersL.length)
            if(ordersL.length > 0) { setMapping('yes')}
            setOrders([ordersL])

        }
    }
    if ( mapping === 'not') { return( 
        <ServicesContainer>
            <NavBar/>
            <Marginer direction="vertical" margin="1em"/>
            No orders created
            <BurgerCreatorUi />
        </ServicesContainer>)}
    
   console.log(orders)
    return ( 
        <ServicesContainer>
            <NavBar/>        
            <Title>ORDERS</Title>
            <Marginer direction="vertical" margin="3em"/>                           
                <ServicesWrapper >
                {orders.map((order) => (
                    order.map((x) => (            
                    <CardContainer key={x.orderId.toString()} >
                        <ContentContainer>
                            <Title3> Order ID: {x.orderId.toString()}</Title3>
                            <Title3> ID: {x.burgersId.toString()}</Title3>
                            <Title2>Quantity: {x.quantity.toString()}</Title2>
                            <SpecialistName> Completed : {x.completed.toString()} </SpecialistName>
                        </ContentContainer>
                        <FooterContainer>
                            <ButtonsContainer onClick={setOrderCompleted}>
                                <Button text="Complete Order"/>                         
                            </ButtonsContainer> 
                            <Input size="0.02em" onChange={e => setOrdersId(e.target.value)} placeholder="0" />                              
                        </FooterContainer> 
                    </CardContainer>
                    ))
                    ))}              
                </ServicesWrapper>
                <BurgerCreatorUi/>            
        </ServicesContainer>
    );
}