import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import AllReviews from './Components/AllReviews/AllReviews.jsx';
import MyReviews from './Components/MyReviews/MyReviews.jsx';
import GameWatchList from './Components/GameWatchList/GameWatchList.jsx';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import ReviewDetails from './Components/ReviewDetails/ReviewDetails.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AddReview from './Components/AddReview/AddReview.jsx';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes.jsx';
import EditReview from './Components/MyReviews/EditReview.jsx';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ServerURL,
});

const getReviews = async (endpoint = '', param = '') => {
  let url;
  if (endpoint && param) {
    url = `/reviews/${endpoint}/${param}`;
  } else if (endpoint) {
    url = `/reviews/${endpoint}`;
  } else if (param) {
    url = `/reviews/${param}`;
  } else {
    url = `/reviews`;
  }
  try {
    const response = await axiosInstance.get(url);
    // console.log(url);
    return response.data;
  } catch (error) {
    toast.warn(`Something went wrong!`);
    // console.log(url);
    // console.log('Error details:', error.response.data.message);
    throw error;
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        loader: () => getReviews('highestRatedReviews'),
        element: <Home></Home>,
      },
      {
        path: '/reviews',
        element: <AllReviews></AllReviews>,
        loader: () => getReviews(),
      },
      {
        path: '/myReviews',
        element: (
          <ProtectedRoute>
            <MyReviews></MyReviews>
          </ProtectedRoute>
        ),
      },
      {
        path: '/myReviews/edit/:id',
        loader: ({ params }) => getReviews('', params.id),
        element: (
          <ProtectedRoute>
            <EditReview></EditReview>
          </ProtectedRoute>
        ),
      },
      {
        path: '/addReview',
        element: (
          <ProtectedRoute>
            <AddReview></AddReview>
          </ProtectedRoute>
        ),
      },
      {
        path: '/review/:id',
        loader: ({ params }) => getReviews('', params.id),
        element: <ReviewDetails></ReviewDetails>,
      },
      {
        path: '/myWatchlist',
        element: (
          <ProtectedRoute>
            <GameWatchList></GameWatchList>
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center"></ToastContainer>
    </AuthProvider>
  </StrictMode>
);
