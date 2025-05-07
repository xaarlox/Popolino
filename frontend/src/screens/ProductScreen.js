import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./ProductScreen.css";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="image-wrapper">
              <Image
                className="product-image custom-shadow"
                src={product.image}
                alt={product.name}
                fluid
              />
            </div>
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3 className="pb-1">{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} відгуків`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item className="description-text">
                <strong>Опис:</strong>
                <br />
                {product.description}
              </ListGroup.Item>
            </ListGroup>
            <Col md={6} className="mx-auto">
              <Card className="mt-2">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Ціна:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Статус:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? "На складі"
                          : "Немає в наявності"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className="d-flex align-items-center">
                        <Col>Кількість:</Col>
                        <Col md={6}>
                          <Form.Control
                            as="select"
                            className="py-0"
                            style={{ width: "45px" }}
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="text-center">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      disabled={Number(product.countInStock) <= 0}
                      type="button"
                    >
                      Додати до кошика
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Col>
          <Col className="text-center mt-4">
            <Link to="/" className="btn btn-light my-3">
              Повернутися назад
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductScreen;
