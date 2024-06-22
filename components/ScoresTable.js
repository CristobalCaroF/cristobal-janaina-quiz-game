import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  margin: 20px auto;
  border-collapse: collapse;
  box-shadow: 2px 5px 5px rgba(0, 0.5, 0.5, 0.5);
  border-radius: 8px;
  overflow: hidden;
  color: #666;
`;

const TableHeader = styled.th`
  color: #666;
  padding: 10px;
  text-align: center;
  font-size: 12px;
  margin-bottom: 6px;
`;

const TableHea = styled.thead`
  border-bottom: 6px;
`;
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: orange;
  }
  margin-bottom: 6px;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  font-size: 12px;
  margin-bottom: 6px;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin-top: 2px;
`;

export default function ScoresTable({ scores }) {
  return (
    <TableContainer>
      <Table>
        <TableHea>
          <TableRow>
            <TableHeader>Date</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader>Quiz</TableHeader>
          </TableRow>
        </TableHea>
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
