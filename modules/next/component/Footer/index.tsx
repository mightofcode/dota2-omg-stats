import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import * as React from "react";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  width: 100%;
  height: 50px;
  background-color: #ffffff;
`;

const Item = styled.div`
  flex: 1 1 100px;
`;

export default function Footer({}) {
    const router = useRouter();

    return (
        <Wrapper>
            <a href={"/"}>footer</a>
        </Wrapper>
    );
}
