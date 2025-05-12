import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  let keyword = location.search;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createProduct,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="mb-0">Товари</h1>
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Створити товар
            </Button>
          </div>

          <div className="table-responsive rounded-3 overflow-hidden border border-secondary-subtle">
            <Table striped hover className="table-sm mb-0">
              <thead>
                <tr>
                  <th className="ps-3">ID</th>
                  <th>Ім'я</th>
                  <th>Вартість</th>
                  <th>Категорія</th>
                  <th>Бренд</th>
                  <th className="pe-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="ps-3">{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td className="pe-3">
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm me-2">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="my-4">
              <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
