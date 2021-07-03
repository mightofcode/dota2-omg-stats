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
    padding: 0.75rem 1rem !important;
    border-bottom: none !important;
  }
  :not(:last-of-type(tr)) {
    td {
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      line-height: 1.375rem !important;
      color: #34373c !important;
      padding: 0.75rem 1rem !important;
      border-top: none !important;
      border-bottom: 1px solid #f3f3f3;
    }
  }
`;

export default function CustomTable({ children, ...props }) {
  return <StyledTable {...props}>{children}</StyledTable>;
}
