const { default: styled } = require("styled-components");

const Container = styled.div`
  display: flex;
  height: calc(100vh - 83px);
  margin-top: 83px;
  width: 100%;
  justify-content: center;
`;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Box = styled.div`
  border-radius: 8px;
  border: 1px solid orange;
  background: #fff;
  padding: 10px 25px;
  color: #666;
  transition: all 0.3s ease;
  box-shadow: 1px 1px 1px 1px rgba(0, 0.5, 0.5, 0.5);
  max-width: 768px;
  margin: 8px;
`;

export const Button = styled.button`
  background-color: orange;
  border: 1px solid orange;
  border-radius: 5px;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 12px;
  transition: background-color 0.3s ease;

  &:hover {
    border: 1px solid orange;
    background-color: transparent;
  }
`;

export default Container;
