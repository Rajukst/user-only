import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    //   const navigate = useNavigate();
    //   const location= useLocation();
    //   const from= location.state?.from?.pathname || "/users"
    //   const { signIn } = useAuth();
      const onSubmit = (data) => {
        // signIn(data.email, data.password)
        //   .then((result) => {
        //     const loggedUser = result.user;
        //     toast.success("Login Success!");
        //     console.log(loggedUser);
        //     navigate(from, {replace:true})
        //   })
        //   .catch((error) => toast.error(error.message));
      };
    return (
        <section>
      <div className="login-box">
      {/* onSubmit={handleSubmit(onSubmit)} */}
        <form>
          <h2 className="login-txt">Login</h2>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            {/* {...register("email")} */}
            <input type="email" name="" id="names" required/>
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              name=""
              id="passwords"
            //   {...register("password")}
              required
            />
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" name="" id="hhhh" />
              Remember Me
            </label>
            <Link to="#">Forgot Password</Link>
          </div>
          <input
            className="submitBTN"
            type="submit"
            name="Login"
            id=""
            value="Login"
          />
        </form>
      </div>
    </section>
    );
};

export default Login;
