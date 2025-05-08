import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

function UserEditScreen() {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== Number(userId)) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Link to="/admin/userlist">Повернутися назад</Link>
      <FormContainer>
        <h1>Змінити інформацію про користувача</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label className="fs-5">Ім'я</Form.Label>
              <Form.Control
                type="name"
                placeholder="Введіть ім'я користувача..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="fs-5">Електронна пошта</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введіть електронну пошту користувача..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Чи він є адміністратором?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                style={{ fontSize: "1rem" }}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-4">
              Оновити
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
