import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(0);
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="me-2"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2"
        style={{ marginTop: "-0.5px" }}
      >
        Пошук
      </Button>
    </Form>
  );
}

export default SearchBox;
