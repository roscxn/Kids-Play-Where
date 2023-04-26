import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, signUp } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const disable = state.password !== state.confirm;
  const [error, setError] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await signUp(state);
      setUser(getUser());
      navigate("/");
    } catch (error) {
      if (error.message.includes("email")) {
        setError("This email already has an account");
      } else {
        setError(error.message);
      }
    }
  };
  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
    setError("");
  };

  return (
    <>
      <div className="grid grid-cols-2 h-screen bg-base-11">
        <div
          className="hero bg-cover bg-center opacity-70 "
          style={{
            backgroundImage: `url("https://msq.cxcms.ascentis.com.sg/mallsdeals/media/Stores/PPS%20Thumnail.jpg")`,
          }}
        ></div>
        <div className="hero bg-base-100 border-4 border-amber-100">
          <div className="hero-content flex-col">
            <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100">
              <div className="card-body w-96">
                <h1 className="text-4xl font-bold text-center">
                  Create Account
                </h1>
                <br />
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      className="input input-bordered input-primary"
                      value={state.name}
                      onChange={handleChange}
                      minLength={2}
                      maxLength={20}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      className="input input-bordered input-primary"
                      value={state.email}
                      onChange={handleChange}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="input input-bordered input-primary"
                      value={state.password}
                      onChange={handleChange}
                      minLength={8}
                      maxLength={12}
                      required
                    />

                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      placeholder="Confirm Password"
                      className="input input-bordered input-primary"
                      value={state.confirm}
                      onChange={handleChange}
                      minLength={8}
                      maxLength={12}
                      required
                    />

                    <label className="label">
                      <Link
                        to="/user/login"
                        className="label-text-alt link link-hover"
                      >
                        Have an account? Login here.
                      </Link>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={disable}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
