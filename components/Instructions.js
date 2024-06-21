import styled from "styled-components";

const SectionInstruc = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border-radius: 6px;
  background: #fff;
  padding: 10px 25px;

  p {
    text-align: center;
    text-transform: inherit;
  }
`;

const TitleInstructions = styled.h1`
  font-size: 30px;
  color: #c40094;
`;
const OlInstru = styled.ol`
  padding: 10px;
`;
const LiInstru = styled.li`
  display: inline-block;
  align-items: center;
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
  font-size: 11px;
  width: 90px;
  height: 20px;
  background: gray;
  outline: none;
  border-radius: 25px;
  border: 1px solid black;
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
