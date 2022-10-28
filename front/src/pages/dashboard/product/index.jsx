import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../api/product";
import { userRoleValidation } from "../../../helpers/userRoleValidation";
import useAuthCognito from "../../../hooks/useAuthCognito";
import Layout from "../layout";

const ProductPage = () => {
  const { id: productId } = useParams();
  const { state } = useAuthCognito();
  const isAdmin = userRoleValidation(state?.user?.info);

  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBiz = async () => {
      const response = await getProductById(productId);
      setProduct(response);
    }

    if ( !product ) fetchBiz();

    return () => setIsLoading(false);
  }, [productId, product]);

  return (
    <Layout>
    {isLoading ? 
      <p>Loading data, please wait...</p>
    : product ?
      <>
        <div className="row align-items-center mb-4">
          <div className="col-12 col-md-6">
            <h2 className="mt-0">{ product.name }</h2>

            <ul className="list-unstyled m-0 p-0 d-flex gap-4 flex-wrap">
              <li><strong>Price</strong>: { product.price }</li>
              <li><strong>Stock</strong>: { product.stock }</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 text-end">
            {isAdmin &&
              <>
                <Link
                  className="btn btn-primary me-2"
                  to={`/dashboard/product/edit/${product.id}`}
                >
                  Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    to={`/dashboard/product/delete/${product.id}`}
                  >
                    Delete
                  </Link>
              </>
            }
          </div>
        </div>
      </>
    :
      <>
        <div className="alert alert-warning">
          <h5 className="m-0">Oops!</h5>
          <p className="m-0">No data to show.</p>
        </div>

        <Link to="/dashboard" className="text-dark">
          Go to dashboard
        </Link>
      </>
    }
    </Layout>
  )
}

export default ProductPage;
