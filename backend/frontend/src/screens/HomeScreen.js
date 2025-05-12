import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Останні продукти</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
