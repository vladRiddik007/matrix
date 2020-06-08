/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Container } from "./components/table.styled";
import TableSum from "./components/table-sum";
import TableMain from "./components/table-main";

const App = () => {
  return (
    <Container>
      <TableSum />
      <TableMain />
    </Container>
  );
};
export default App;

