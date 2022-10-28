import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteBiz } from "../../../api/biz";
import BizLayout from "./layout";

const BizDeletePage = () => {
  const history = useHistory();
  const { id: bizId } = useParams();

  const [alert, setAlert] = useState();

  const handleDeleteBiz = async (id) => {
    const response = await deleteBiz(id);
    if ( response?.affectedRows === 0 ) {
      setAlert({
        type: 'danger',
        message: 'An error has ocurred, please try again'
      });
    } else {
      setAlert({
        type: 'success',
        message: 'Company deleted successfully'
      });
    }
  }

  return (
    <BizLayout>
      <h3 className="m-0 mb-4">Delete company</h3>
      
      <h4>Are you sure?</h4>
      <p>This action is irreversible.</p>

      {alert && 
        <div className={`alert alert-${alert.type} mt-4`}>
          { alert.message }.
          {alert.type === 'success' &&
            <Link to="/dashboard" className="alert-link ms-2">
              Go to dashboard
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

export default BizDeletePage;
