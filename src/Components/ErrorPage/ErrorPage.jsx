import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `CouponMart - Page Not Found`;
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-primary-color">404</h1>
        <p className="mt-4 text-2xl font-semibold">Oops! Page Not Found</p>
        <p className="mt-2 text-gray-600">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="btn bg-primary-color text-white hover:bg-black" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <Link to="/" className="btn bg-primary-color text-white hover:bg-black">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
