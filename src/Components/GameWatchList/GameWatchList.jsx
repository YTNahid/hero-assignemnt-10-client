import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const GameWatchList = () => {
  const serverURL = import.meta.env.VITE_ServerURL;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email;

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!userEmail) return;

      try {
        const userResponse = await axios.get(`${serverURL}/users/${userEmail}`);
        const watchlistIds = userResponse.data?.watchlist || [];

        if (watchlistIds.length > 0) {
          const reviewPromises = watchlistIds.map((id) =>
            axios.get(`${serverURL}/reviews/${id}`).then((res) => res.data),
          );
          const reviews = await Promise.all(reviewPromises);

          // Only set the watchlist if reviews are not empty
          const validReviews = reviews.filter(
            (review) => review && Object.keys(review).length > 0,
          );
          setWatchlist(validReviews);
        } else {
          setWatchlist([]);
        }
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
        setWatchlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [userEmail, serverURL]);

  // console.log(watchlist);

  const handleRemoveFromWatchlist = async (reviewId) => {
    try {
      const response = await axios.patch(
        `${serverURL}/users/deleteFromWatchlist`,
        { email: userEmail, reviewId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        toast.success("Removed from watchlist!");
        setWatchlist((prevWatchlist) =>
          prevWatchlist.filter((review) => review._id !== reviewId),
        );
      } else {
        toast.error("Failed to remove from watchlist.");
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="section section-gap min-h-[60vh]">
      <div className="row">
        <div className="column">
          <h2 className="heading text-center">My Watchlist</h2>
        </div>
      </div>
      {watchlist.length === 0 ? (
        <div className="text text-center py-10">No items in your watchlist</div>
      ) : (
        <div className="column overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Genre</th>
                <th className="border border-gray-300 px-4 py-2">Review By</th>
                <th className="border border-gray-300 px-4 py-2">Rating</th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((review, index) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {review.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {review.genre}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {review.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {review.rating}/5
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {review.year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <BsEyeFill
                        className="inline-block text-[25px] text-black cursor-pointer"
                        data-tooltip-id="view"
                        data-tooltip-content="View"
                        onClick={() => navigate(`/review/${review._id}`)}
                      ></BsEyeFill>
                      <MdDeleteForever
                        className="inline-block text-[25px] text-[#ff0000] cursor-pointer"
                        onClick={() => handleRemoveFromWatchlist(review._id)}
                        data-tooltip-id="delete"
                        data-tooltip-content="Delete Review"
                      />
                      <Tooltip id="delete" className="tooltip" />
                      <Tooltip id="view" className="tooltip" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default GameWatchList;
