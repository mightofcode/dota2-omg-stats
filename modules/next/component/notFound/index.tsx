import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import NotFoundContainer from "@/component/notFound/NotFoundContainer";

const Wrapper = styled.div`
  margin-top: 120px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
`;

const Item = styled.div`
  flex: 1 1 100px;
`;
const Card32 = styled.div`
  margin: 0;
  padding: 32px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
`;
export default function NotFound({}) {
  const router = useRouter();

  return (
    <Wrapper>
      <Card32>
        <NotFoundContainer />
      </Card32>
    </Wrapper>
  );
}
