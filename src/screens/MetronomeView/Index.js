import React, { Component } from "react";
import styled from "styled-components/native";

import Control from "./Control";

export default class Index extends Component {
    
    render(){

        return (
            <Container>
                
                <Control/>

            </Container>
        )

    }

}

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;