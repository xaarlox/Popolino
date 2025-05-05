import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./ProductScreen.css";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

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
                  <ListGroup.Item className="text-center">
                    <Button
                      className="btn-block"
                      disabled={product.countInStock === 0}
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
