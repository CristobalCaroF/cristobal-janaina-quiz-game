import styled from "styled-components";

const Table = styled.table`
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: 2px 10px 5px rgba(0, 0.5, 0.5, 0.5);
`;

const TableHeader = styled.th`
  background-color: #26355d;
  color: #fff;
  padding: 10px;
  text-align: center;
  font-size: 12px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgb(222, 164, 89);
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: 12px;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export default function ScoresTable({ scores }) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Date</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader>Quiz</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {scores?.map((score, index) => (
            <TableRow key={index}>
              <TableCell>{score.date}</TableCell>
              <TableCell>{score.score}</TableCell>
              <TableCell>{score.quiz.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
