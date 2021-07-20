import { useState, useEffect, default as React } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CrackDiv from "@/component/CrackPage/CrackForm/crackPreview/crackDiv";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  width: 1920px;
  position: relative;
`;

const PreviewImg = styled.img`
  max-width: 100%;
`;

const Item = styled.div`
  flex: 1 1 100px;
`;

export default function CrackPreview({ img, crackResult }) {
  const router = useRouter();
  useEffect(() => {
    //console.log("loaded");
  });
  return (
    <Wrapper>
      <PreviewImg src={img} />
      <CrackDiv cracks={crackResult} />
    </Wrapper>
  );
}
