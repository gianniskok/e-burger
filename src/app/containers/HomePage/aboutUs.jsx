import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import HomePageImg from "../../../assets/images/restaurant.jpg"

const AboutUsContainer = styled.div`
${tw`
    w-full
    flex
    items-center
    max-w-screen-xl
    xl:justify-center
    pt-4 
    pb-4 
    pr-7 
    pl-7 
    md:pl-0 
    md:pr-0 
    bg-white
`};
`;


const HouseContainer = styled.div`
    
    height:23em;
    margin-left: 200px;

   
    

    img {
        width:auto;
        height: 100%;
    }
`;

const InfoContainer = styled.div`
    ${tw`
        
        w-1/2
        flex
        items-start
        justify-between
        flex-col
        pl-16
    `};
`;

const Title = styled.h1`
    ${tw`
        
        text-black
        text-2xl 
        md:text-5xl 
        font-extrabold
        md:font-black
        md:leading-normal      
    `};
`;

const InfoText = styled.p`
    ${tw`
        
        max-w-2xl 
        text-sm
        text-gray-500 
        md:text-base
        font-normal
        mt-4
    `};
`;

export function AboutUs(props) {
    return (
    <AboutUsContainer>
        <InfoContainer>
            <Title>Order our delicious burgers now!</Title>
            <InfoText>
               Order your favorite burger from your favorite local burger store ! Our burgers are being made with love and fresh ingredients 100% organic!
            </InfoText>
        </InfoContainer>
        <HouseContainer>
            <img src={HomePageImg} alt="" />
        </HouseContainer>
    </AboutUsContainer>
    );
}