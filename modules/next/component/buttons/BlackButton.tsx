import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { on } from "cluster";

interface Props {
  width?: string;
}

const Wrapper = styled.button<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  width: ${(props) => {
    return props.width || "auto";
  }};
  box-sizing: border-box;
  cursor: pointer;
  background: #4b5057;
  border-radius: 4px;
  padding: 5px 15px;

  :hover {
    background: #3a3e43;
  }
  white-space: nowrap;
`;

const Item = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
`;

export default function BlackButton({
  text,
  href = null,
  onClick = null,
  width = null,
}) {
  const router = useRouter();
  return (
    <Wrapper
      width={width}
      onClick={() => {
        if (href) {
          router.push(href);
        } else if (onClick) {
          onClick();
        }
      }}
    >
      <Item>{text}</Item>
    </Wrapper>
  );
}
