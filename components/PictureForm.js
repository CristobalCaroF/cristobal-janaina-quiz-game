import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  max-width: 768px;
  margin: auto;
  padding: 10px;

  border-radius: 10px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 12px;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 10px;
  color: #333;
  padding: 5px;
  width: 100%;
  border: 1px solid orange;
  border-radius: 5px;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: space-between;

  padding: 10px;
  margin-left: 4px;
`;

const Button = styled.button`
  padding: 5px 10px;
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

export default function PictureForm({
  handleSubmit,
  handleChangeAvatar,
  onDelete,
  showDelete,
}) {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="file">Change profile picture</Label>
      <Input type="file" name="file" onChange={handleChangeAvatar} />
      <ButtonContainer>
        <Button type="submit">Upload</Button>
        {showDelete && (
          <Button type="button" onClick={handleDelete}>
            Delete Image
          </Button>
        )}
      </ButtonContainer>
    </Form>
  );
}
