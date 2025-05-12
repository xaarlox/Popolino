import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
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
    }
  }, [dispatch, product, productId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("product_id", productId);
      setUploading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const { data } = await axios.post(
          "/api/products/upload/",
          formData,
          config
        );
        setImage(data);
        setUploading(false);
      } catch (error) {
        console.error("Помилка завантаження:", error);
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <Link to="/admin/productlist">Повернутися назад</Link>
      <FormContainer>
        <h1>Змінити інформацію про товар</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                placeholder="Введіть URL зображення або залиште порожнім"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{ fontSize: "1rem" }}
              />
              <Form.Control
                type="file"
                label="Оберіть файл"
                custom="true"
                onChange={uploadFileHandler}
                className="mt-2"
              />
              {uploading && <Loader />}
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
