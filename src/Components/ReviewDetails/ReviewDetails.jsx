import { FaStar } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewDetails = () => {
  const review = useLoaderData();
  const { coverImage, title, rating, genre, name, description, year, _id } = review;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const stars = [];
  for (let i = 1; i <= rating; i++) {
    stars.push(<FaStar key={i} className="text-yellow-500" />);
  }

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user?.email) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_ServerURL}/users/${user.email}`);
        const watchlist = response.data?.watchlist || [];
        setIsInWatchlist(watchlist.includes(_id));
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    checkWatchlist();
  }, [user?.email, _id]);

  const handleAddToWatchlist = async () => {
    if (!user?.email) {
      toast.error('You need to log in to add to watchlist.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ServerURL}/users/addToWatchlist`,
        { email: user.email, reviewId: _id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Review added to watchlist!');
        setIsInWatchlist(true); // Update state to disable the button
      } else {
        toast.error('Failed to add to watchlist.');
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast.error('Something went wrong. hehe');
    }
  };

  return (
    <div className="section section-gap">
      <div className="row">
        <div className="column">
          <img src={coverImage} alt="Banner" className="w-full h-[400px] object-cover object-center rounded" />
          <div className="column gap-1">
            <h3 className="heading">Game Title: {title}</h3>
            <h5 className="heading font-semibold">
              Genre: <span className="font-normal">{genre}</span>
            </h5>
            <h6 className="heading font-semibold">
              Game Publish Year: <span className="font-normal">{year}</span>
            </h6>
            <h6 className="heading font-semibold">
              Review From: <span className="font-normal">{name}</span>
            </h6>
            <div className="text-yellow flex gap-[2px] mt-2">{stars}</div>
            <div className="w-full h-[1px] bg-[#ddd] my-5"></div>
            <p className="text">{description}</p>
          </div>

          <button
            onClick={handleAddToWatchlist}
            className={`button self-start ${isInWatchlist ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? 'Already in Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
