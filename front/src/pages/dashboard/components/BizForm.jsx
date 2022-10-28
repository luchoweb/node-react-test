import { useForm } from "react-hook-form";
import { saveBiz } from "../../../api/biz";

const BizForm = ({ business }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    const now = new Date().toLocaleDateString('es-CO');
    data.createdAt = now;
    data.updatedAt = now;
    const save = await saveBiz(data);
    console.log(save);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-horizontal mt-4"
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
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
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
        Create Company
      </button>
    </form>
  )
}

export default BizForm;
