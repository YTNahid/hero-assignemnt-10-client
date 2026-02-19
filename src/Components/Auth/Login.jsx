import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const Login = () => {
  const { user, setUser, userSignIn, userSignInWithProvider } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const serverURL = import.meta.env.VITE_ServerURL;

  const navigate = useNavigate();
  const location = useLocation();

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (user) navigate(location?.state ? location.state : "/");
  }, [location.state, navigate, user]);

  useEffect(() => {
    document.title = `CouponMart - Login`;
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    userSignIn(email, password)
      .then((result) => {
        toast.success("Successfully Logged In");
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };

  const handleSignInWithGoogle = (provider) => {
    userSignInWithProvider(provider)
      .then(async (result) => {
        setUser(result.user);
        toast.success("Successfully Logged In");

        const { data: exist } = await axios.get(`${serverURL}/users/${result.user.email}`);

        // console.log(exist);

        if (!exist) {
          await axios.post(
            `${serverURL}/users`,
            {
              username: result.user.displayName,
              email: result.user.email,
              createdAt: result.user.metadata.creationTime,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <section className="py-16 md:p-20 lg:py-32 flex items-center justify-center dark:bg-bg-dark1">
      <div className="bg-bg-color dark:bg-bg-dark2 shadow-2xl rounded-lg p-6 w-full max-w-sm">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-heading-color dark:text-white">
            Sign In
          </h2>
          {/* {Email} */}
          <label className="flex items-center gap-2 rounded-lg bg-white dark:bg-bg-dark p-3 focus-within:ring-2 ring-primary-color border border-border-color">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-accent-color"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="grow bg-transparent focus:outline-none text-text-color"
              required
            />
          </label>
          {/* {Password} */}
          <label className="flex items-center gap-2 relative rounded-lg bg-white p-3 focus-within:ring-2 ring-primary-color border border-border-color">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-accent-color"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <span
              onClick={handleShowPassword}
              className="cursor-pointer absolute right-3 text-text-color"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
            <input
              type={`${showPass ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className="grow bg-transparent focus:outline-none text-text-color"
              required
            />
          </label>
          {/* {Submit} */}
          <input
            type="submit"
            value="Login"
            className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-black hover:text-white transition cursor-pointer"
          />
        </form>
        <div className="text-center mt-4">
          <p className="text-text-color dark:text-dark-text">Or</p>
          <button
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 mt-2 hover:bg-red-600 transition"
            onClick={() => handleSignInWithGoogle(googleProvider)}
          >
            <FaGoogle />
            Sign In with Google
          </button>
          <p className="text-text-color mt-4 dark:text-dark-text">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="text-white underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
