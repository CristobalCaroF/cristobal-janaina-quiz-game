import styled from "styled-components";
import { Box, Button, Center } from "./Container";

const SectionInstruc = styled.section`
  margin: 8px;
  border-radius: 8px;
  border: 1px solid orange;
  background: #fff;
  padding: 10px 25px;
  color: #666;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 3px 3px rgba(0, 0.5, 0.5, 0.5);
  max-width: 768px;
  p {
    text-align: center;
    text-transform: inherit;
    margin-bottom: 30px;
  }
`;

const TitleInstructions = styled.h1`
  font-size: 2em;
  margin-bottom: 8px;
  color: #333;
`;
const OlInstru = styled.ol`
  padding: 10px;
  text-align: start;
`;
const LiInstru = styled.li`
  display: inline-block;

  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin: 4px 0px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Instructions({ onClick }) {
  return (
    <Center>
      <Box>
        <TitleInstructions>Instructions</TitleInstructions>

        <OlInstru>
          <LiInstru>
            You'll answer 10 questions about your favorite TV Show
          </LiInstru>
          <LiInstru>For each correct answer, you earn 1000 points</LiInstru>
          <LiInstru>
            You lose 10 points for every second you spend playing
          </LiInstru>
        </OlInstru>
        <p>
          <i>"So, hurry up to score more points!"</i>
        </p>

        <ButtonDiv>
          <Button onClick={onClick} type="button">
            PLAY
          </Button>
        </ButtonDiv>
      </Box>
    </Center>
  );
}
