import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import Divider from "@/component/util/divider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-top: 5px;
  }
`;

const Item = styled.div``;

export default function SkillNames({ name1, name2 }) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <Item>{name1}</Item>
      <Item>{name2}</Item>
    </Wrapper>
  );
}
