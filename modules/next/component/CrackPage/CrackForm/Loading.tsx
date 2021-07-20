import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  width: 100%;
  height: 100%;
`;

const Loader = styled.div`
  width: 100%;
  height: 100%;
  border: 5px solid;
  color: #2cb3ff;
  border-radius: 50%;
  border-top-color: transparent;

  @keyframes loader {
    to {
      transform: rotate(360deg);
    }
  }
  animation: loader 1.2s linear infinite;
`;

export default function Loading({}) {
  const router = useRouter();
  useEffect(() => {
    console.log("loaded");
  });
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
}
