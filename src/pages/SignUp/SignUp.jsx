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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-center">
          <h1 className="text-4xl font-bold">Create Account</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  value={state.name}
                  onChange={handleChange}
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
                  className="input input-bordered"
                  value={state.email}
                  onChange={handleChange}
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
                  className="input input-bordered"
                  value={state.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />

                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  value={state.confirm}
                  onChange={handleChange}
                  minLength={8}
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
                  className="btn btn-info"
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
  );
};

export default SignUp;
