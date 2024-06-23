import styled from "styled-components";

const SectionInstruc = styled.section`
  position: absolute;
  top: 50%;
  left: 49%;
  transform: translate(-50%, -50%) scale(0.9);
  min-width: 350px;
  // max-width: 500px;
  border-radius: 8px;
  border: 1px solid orange;
  background: #fff;
  padding: 10px 25px;
  color: #666;
  transition: all 0.3s ease;
  box-shadow: 5px 5px 5px 5px rgba(0, 0.5, 0.5, 0.5);
  margin: 10px;

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

const Button = styled.button`
  padding: 8px 12px;
  font-size: 12px;
  color: #666;
  background-color: orange;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: transparent;
  }
`;

export default function Instructions({ onClick }) {
  return (
    <SectionInstruc>
      <TitleInstructions>Instructions</TitleInstructions>

      <OlInstru>
        <LiInstru>There are 10 questions about your favorite TV Show</LiInstru>
        <LiInstru>For each correct answer, you earn 1000 points</LiInstru>
        <LiInstru>
          You lose 10 points for ever second you spend playing
        </LiInstru>
      </OlInstru>
      <p>
        <i>"So hurry up to score more points"</i>
      </p>

      <ButtonDiv>
        <Button onClick={onClick} type="button">
          PLAY
        </Button>
      </ButtonDiv>
    </SectionInstruc>
  );
}
