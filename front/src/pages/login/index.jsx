import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuthCognito from '../../hooks/useAuthCognito';

import "./styles.scss";

const LoginPage = () => {
  const { dispatch } = useAuthCognito();
  const [loginError, setLoginError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    try {
      const user = await Auth.signIn(data.email, data.password);
      dispatch({
        type: 'USER_SESSION',
        payload: user
      })
    } catch (error) {
      console.log('error signing in', error);
      setLoginError(error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2 className='mb-3'>Log in</h2>

        {loginError &&
          <div className="alert alert-danger mb-3">
            <p className='m-0'>{loginError.message}</p>
          </div>
        }

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <input
              id="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <span role="alert" className="form-error">{errors.email.message}</span>}
          </div>

          <div className="form-group mb-3">
            <input
              id="password"
              {...register("password", {
                required: "required",
                pattern: {
                  value: /^[A-Z0-9@#_-]{6,}$/i,
                  message: "invalid password"
                }
              })}
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <span role="alert" className="form-error">{errors.password.message}</span>}
          </div>

          <button className="btn btn-dark">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
