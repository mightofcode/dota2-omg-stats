import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateLine from "@/component/IndexPage/WinrateLine";
import { Table } from "semantic-ui-react";
import CustomTable from "@/component/CustomTable";
import TableHead from "@/component/WinrateTable/TableHead";
import Divider from "@/component/util/divider";
import SkillIcons from "@/component/ComboPage/SkillIcons";
import SkillNames from "@/component/ComboPage/SkillNames";
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

const TableContainer = styled.div``;

export default function ComboPage({ winrates }) {
  const router = useRouter();

  useEffect(() => {
    console.log(winrates);
  }, []);

  return (
    <Wrapper>
      <Title>组合胜率</Title>
      <TableContainer>
        <CustomTable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <TableHead text={"#"} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <TableHead text={"技能组合"} />
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
            {(winrates || []).map((item, index) => (
              <Table.Row>
                <Table.Cell style={{ minWidth: "80px" }}>
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  <SkillIcons id1={item.id1} id2={item.id2} />
                </Table.Cell>
                <Table.Cell>
                  <SkillNames name1={item.name_cn1} name2={item.name_cn2} />
                </Table.Cell>
                <Table.Cell>
                  <SkillNames name1={item.name1} name2={item.name2} />
                </Table.Cell>
                <Table.Cell>
                  {(item?.winrate * 100 || 0.0).toFixed(2)}%
                </Table.Cell>
                <Table.Cell>{item.match_count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </CustomTable>
      </TableContainer>
    </Wrapper>
  );
}