import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import postData from "../util";

const QuizPage = ({}) => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "TV", value: "tv" },
    { name: "Movies", value: "movies" },
  ];

  return (
    <Container fluid="md">
      <Row>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <Button> Find Your Shows/Movies </Button>
      </Row>
      <Row>
        <Form.Select aria-label="Default select example">
          <option>Select Streaming Service </option>
          <option value="1">Netflix</option>
          <option value="2">Hulu</option>
          <option value="3">Disney+</option>
        </Form.Select>
      </Row>
      <Row>
        <Form.Select aria-label="Default select example">
          <option>Select Genre </option>
          <option value="1">Horror</option>
          <option value="2">Comedy</option>
          <option value="3">Romance</option>
        </Form.Select>
      </Row>
    </Container>
  );
};

export default QuizPage;


//store the selected options in states
//when you click on find your show/movie button, then we need to send selected options to movie rec api
//if you get any results back from api then display them on page, make another component file for that
//movie rec library should be use to generate the list of genres and streaming services.