import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SkillComboItem from "@/component/CrackPage/CrackForm/crackPreview/SkillComboItem/SkillComboItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  position: absolute;
  left: 40px;
  top: 100px;
`;

const Item = styled.div`
  flex: 1 1 100px;
`;

export default function ComboBlock({ cracks }) {
  const router = useRouter();
  useEffect(() => {
    //console.log("loaded");
  });
  return (
    <Wrapper>
      {(cracks?.combos || []).map((item) => (
        <SkillComboItem combo={item} key={item.id1 + " " + item.id2} />
      ))}
    </Wrapper>
  );
}
