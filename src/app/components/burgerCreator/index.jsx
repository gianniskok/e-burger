import React from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import tw from "twin.macro";
import { useState, useEffect } from 'react';
import { ethers} from 'ethers';
import { Button } from "../../components/button";
import CreateBurger from "../../../artifacts/contracts/CreateBurger.sol/CreateBurger.json"


const{ create } = require('ipfs-http-client');
const client = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

const createBurgerAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const BurgerCreatorContainer = styled.div`
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
        text-base
        md:text-base
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

const InputText = styled.input.attrs(props => ({
    type: "text",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
    
        text-2xl
        
        
    `};
`;

const InputFile = styled.input.attrs(props => ({
    type: "file",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`

        text-2xl
        
        
    `};
`;

export function BurgerCreatorUi(props) {

    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [availableBurgers, setAvailableBurgers] = useState('');
    const [burgerId, setBurgerId] = useState('');
    const [ammount, setAmmount] = useState('');
    const [img, setImg] = useState(null); 

    useEffect(() => {
        if (img != null) { 
            var fileReader = new window.FileReader();
            fileReader.readAsArrayBuffer(img);
            fileReader.onloadend = () => { 
                setBuffer(Buffer(fileReader.result))
            }
        }
    }, [img]);

    const [buffer, setBuffer] = useState([]);
    
    useEffect(() => {
        if (buffer != null) {
            async function fetchfile(){
                const file = await client.add(buffer)
                console.log( JSON.stringify(file));
                setImgLink(`https://ipfs.infura.io/ipfs/${file.path}`)
            }       
            fetchfile()
        }
    }, [buffer]);
    
    const[imgLink, setImgLink] = useState('');

    async function createBurger() {
        if( !price ) {console.log("Put valid price") ;
            return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, signer)
            const transaction = await contract.createBurger(price, imgLink, ingredients, availableBurgers)
            await transaction.wait()              
        }
    }

    async function addMoreBurgers() {
        if( !burgerId ) {console.log("Put valid id") ;
        return} 
    if( typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, signer)
        const transaction = await contract.setAvailableBurgers(burgerId, ammount)
        await transaction.wait()              
    }
    }
  
   

    return(
        <BurgerCreatorContainer>
            <Title> Create a new burger </Title>
            <Marginer direction="vertical" margin = "1em"/>        
            <Form>
                <StepDescription>
                    Declare the price of the burger in $!
                </StepDescription>
                <Input size="0.2em" onChange={e => setPrice(e.target.value)} placeholder="Price of Burger" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Upload image of your burger!
                </StepDescription>
                <InputFile size="0.2em" onChange={e => setImg(e.target.files[0])}  placeholder="Upload Image" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Declare the ingredients of the burger!
                </StepDescription>
                <InputText size="0.1em" onChange={e => setIngredients(e.target.value)} placeholder="Incredients" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Declare the available burgers for the day!
                </StepDescription>
                <Input size="0.1em" onChange={e => setAvailableBurgers(e.target.value)} placeholder="Available Burgers" />          
            </Form>  
            <Marginer direction="vertical" margin="1em" />
            {imgLink!=='' && <ButtonsContainer onClick={createBurger}>
                <Button text="Create Burger" />
            </ButtonsContainer> }  
            <Marginer direction="vertical" margin="1em" />
            <Title> Add more existing burgers! </Title>  
            <Form>
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Declare the id of the desired burger!
                </StepDescription>
                <Input size="0.2em" onChange={e => setBurgerId(e.target.value)} placeholder="Id of Burger" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Declare the amount you want to add!
                </StepDescription>
                <Input size="0.2em" onChange={e => setAmmount(e.target.value)} placeholder="Amount of Burger" />  
            </Form>  
            <ButtonsContainer onClick={addMoreBurgers}>
                <Button text="Add more burgers" />
            </ButtonsContainer>          
        </BurgerCreatorContainer>
    );
}



