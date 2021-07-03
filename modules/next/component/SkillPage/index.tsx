import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateLine from "@/component/IndexPage/WinrateLine";
import { Table } from "semantic-ui-react";
import CustomTable from "@/component/CustomTable";
import TableHead from "@/component/WinrateTable/TableHead";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-top: 10px;
  }
  width: 100%;
  padding: 46px 131px;
`;

const Item = styled.div`
  flex: 1 1 100px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  color: #484848;
`;

const SkillIcon = styled.img`
  border-radius: 2px;
  width: 30px;
`;

const TableContainer = styled.div``;

export default function SkillPage({}) {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Title>技能胜率</Title>
      <TableContainer>
        <CustomTable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <TableHead text={"#"} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <TableHead text={"技能"} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <TableHead text={"NAME-CN"} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <TableHead text={"NAME-EN"} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <TableHead text={"胜率"} sortable={true} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <TableHead text={"场次"} sortable={true} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell style={{ "min-width": "80px" }}>1</Table.Cell>
              <Table.Cell>
                <SkillIcon src={"/earthshaker_enchant_totem_25.png"} />
              </Table.Cell>
              <Table.Cell>图腾暴击</Table.Cell>
              <Table.Cell>earthshaker_enchant_totem</Table.Cell>
              <Table.Cell>50.00%</Table.Cell>
              <Table.Cell>10000</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>
                <SkillIcon src={"/earthshaker_enchant_totem_25.png"} />
              </Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>
                <SkillIcon src={"/earthshaker_enchant_totem_25.png"} />
              </Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1</Table.Cell>
            </Table.Row>
          </Table.Body>
        </CustomTable>
      </TableContainer>
    </Wrapper>
  );
}
