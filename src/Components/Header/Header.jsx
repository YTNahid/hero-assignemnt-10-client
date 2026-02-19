import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import userPlaceholder from "../../assets/user-placeholder.png";
import { CiLogout } from "react-icons/ci";
import "./header.css";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log('🚀 ~ AddReview ~ user:', user);

  const handleSignOut = () => {
    if (!confirm("Are you sure you want to sign out?")) {
      return;
    }
    userSignOut()
      .then(() => {
        toast.success("Successfully Signed Out!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };

  // if (user) {
  //   console.log(user);
  // }

  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/reviews"}>All Reviews</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to={"/addReview"}>Add Review</NavLink>
          </li>
          <li>
            <NavLink to={"/myReviews"}>My Reviews</NavLink>
          </li>
          <li>
            <NavLink to={"/myWatchlist"}>Game WatchList</NavLink>
          </li>
        </>
      ) : (
        ""
      )}
    </>
  );

  return (
    <header
      className={`section sticky top-0 shadow-md bg-primary-color dark:bg-black z-50 gap-0 py-2`}
    >
      <div className="row exclude navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden pl-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary-color rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to={"/"} className="text-black font-bold text-xl pl-0">
            AlphaReviews
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user?.photoURL ? user.photoURL : userPlaceholder}
                alt="img"
                className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
                data-tooltip-id="displayName"
                data-tooltip-content={user.displayName}
              />
              <Tooltip id="displayName"></Tooltip>
              <button
                onClick={handleSignOut}
                className="text-2xl font-bold"
                data-tooltip-id="logoutTip"
                data-tooltip-content="Logout"
              >
                <CiLogout />
              </button>
              <Tooltip id="logoutTip"></Tooltip>
            </div>
          ) : (
            <div className="text-black">
              <Link
                to={"/login"}
                className="text text-black font-medium hover:underline"
              >
                Login
              </Link>
              <span className="px-1 text-black"> / </span>
              <Link
                to={"/register"}
                className="text text-black font-medium hover:underline"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
