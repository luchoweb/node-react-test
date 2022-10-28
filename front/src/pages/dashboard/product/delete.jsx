import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteProduct } from "../../../api/product";
import BizLayout from "./layout";

const ProductDeletePage = () => {
  const history = useHistory();
  const { id: bizId } = useParams();

  const [alert, setAlert] = useState();

  const handleDeleteBiz = async (id) => {
    const response = await deleteProduct(id);
    if ( response?.affectedRows === 0 ) {
      setAlert({
        type: 'danger',
        message: 'An error has ocurred, please try again'
      });
    } else {
      setAlert({
        type: 'success',
        message: 'Product deleted successfully'
      });
    }
  }

  return (
    <BizLayout>
      <h3 className="m-0 mb-4">Delete product</h3>

      <h4>Are you sure?</h4>
      <p>This action is irreversible.</p>

      {alert && 
        <div className={`alert alert-${alert.type} mt-4`}>
          { alert.message }.
          {alert.type === 'success' &&
            <Link onClick={() => history.goBack()} className="alert-link ms-2">
              Go back
            </Link>
          }
        </div>
      }
      
      <hr />

      {alert?.type !== 'success' &&
        <>
          <button
            className="btn btn-dark me-3"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
      
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteBiz(bizId)}
          >
            Confirm
          </button>
        </>
      }

    </BizLayout>
  )
}

export default ProductDeletePage;
