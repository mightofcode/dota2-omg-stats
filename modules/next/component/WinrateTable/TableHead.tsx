import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-left: 3px;
  }
`;

const Item = styled.div`
  font-size: 14px;
  line-height: 100%;
  color: #646c7a;
`;

const ItemSortable = styled.div`
  font-size: 14px;
  line-height: 100%;
  color: #646c7a;
  cursor: pointer;
  :hover {
  }
`;

const SortSvg = styled.img`
  cursor: pointer;
  :hover {
  }
`;

export default function TableHead({
  text,
  sortable = false,
  onSortChange = null,
}) {
  const router = useRouter();
  const [sort, setSort] = useState(true);
  useEffect(() => {}, []);
  const onClick = () => {
    setSort(!sort);
    if (onSortChange) {
      onSortChange(sort);
    }
  };
  return (
    <Wrapper onClick={onClick}>
      {sortable ? (
        <ItemSortable>{text}</ItemSortable>
      ) : (
        <Item onClick={onClick}>{text}</Item>
      )}
      {sortable && <SortSvg src={"/table-sort.svg"} />}
    </Wrapper>
  );
}
