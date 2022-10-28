import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getBizById, saveBiz, updateBiz } from "../../../api/biz";
import { codeErrorsTranslate } from "../../../helpers/codeErrors";

const BizForm = () => {
  const { id: bizId } = useParams();

  const [alert, setAlert] = useState();
  const [error, setError] = useState();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    setAlert(null);

    let save;
    const now = new Date().toISOString();
    data.createdAt = now;
    data.updatedAt = now;

    if ( !bizId ) save = await saveBiz(data);
    if ( bizId ) save = await updateBiz(bizId, data)

    if ( save?.code ) {
      setAlert({
        type: 'danger',
        message: codeErrorsTranslate(save?.code)
      });
    }

    if ( save?.affectedRows === 1 ) {
      setAlert({
        type: 'success',
        message: `Company ${!bizId ? 'created' : 'updated'} successfully`
      });
    }
  };

  const autoFillForm = (biz) => {
    setValue('nit', biz.nit);
    setValue('name', biz.name);
    setValue('address', biz.address);
    setValue('phone', biz.phone);
  }

  useEffect(() => {
    const fetchBiz = async(bizId) => {
      const biz = await getBizById(bizId);
      if ( biz?.nit ) autoFillForm(biz);
      if ( !biz?.nit ) {
        setAlert({
          type: 'warning',
          message: `The company you are trying to update does not exist`
        });
        setError(404);
      }
    }

    if ( bizId ) fetchBiz(bizId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bizId]);

  return (
    <>
      {alert && 
        <div className={`alert alert-${alert.type} mt-4`}>
          { alert.message }
        </div>
      }

      { !bizId || (bizId && !error) ? 
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form form-horizontal mt-4"
      >
        <div className="form-group mb-4">
          <label htmlFor="biz_nit" className="d-block mb-1">
            NIT
          </label>

          <input
            type="number"
            id="nit"
            placeholder="90012345"
            {...register("nit", {
              required: "NIT is required"
            })}
            className={`form-control ${errors.nit ? 'is-invalid' : ''}`}
          />

          {errors.nit && 
            <span role="alert" className="form-error">
              {errors.nit.message}
            </span>
          }
        </div>

        <div className="form-group mb-4">
          <label htmlFor="name" className="d-block mb-1">
            Name
          </label>

          <input
            type="text"
            id="name"
            placeholder="Company Inc."
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
          <label htmlFor="address" className="d-block mb-1">
            Address
          </label>

          <input
            type="text"
            id="address"
            placeholder="Street 100th"
            {...register("address", {
              required: "Address is required"
            })}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />

          {errors.address && 
            <span role="alert" className="form-error">
              {errors.address.message}
            </span>
          }
        </div>

        <div className="form-group mb-4">
          <label htmlFor="phone" className="d-block mb-1">
            Phone number
          </label>

          <input
            type="number"
            id="phone"
            placeholder="12345678"
            {...register("phone", {
              required: "Phone is required"
            })}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />

          {errors.phone && 
            <span role="alert" className="form-error">
              {errors.phone.message}
            </span>
          }
        </div>

        <button className="btn btn-dark">
          {!bizId ? 'Create' : 'Update'} Company
        </button>
      </form>
      : '' }
    </>
  )
}

export default BizForm;
