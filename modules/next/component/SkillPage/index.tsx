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
  width: 25%;
`;

const TableContainer = styled.div``;

export default function SkillPage({ winrates }) {
  const router = useRouter();

  const [winrateList, setWinrateList] = useState(winrates || []);

  const [sortKey, setSortKey] = useState("winrate");
  const [sorts, setSorts] = useState({
    winrate: false,
    match_count: false,
  });

  const sortWinrate = (key) => {
    let isAsc;
    if (key == sortKey) {
      isAsc = !sorts[key];
    } else {
      isAsc = false;
    }
    console.log(key, isAsc);
    setSortKey(key);
    sorts[key] = isAsc;
    setSorts(sorts);
    winrates.sort((a, b) => {
      let v = (+a[key] || 0) - (+b[key] || 0);
      if (!isAsc) {
        v = -v;
      }
      return v;
    });
    setWinrateList(winrates.slice());
  };

  useEffect(() => {
    //console.log(winrates);
  }, []);

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
                <TableHead
                  text={"胜率"}
                  sortable={true}
                  onSortChange={() => {
                    sortWinrate("winrate");
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <TableHead
                  text={"场次"}
                  sortable={true}
                  onSortChange={() => {
                    sortWinrate("match_count");
                  }}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(winrateList || []).map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell style={{ minWidth: "80px" }}>
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  <SkillIcon src={`/ability/${item.id}.png`} />
                </Table.Cell>
                <Table.Cell>{item.name_cn}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
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
