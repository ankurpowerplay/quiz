import { Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  answers,
  setAnswers
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i, idx) => {
    if(answers.includes(currQues)){
      setError('You have already answered this question')
      return;
    }
    setSelected(i);

    if (i === correct) {
      setScore(score + 5);
    }
    else setScore(score - 1);
    setError(false);
  };

  const handleBack = () => {
    if (currQues === 0) {
      return;
    }

    setCurrQues(currQues - 1)
    setSelected()
  }
  const handleNext = () => {
    if(answers.includes(currQues)){
      setCurrQues(currQues + 1);
      setSelected();
      return;
    }
    if (currQues > 8) {
      history.push("/result");
      setAnswers([...answers, currQues])
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
      setAnswers([...answers, currQues])
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };


  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i, idx) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleBack}
          >
            Back Button
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
