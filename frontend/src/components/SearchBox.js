import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { /*useLocation,*/ useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();
  //let location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(0);
      //navigate(location.pathname);s
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
