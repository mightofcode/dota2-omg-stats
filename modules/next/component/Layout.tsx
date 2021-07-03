import styled from "styled-components";
import * as React from "react";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const FlexGrow = styled.div`
  position: relative;
  flex-grow: 1;
`;

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <FlexGrow>{children}</FlexGrow>
      <Footer />
    </Wrapper>
  );
}
