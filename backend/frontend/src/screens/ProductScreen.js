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
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
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
          <Row>
            <Col md={6}>
              <h4>Відгуки</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">На жаль, відгуків ще немає.</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p style={{ textAlign: "justify", marginTop: "-10px" }}>
                      {review.comment}
                    </p>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <h4 className="mt-4">Написати відгук</h4>

              {!userInfo && (
                <Message variant="info">
                  Будь ласка, <Link to="/login">увійдіть</Link> в акаунт, щоб
                  написати відгук.
                </Message>
              )}

              {userInfo && (
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item>
                    {loadingProductReview && <Loader />}
                    {successProductReview && (
                      <Message variant="success">
                        Коментар опубліковано.
                      </Message>
                    )}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}

                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Оцінка</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Виберіть оцінку...</option>
                          <option value="1">1 - Дуже погано</option>
                          <option value="2">2 - Погано</option>
                          <option value="3">3 - Задовільно</option>
                          <option value="4">4 - Добре</option>
                          <option value="5">5 - Відмінно</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="mt-2">
                        <Form.Label>Відгук</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                        className="mt-3"
                      >
                        Опублікувати
                      </Button>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

export default ProductScreen;
