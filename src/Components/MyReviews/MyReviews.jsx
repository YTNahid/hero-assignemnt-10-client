import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const serverURL = import.meta.env.VITE_ServerURL;
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get(`${serverURL}/reviews/byEmail/${userEmail}`);
        setReviews(response.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userEmail, serverURL]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      axios
        .delete(`${serverURL}/reviews/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
          } else {
            console.error("Failed to delete review:", response.data);
          }
        })
        .catch((error) => {
          console.error("Failed to delete review:", error);
        });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] dark:bg-bg-dark1">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <section className="section section-gap min-h-[60vh] dark:bg-bg-dark1">
        <div className="row">
          <div className="column">
            <h2 className="heading text-center">My Reviews</h2>
          </div>
        </div>
        {reviews.length === 0 ? (
          <div className="text text-center py-10">No review to show</div>
        ) : (
          <div className="column grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 px-[10px]">
            {reviews.map((review) => {
              const { _id, coverImage, title, rating, genre, name } = review;
              return (
                <div
                  key={_id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img src={coverImage} alt={title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">By: {name}</p>
                    <div className="mt-4 border-t border-[#dddddd] pt-4 flex justify-between text-sm">
                      <p className="w-auto">
                        <strong>Genre:</strong> {genre}
                      </p>
                      <p className="w-auto">
                        <strong>Rating:</strong> {rating}/5
                      </p>
                    </div>
                    <div className="flex justify-center gap-5 mt-3">
                      <Link to={`/myReviews/edit/${_id}`} className="text-[25px] cursor-pointer text-blue-500">
                        <FaEdit
                          className="text-[25px] cursor-pointer text-black"
                          data-tooltip-id="delete"
                          data-tooltip-content="Edit Review"
                        />
                      </Link>
                      <MdDeleteForever
                        className="text-[25px] cursor-pointer text-red-500"
                        onClick={() => handleDelete(_id)}
                        data-tooltip-id="delete"
                        data-tooltip-content="Delete Review"
                      />
                      <Tooltip id="edit" />
                      <Tooltip id="delete" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default MyReviews;
