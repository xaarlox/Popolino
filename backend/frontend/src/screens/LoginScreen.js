import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Увійти</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label className="fs-5">Електронна пошта</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Введіть вашу електронну пошту..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="fs-5">Пароль</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Введіть ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-4">
          Увійти
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Новий користувач?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Реєстрація
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
