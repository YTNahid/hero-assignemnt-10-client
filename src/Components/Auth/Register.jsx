import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaGoogle, FaImage } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

const Register = () => {
  const { user, setUser, userSignUp, userSignInWithProvider, userUpdateProfile } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const serverURL = import.meta.env.VITE_ServerURL;

  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (user) navigate('/');
  }, [navigate, user]);

  useEffect(() => {
    document.title = `Register`;
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      {
        toast.error('Password must be at least 6 characters long and contain at least one uppercase letter and one lowercase letter');
        return;
      }
    }
    const photoRegex = /\.(jpeg|jpg|png|webp|avif)$/i;
    if (!photoRegex.test(photo)) {
      toast.error('Please provide a valid Photo URL (jpeg/jpg/png/webp/avif)');
      return;
    }

    const { data } = await axios.get(`${serverURL}/users/byname/${username}`);
    if (data) {
      toast.error('Username already exists.');
      return;
    }

    userSignUp(email, password)
      .then((result) => {
        userUpdateProfile({ displayName: username, photoURL: photo }).then(() => {
          const updatedUser = { ...result.user, displayName: username, photoURL: photo };
          setUser(updatedUser);
          toast.success('Successfully Registered');
          axios.post(`${serverURL}/users`, {
            username: result.user.displayName,
            email: result.user.email,
            createdAt: result.user.metadata.creationTime,
          });
        });
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
        toast.success('Successfully Logged In');

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
                'Content-Type': 'application/json',
              },
            }
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
    <section className="py-16 md:p-20 lg:py-32 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-bg-color shadow-2xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-heading-color mb-6">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* {Username} */}
          <label className="flex items-center gap-2 rounded-lg bg-white p-3 focus-within:ring-2 ring-primary-color border border-border-color">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-accent-color">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" name="username" placeholder="Username" className="grow bg-transparent focus:outline-none text-text-color" required />
          </label>
          {/* {Email} */}
          <label className="flex items-center gap-2 rounded-lg bg-white p-3 focus-within:ring-2 ring-primary-color border border-border-color">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-accent-color">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" name="email" placeholder="Email" className="grow bg-transparent focus:outline-none text-text-color" required />
          </label>
          {/* {Password} */}
          <label className="flex items-center gap-2 relative rounded-lg bg-white p-3 focus-within:ring-2 ring-primary-color border border-border-color">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-accent-color">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <span onClick={handleShowPassword} className="cursor-pointer absolute right-3 text-text-color">
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
            <input
              type={`${showPass ? 'text' : 'password'}`}
              name="password"
              placeholder="Password"
              className="grow bg-transparent focus:outline-none text-text-color"
              required
            />
          </label>
          {/* {Photo URL} */}
          <label className="flex items-center gap-2 rounded-lg bg-white p-3 focus-within:ring-2 ring-primary-color border border-border-color">
            <FaImage className="h-5 w-5 text-accent-color" />
            <input type="text" name="photo" placeholder="Photo URL" className="grow bg-transparent focus:outline-none text-text-color" required />
          </label>
          {/* {Submit} */}
          <input
            type="submit"
            value="Sign Up"
            className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-black hover:text-white transition cursor-pointer"
          />
        </form>
        <div className="text-center mt-4">
          <p className="text-text-color">Or</p>
          <button
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 mt-2 hover:bg-red-600 transition"
            onClick={() => handleSignInWithGoogle(googleProvider)}
          >
            <FaGoogle />
            Sign In with Google
          </button>
          <p className="text-text-color mt-4">
            Already have an account?{' '}
            <Link to={'/login'} className="text-white underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
