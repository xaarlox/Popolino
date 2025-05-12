import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Паролі не співпали.");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>Зареєструватися</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label className="fs-5">Ім'я</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Введіть ваше..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId="password" className="mb-3">
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
        <Form.Group controlId="passwordConfirm">
          <Form.Label className="fs-5">Повторити пароль</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Повторіть пароль..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-4">
          Зареєструватися
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Маєте акаунт?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Увійти
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
