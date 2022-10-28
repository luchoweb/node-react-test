import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { getProductById, saveProduct, updateProduct } from "../../../api/product";
import { codeErrorsTranslate } from "../../../helpers/codeErrors";

const ProductForm = () => {
  const { id: productId, biz: bizId } = useParams();
  const history = useHistory();

  const [alert, setAlert] = useState();
  const [error, setError] = useState();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    setAlert(null);

    let save;
    const now = new Date().toISOString();
    data.createdAt = now;
    data.updatedAt = now;

    if ( !productId ) save = await saveProduct(data);
    if ( productId ) save = await updateProduct(productId, data)

    if ( save?.code ) {
      setAlert({
        type: 'danger',
        message: codeErrorsTranslate(save?.code)
      });
    }

    if ( save?.affectedRows === 1 ) {
      setAlert({
        type: 'success',
        message: `Product ${!productId ? 'created' : 'updated'} successfully`
      });
    }
  };

  const autoFillForm = (product) => {
    setValue('name', product.name);
    setValue('price', product.price);
    setValue('stock', product.stock);
    setValue('biz_id', product.biz_id);
  }

  useEffect(() => {
    const fetchBiz = async(productId) => {
      const product = await getProductById(productId);
      if ( product?.name ) autoFillForm(product);
      if ( !product?.name ) {
        setAlert({
          type: 'warning',
          message: `The product you are trying to update does not exist`
        });
        setError(404);
      }
    }

    if ( productId ) fetchBiz(productId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <>
      {alert && 
        <div className={`alert alert-${alert.type} mt-4`}>
          { alert.message }.
        </div>
      }

      { !productId || (productId && !error) ? 
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form form-horizontal mt-4"
      >
        <div className="form-group mb-4">
          <label htmlFor="name" className="d-block mb-1">
            Name
          </label>

          <input
            type="text"
            id="name"
            placeholder="My product"
            {...register("name", {
              required: "Name is required"
            })}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />

          {errors.name && 
            <span role="alert" className="form-error">
              {errors.name.message}
            </span>
          }
        </div>

        <div className="form-group mb-4">
          <label htmlFor="name" className="d-block mb-1">
            Price
          </label>

          <input
            type="text"
            id="price"
            placeholder="1234"
            {...register("price", {
              required: "Price is required"
            })}
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
          />

          {errors.price && 
            <span role="alert" className="form-error">
              {errors.price.message}
            </span>
          }
        </div>

        <div className="form-group mb-4">
          <label htmlFor="stock" className="d-block mb-1">
            Stock
          </label>

          <input
            type="text"
            id="stock"
            placeholder="123"
            {...register("stock", {
              required: "Stock is required"
            })}
            className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
          />

          {errors.stock && 
            <span role="alert" className="form-error">
              {errors.stock.message}
            </span>
          }
        </div>

        {bizId ? 
          <input
            defaultValue={bizId}
            type="hidden"
            {...register("biz_id")}
          />
        :
          <div className="form-group mb-4">
            <label htmlFor="biz_id" className="d-block mb-1">
              Company NIT
            </label>

            <input
              type="text"
              id="biz_id"
              placeholder="123"
              {...register("biz_id", {
                required: "NIT is required"
              })}
              className={`form-control ${errors.biz_id ? 'is-invalid' : ''}`}
            />

            {errors.biz_id && 
              <span role="alert" className="form-error">
                {errors.biz_id.message}
              </span>
            }
          </div>
        }

        <button className="btn btn-dark me-3">
          {!productId ? 'Create' : 'Update'} Product
        </button>

        <button className="btn btn-secondary" onClick={() => history.goBack()}>
          Back
        </button>
      </form>
      : '' }
    </>
  )
}

export default ProductForm;
