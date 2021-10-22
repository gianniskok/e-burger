import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Button } from "../../components/button";
import { Marginer } from "../../components/marginer";
import { injected } from "../../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { NavBar } from "../../components/navbarHomepage";
import { Link } from "react-router-dom";


const TopSectionContainer = styled.div`
    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-col
        items-center
        justify-between
        lg:pl-12 
        lg:pr-12
        pl-3
        pr-3
    `};
`;

const Description = styled.p`
    ${tw`
        flex 
        flex-wrap
        items-center
        max-w-2xl 
        text-sm
        text-gray-500 
        md:text-base
        font-normal
        mt-4
    `}
`;

const ButtonsContainer=styled.div`
    ${tw`
        flex   
        mt-4 
        flex-wrap
    `};
`;

const Slogan = styled.h1 `
    ${tw`
        
        text-black
        text-2xl 
        md:text-5xl 
        font-extrabold
        md:font-black
        md:leading-normal  
    `};
`;

export function SignIn(props) {
    
    const {active, account,  activate } = useWeb3React();
    const [admin, setAdmin] = useState(false);

    async function connect() {
        try {
            await activate(injected)
            
        } catch(ex) {
            console.log(ex)
        }
    }

    async function checkValid() {
        if(account.toString() === '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'){
            setAdmin(true);
        }
    }

    return(
        <TopSectionContainer>
            <NavBar/>
            <Marginer direction="vertical" margin="1em"/>
            <Slogan>Welcome to e-Burger!</Slogan>
            <Slogan>Sign In to proceed!</Slogan>
            <Marginer direction="vertical" margin="1em"/>
            <Description>
                Connect with your metamask wallet with just a single click!
            </Description>
            {!active ? 
                <ButtonsContainer onClick={() => connect()} > 
                    {<Button text="Sign in with metamask" />}
                </ButtonsContainer> : 
                <ButtonsContainer onClick={() => checkValid()}> 
                    <Button text="Check Validity" />                    
                </ButtonsContainer>
            }
            { admin ? 
                <Link to="/Admin">
                    <ButtonsContainer> 
                        {<Button text="Admin" />}
                    </ButtonsContainer> 
                </Link> :
                <Link to="/Home">
                    <ButtonsContainer> 
                        <Button text="User" />                    
                    </ButtonsContainer>
                </Link> 
            }               
            { active ? <Description > Connected with {account} </Description>  : <Description> Not connected </Description>}  
        </TopSectionContainer>         
    )
}
