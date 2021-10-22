import React from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import tw from "twin.macro";
import { useState } from 'react';
import { ethers} from 'ethers';
import { Button } from "../../components/button";
import CreateBurger from "../../../artifacts/contracts/CreateBurger.sol/CreateBurger.json"



const createBurgerAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const OrderCreatorContainer = styled.div`
    width: 100%;
    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-col
        justify-between
        lg:pl-12 
        lg:pr-12
        pl-3
        pr-3
        pt-10
        items-center
    `};
`;

const StepDescription = styled.p`
    ${tw`
        text-xs
        md:text-sm
        text-center
        w-10/12 
        text-gray-600 
    `};
`;

const Title = styled.h2`
    ${tw`
        text-5xl
        lg:text-4xl 
        text-black
        font-extrabold
    `};
`;


const Input = styled.input.attrs(props => ({
    type: "number",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
        text-2xl
        
    `};
`;

const ButtonsContainer=styled.div`
    width: 200px;
    ${tw`
        flex    
        flex-wrap
        h-full
    `};
`;

const Form = styled.form`
  ${tw`
    w-full
    flex
    flex-col
    items-center
  `};
`;



export function OrderCreatorUi(props) {

    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [burgerId, setBurgerId] = useState('');
    const [quantity, setQuantity] = useState('');

    async function createOrder() {
        if( !burgerId ) {console.log("Put valid burger Id") ;
            return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, signer)
            const price = await contract.getBurgerPrice(burgerId)
            const quan = await contract.getAvailableBurgers(burgerId)
            if(quantity <= quan){
                const transaction = await signer.sendTransaction({
                    to: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
                    value: ethers.utils.parseEther((price * quantity).toString())
                })
                await transaction.wait()
            }
            const tx = await contract.buyBurger(burgerId, quantity)  
            await tx.wait()                      
        }
    }
  
   

    return(
        <OrderCreatorContainer>
            <Title> Create a new order </Title>
            <Marginer direction="vertical" margin = "1em"/>        
            <Form>
                <StepDescription>
                    Declare the Id of the burger you want!
                </StepDescription>
                <Input size="0.2em" onChange={e => setBurgerId(e.target.value)} placeholder="Id of Burger" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Declare the ammount of the burgers you desire!
                </StepDescription>
                <Input size="0.1em" onChange={e => setQuantity(e.target.value)} placeholder="Quantity" />         
            </Form>  
            <Marginer direction="vertical" margin="1em" />
            {<ButtonsContainer onClick={createOrder}>
                <Button text="Create Order" />
            </ButtonsContainer> }                       
        </OrderCreatorContainer>
    );
}



