import { useState } from "react";
import { getUser, login } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await login(credentials);
      setUser(getUser());
      navigate("/");
    } catch {
      setError("Login failed. Try again.");
    }
  };

  const handleChange = (evt) => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
    setError("");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-center">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={credentials.email}
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
                  value={credentials.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                <label className="label">
                  <Link
                    to="/user/signup"
                    className="label-text-alt link link-hover"
                  >
                    No Account? Create one!
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-warning" type="submit">
                  Login
                </button>
                <p className="error-message">&nbsp;{credentials.error}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
