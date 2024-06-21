import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
  box-shadow: 2px 10px 5px rgba(0, 0.5, 0.5, 0.5);
  border-radius: 10px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 12px;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 5px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: #fff;
  background-color: #26355d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
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
      <Button type="submit">Upload</Button>
      {showDelete && (
        <Button type="button" onClick={handleDelete}>
          Delete Image
        </Button>
      )}
    </Form>
  );
}
