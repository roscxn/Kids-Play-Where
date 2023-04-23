import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    userService.logOut();
    setUser(null);
  };

  return (
    <>
      <div className="navbar bg-base-100 h-28">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">View Map</Link>
              </li>
              <li>
                <Link to="/location/viewall">View All</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center btn btn-ghost normal-case text-2xl">
          <Link to="/">KIDS PLAY WHERE</Link>
        </div>

        <div className="navbar-end gap-7">
          {user ? <span>Welcome, {user.name}</span> : ""}

          {user ? (
            <Link to="/" onClick={handleLogOut}>
              Log Out
            </Link>
          ) : (
            <></>
          )}
        </div>

        <div className="dropdown dropdown-end">
           <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.ibb.co/nRk3h8Q/user.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/user/login">Login</Link>
            </li>
            <li>
              <Link to="/user/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9  w-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */}

      {/* {user ? (
            <div className="dropdown ">
              <div className="indicator right-5">
                <span className="indicator-item badge badge-sm bg-success border-none right-0 top-1"></span>
                <div className="grid w-8 h-8 bg-base-300 place-items-center">
                  <img src="https://i.ibb.co/nRk3h8Q/user.png" />
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path className="grid w-10 h-10 bg-base-300 place-items-center" />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
                  >
                    <li>
                      <Link to="/user/bookmarks">Bookmark</Link>
                    </li>
                    <li>
                      <Link to="/location/viewall">View All</Link>
                    </li>
                    <li>
                      <a>About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="dropdown">
              <div className="indicator right-6">
                <span className="indicator-item badge badge-sm bg-base-300 border-none right-0 top-1"></span>
                <div className="grid w-8 h-8 bg-white place-items-center">
                  <img src="https://i.ibb.co/nRk3h8Q/user.png" />

                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path className="grid w-10 h-10 bg-base-100 place-items-center" />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
                  >
                    <li>
                      <Link to="/user/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/user/signup">Sign Up</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )} */}
    </>
  );
}
