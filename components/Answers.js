import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Grid, Paper, Typography } from "@mui/material";

const Letter = styled(Paper)({});

export default function Answers({ values, onSelect, selectedAnswer, correctAnswer }) {
  const theme = useTheme();
  const letter = ["A", "B", "C", "D"];

  return (
    <Grid container spacing={3}>
      {values.map((answer, index) => (
        <Grid item key={answer} xs={12} sm={6}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%" }}
            onClick={() => onSelect(answer)}
            color={selectedAnswer === answer ? (answer == correctAnswer ? "success" : "error") : "primary"}
            disabled={selectedAnswer?.length > 0 && selectedAnswer !== answer}
          >
            <Paper
              elevation={0}
              variant="outlined"
              sx={{ backgroundColor: theme.palette.background.default, paddingLeft: 1, paddingRight: 1 }}
            >
              <Typography variant="h4">{letter[index]}</Typography>
            </Paper>
            <Typography variant="h6" align="center" sx={{ marginLeft: "auto", width: "100%" }}>
              {answer}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
