import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import Divider from "@/component/util/divider";
import { Table } from "semantic-ui-react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
`;
const SkillIcon = styled.img`
  border-radius: 2px;
  width: 40px;
`;

const Item = styled.div``;

export default function SkillIcons({ id1, id2 }) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <SkillIcon
        src={`https://mocpublic.oss-cn-qingdao.aliyuncs.com/dota2/latest/skills/${id1}.png`}
      />
      <Divider width={"10px"} />
      <SkillIcon
        src={`https://mocpublic.oss-cn-qingdao.aliyuncs.com/dota2/latest/skills/${id2}.png`}
      />
    </Wrapper>
  );
}
