import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import postData from "../util";

const Login = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    console.log(username);
    console.log(password);
    postData("api/login", { username, password }).then((data) => {
      console.log(data);
      //if user is authenticated then return true
      //else user is not authenticated then tell user it failed
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username </Form.Label>
            <Form.Control
              onChange={setUsername}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password </Form.Label>
            <Form.Control
              onChange={setPassword}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="2">
          <Button onClick={onLogin}>Login </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="2">
          <Button>Register </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

//server routes for login
//send username and password to routes
//interpret what we get back to determine if user is logged in or not
//if logged in then show that you're logged in
//if not logged in then error message
