import { useState, useEffect, default as React } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Loading from "@/component/CrackPage/CrackForm/Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  > :not(:last-child) {
    margin-bottom: 20px;
  }
  width: 100%;
`;

const Item = styled.div`
  flex: 1 1 100px;
`;
const Text = styled.div`
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  color: #8b8b8b;
`;
const LoadingWrapper = styled.div`
  align-self: center;
  width: 100px;
  height: 100px;
  margin-top: 50px !important;
`;
export default function LoadingDiv({}) {
  const router = useRouter();
  useEffect(() => {
    console.log("loaded");
  });
  return (
    <Wrapper>
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
      <Text>耗时10s左右，耐心等待</Text>
    </Wrapper>
  );
}
