import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [country, setCountry] = useState(shippingAddress.country);
  const [city, setCity] = useState(shippingAddress.city);
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ country, city, address, postalCode }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Доставка</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="country" className="mb-3">
          <Form.Label className="fs-5">Країна</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Введіть країну доставки..."
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="mb-3">
          <Form.Label className="fs-5">Місто</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Введіть місто..."
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address" className="mb-3">
          <Form.Label className="fs-5">Адреса</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Введіть вашу адресу..."
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label className="fs-5">Поштовий індекс</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Введіть поштовий індекс..."
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
            style={{ fontSize: "1rem" }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-4">
          Продовжити
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
