import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Паролі не співпали.");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>Профіль користувача</h2>
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
              type="password"
              placeholder="Повторіть пароль..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ fontSize: "1rem" }}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-4">
            Оновити
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Мої замовлення</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
