import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const QuizPage = ({}) => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "TV", value: "tv_series" },
    { name: "Movies", value: "movie" },
  ];

  const getGenre = (genre) => {
    switch (genre) {
        case 1: 
            return 'horror'; 
        case 2:
            return 'comedy'; 
        case 3: 
            return 'romance';     
        default: 
            return     
  }

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
//on submit on the form, call a switch case function that returns the corresponding value
// call genres api - pass array of genres - get back genres id
// call list titles function and pass params to return list of movie/show data
// on the component you display liked movies you call the title details api and pass the title id stored under user when movie/show is liked.
//when you click on find your show/movie button, then we need to send selected options to movie rec api
//if you get any results back from api then display them on page, make another component file for that
//movie rec library should be use to generate the list of genres and streaming services.