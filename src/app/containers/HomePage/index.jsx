import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";
import { NavBar } from "../../components/navbarHomepage";
import { AboutUs } from "./aboutUs";
import { Services } from "../../containers/HomePage/services";
import { Footer } from "../../components/footer";
import { OrderCreatorUi } from "../../components/orderCreator";



const PageContainer = styled.div `
    min-height:800px;
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;


  
export function HomePage(props) {
    return (   
            <PageContainer>
                <NavBar />
                <Marginer direction="vertical" margin="2em" />
                <AboutUs />
                <Marginer direction="vertical" margin="5em" />
                <Services />
                <Marginer direction="vertical" margin="5em" />
                <OrderCreatorUi />
                <Marginer direction="vertical" margin="5em" />
                <Footer />
            </PageContainer>
    );
}