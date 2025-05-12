import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

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

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <div className="rounded-3 overflow-hidden border border-secondary-subtle">
            <Table striped responsive className="table-sm mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Всього</th>
                  <th>Оплата</th>
                  <th>Доставка</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className="btn-sm">Деталі</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
