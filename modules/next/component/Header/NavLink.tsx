import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import NavLinkMenu from "@/component/Header/NavLinkMenu";
import NavLinkTitle from "@/component/Header/NavLinkTitle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-left: 5px;
  }
  position: relative;
`;

export default function NavLink({ text }) {
  const router = useRouter();

  const [show, setShow] = useState(false);

  useEffect(() => {}, []);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Wrapper>
      <NavLinkTitle
        text={text}
        onClick={() => {
          handleClick();
        }}
      />
      {show && <NavLinkMenu />}
    </Wrapper>
  );
}
