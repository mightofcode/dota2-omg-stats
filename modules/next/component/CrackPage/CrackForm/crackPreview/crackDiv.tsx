import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CrackItem from "@/component/CrackPage/CrackForm/crackPreview/crackItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  position: absolute;
  left: 0;
  top: 0;
`;

interface Prop {}
const Item = styled.div<Prop>``;

export default function CrackDiv({ cracks }) {
  const router = useRouter();
  console.log("crack", cracks);

  const abilities = [];

  for (const clip of cracks?.clips || []) {
    const ability =
      (cracks?.abilities || []).find((a) => {
        return a.id == clip.id;
      }) || {};
    abilities.push({
      ...clip,
      ...ability,
    });
  }

  abilities.sort((a, b) => {
    return -a.winrate + b.winrate;
  });

  const colorTable = [
    "#ff8000",
    "#a335ee",
    "#0070dd",
    "#1eff00",
    "#ffffff",
    "#888888",
  ];
  for (let i = 0; i < abilities.length; i++) {
    const a = Math.floor(i / 10);
    console.log(a);
    abilities[i].color = colorTable[a];
  }

  return (
    <Wrapper>
      {(abilities || []).map((item) => (
        <CrackItem key={item.id} item={item} />
      ))}
    </Wrapper>
  );
}
