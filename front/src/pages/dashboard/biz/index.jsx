import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBizById } from "../../../api/biz";
import { getProductsByBiz } from "../../../api/product";
import { userRoleValidation } from "../../../helpers/userRoleValidation";
import useAuthCognito from "../../../hooks/useAuthCognito";
import Layout from "../layout";

const BizPage = () => {
  const { id: bizId } = useParams();
  const { state } = useAuthCognito();
  const isAdmin = userRoleValidation(state?.user?.info);

  const [business, setBusiness] = useState();
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const biz = await getBizById(bizId);
      setBusiness(biz);

      if ( biz?.nit ) {
        const products = await getProductsByBiz(biz.nit);
        setProducts(products);
      }
    }

    if ( !business ) fetchData();

    return () => setIsLoading(false);
  }, [bizId, business]);

  return (
    <Layout>
    {isLoading ? 
      <p>Loading data, please wait...</p>
    : business ?
      <>
        <div className="row align-items-center mb-4">
          <div className="col-12 col-md-6">
            <h2 className="mt-0">{ business.name }</h2>

            <ul className="list-unstyled m-0 p-0 d-flex gap-4 flex-wrap">
              <li><strong>NIT</strong>: { business.nit }</li>
              <li><strong>Address</strong>: { business.address }</li>
              <li><strong>Phone</strong>: { business.phone }</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 text-end">
            {isAdmin &&
              <>
                <Link
                  className="btn btn-primary me-2"
                  to={`/dashboard/biz/edit/${business.id}`}
                >
                  Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    to={`/dashboard/biz/delete/${business.id}`}
                  >
                    Delete
                  </Link>
              </>
            }
          </div>
        </div>

        <hr />

        <div className="row align-items-center mt-4">
          <div className="col-6">
            <h4>Products</h4>
          </div>
          <div className="col-6 text-end">
            {isAdmin &&
              <Link className="btn btn-dark" to={`/dashboard/product/create/${business.nit}`}>Add Product</Link>
            }
          </div>
        </div>
        
        <div className="table-responsive mt-4">
          <table className="table">
            <thead className="bg-dark text-white">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {products?.length && products?.map(product => (
              <tr key={`p-${product.id}`}>
                <td>
                  {product.name}
                </td>
                <td>
                  ${product.price}
                </td>
                <td>
                  {product.stock}
                </td>
                <td className="text-end">
                  {isAdmin &&
                    <>
                      <Link
                        to={`/dashboard/product/edit/${product.id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>
                      
                      <Link
                        to={`/dashboard/product/delete/${product.id}`}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </Link>
                    </>
                  }
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
    :
      <>
        <div className="alert alert-warning">
          <h5 className="m-0">Oops!</h5>
          <p className="m-0">No data to show.</p>
        </div>

        <Link to="/dashboard" className="text-dark">
          Go to dashboard home
        </Link>
      </>
    }
    </Layout>
  )
}

export default BizPage;
