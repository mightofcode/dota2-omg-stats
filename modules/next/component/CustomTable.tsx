import styled from "styled-components";
import { Table } from "semantic-ui-react";

const StyledTable = styled(Table)`
  margin: 0 !important;
  border: none !important;
  th {
    font-size: 0.8125rem !important;
    font-weight: 400 !important;
    line-height: 1rem !important;
    color: #696d73 !important;
    background-color: #ffffff !important;
    padding: 5px 10px !important;
    border-bottom: 1px solid #eaeaea !important;
  }
  thead {
  }
  tr {
    font-size: 14px;
    line-height: 100%;
    color: #646c7a;
    border-top: none !important;
  }
  td {
    padding: 5px 10px !important;
    min-width: 80px;
  }
`;

export default function CustomTable({ children, ...props }) {
  return <StyledTable {...props}>{children}</StyledTable>;
}
