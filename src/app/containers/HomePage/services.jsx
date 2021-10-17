import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";
import { ethers} from 'ethers';
import CreateBurger from "../../../artifacts/contracts/CreateBurger.sol/CreateBurger.json";
import { Button } from "../../components/button";

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
        mb-5
        mr-2
        ml-9
    `};
    width: 440px;
    height: 560px;
    background-color: #fff;
    box-shadow: 0 0 3.9px rgba(0, 0 ,0, 0.27);
    border-bottom: 3px solid rgba(0, 0, 255, 1);
    border-top: 3px solid rgba(0, 0, 255, 1);
    border-left: 3px solid rgba(0, 0, 255, 1);
    border-right: 3px solid rgba(0, 0, 255, 1);
`;

const TopContainer = styled.div `    
    ${tw`
        w-full
    `};
`;

const ServiceThumbnail = styled.div `
    width: 100%;
    height: 20em;
    
    img {
        width: 100%;
        height: 100%;
    }
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

const BottomContainer = styled.div `
    ${tw`
        
        w-full
        flex
        flex-col
        items-center
        justify-between
        pt-6
        pr-4 
        pl-4 
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

const PriceContainer = styled.div `
    ${tw`
        flex
        items-center
    `};
`;

const PriceText = styled.div `
    ${tw`
    `};
    color: #2A9D8F;
    font-weight: 500;
`;

const StartingAtText = styled.h6 `
    color: rgba(0, 1, 100, 0.5);
    font-weight: 400;
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
    const [burgersID, setBurgersId] = useState('');
    
    async function getBurgersPrice() {
        if (!burgersID) {console.log("Put Burger's Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, provider)
            try { 
                const data = await contract.getBurgerPrice(burgersID)
                console.log('Price of burger: ', data.toString())
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    async function getBurgersImgLink() {
        if (!burgersID) {console.log("Put Burger's Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, provider)
            try { 
                const data = await contract.burgerImageLink(burgersID)
                console.log('Burgers Image Link: ', data)
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    const [burgers, setBurgers] = useState([]);
    const [mapping, setMapping] = useState('not')
    useEffect(() => {
        loadBurgers()
    }, [])

    async function loadBurgers() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(createBurgerAddress, CreateBurger.abi, signer);
            const data = await contract.fetchBurgersCreated();

            const burgersL = await Promise.all(data.map(async i => {
                let burgerL = {
                    burgersId: i.burgersId,
                    price: i.price,
                    imageLink: i.imageLink,
                    ingredients: i.ingredients,
                    availableBurgers: i.availableBurgers
                }
                return burgerL;
                
            }))
            console.log(burgersL.length)
            if(burgersL.length > 0) { setMapping('yes')}
            setBurgers([burgersL])

        }
    }
    if ( mapping === 'not') { return <ServicesContainer>No burgers created</ServicesContainer>}
   console.log(burgers)
    return ( 
        <ServicesContainer>
            <Title>Available burgers</Title>
            <Marginer direction="vertical" margin="3em"/>                           
                <ServicesWrapper >
                {burgers.map((burger) => (
                    burger.map((x) => (            
                    <CardContainer key={x.burgersId.toString()} >
                        <TopContainer >
                            <ServiceThumbnail >
                                <img src={x.imageLink} alt=" " />
                            </ServiceThumbnail>
                        </TopContainer>
                        <ContentContainer>
                            <Title3> ID: {x.burgersId.toString()}</Title3>
                            <Title2>Ingredients: {x.ingredients}</Title2>
                            <SpecialistName> Available : {x.availableBurgers.toString()} </SpecialistName>
                        </ContentContainer>
                        <BottomContainer>
                            <PriceContainer>
                                <StartingAtText>Price:  </StartingAtText>
                                <Marginer direction='horizontal' margin="0.2em" />
                                <PriceText>{x.price.toString()} $ </PriceText>
                                <Marginer direction='horizontal' margin="0.5em" />
                            </PriceContainer>
                            <FooterContainer>
                                <ButtonsContainer onClick={getBurgersPrice}>
                                    <Button text="See Burger's cost"/>                         
                                </ButtonsContainer>
                                <ButtonsContainer onClick={getBurgersImgLink}>
                                    <Button text="See Apartment's Image Link"/>                         
                                </ButtonsContainer>
                                <PriceContainer>
                                    <Input size="0.02em" onChange={e => setBurgersId(e.target.value)} placeholder="0" />
                                </PriceContainer>                                          
                            </FooterContainer> 
                        </BottomContainer>
                    </CardContainer>
                    ))
                    ))}              
                </ServicesWrapper>            
        </ServicesContainer>
    );
}