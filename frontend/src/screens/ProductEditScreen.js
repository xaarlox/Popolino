import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails } from "../actions/productActions";

function ProductEditScreen() {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    if (!product || !product.name || product._id !== Number(productId)) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, product, productId, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Update product
  };
  return (
    <div>
      <Link to="/admin/productlist">Повернутися назад</Link>
      <FormContainer>
        <h1>Змінити інформацію про товар</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label className="fs-5">Назва</Form.Label>
              <Form.Control
                type="name"
                placeholder="Введіть назву товару..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label className="fs-5">Вартість</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введіть вартість товару..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label className="fs-5">Зображення</Form.Label>
              <Form.Control
                type="text"
                placeholder="Виберіть зображення..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand" className="mb-3">
              <Form.Label className="fs-5">Бренд</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть назву бренда..."
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label className="fs-5">
                Кількість товару на складі
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Вкажіть кількість товару на складі..."
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label className="fs-5">Категорія</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть категорію товару..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label className="fs-5">Опис товару</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть опис товару..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ fontSize: "1rem" }}
              ></Form.Control>
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

export default ProductEditScreen;
