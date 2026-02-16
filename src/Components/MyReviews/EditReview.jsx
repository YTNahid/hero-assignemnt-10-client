import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useLoaderData, useNavigate } from 'react-router-dom';

const EditReview = () => {
  const { user } = useContext(AuthContext);
  const serverURL = import.meta.env.VITE_ServerURL;
  const review = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverImage: review?.coverImage || '',
    title: review?.title || '',
    rating: review?.rating || '',
    year: review?.year || '',
    genre: review?.genre || '',
    description: review?.description || '',
    name: user.displayName || '',
    email: user.email || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { coverImage, title, rating, year, genre, description, name, email } = formData;

    const photoRegex = /\.(jpeg|jpg|png|webp|avif)$/i;
    if (!photoRegex.test(coverImage)) {
      toast.error('Please provide a valid Photo URL (jpg/jpeg/png/webp/avif)');
      return;
    }

    const reviewData = {
      coverImage,
      title,
      rating,
      year,
      genre,
      description,
      name,
      email,
      updatedAt: new Date().toISOString(),
    };

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.patch(`${serverURL}/reviews/${review._id}`, reviewData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Swal.fire({
        title: 'Success',
        text: 'Review Updated Successfully!',
        icon: 'success',
      });
      navigate(-1);
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
  };

  if (review?.email !== user?.email) {
    Swal.fire({
      title: 'Error',
      text: 'Permission Denied',
      icon: 'error',
    }).then(() => {
      navigate('/');
    });

    return;
  }

  return (
    <section className="section py-[30px] md:py-[45px] lg:py-[60px]">
      <div className="row">
        <div className="column ">
          <h2 className="heading text-center">Edit Review</h2>
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0 bg-bg-color shadow-2xl rounded-lg p-4 md:p-10 w-full"
          >
            {/* Game Cover Image */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">Game Cover Image (URL)</span>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="https://example.com/cover.jpg"
                className="p-3 rounded-lg bg-white border border-border-color focus:outline-none focus:ring-2 ring-primary-color text-text-color"
                required
              />
            </label>

            {/* Game Title */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">Game Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Game Title"
                className="p-3 rounded-lg bg-white border border-border-color focus:outline-none focus:ring-2 ring-primary-color text-text-color"
                required
              />
            </label>

            {/* Rating */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">Rating (1-5)</span>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Rating"
                min="1"
                max="5"
                className="p-3 rounded-lg bg-white border border-border-color focus:outline-none focus:ring-2 ring-primary-color text-text-color"
                required
              />
            </label>

            {/* Publishing Year */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">Publishing Year</span>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Year"
                className="p-3 rounded-lg bg-white border border-border-color focus:outline-none focus:ring-2 ring-primary-color text-text-color"
                required
              />
            </label>

            {/* Genres */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">Genre</span>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="p-3 rounded-lg bg-white border border-border-color focus:outline-none focus:ring-2 ring-primary-color text-text-color"
                required
              >
                <option value="" disabled>
                  Select a genre
                </option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
                <option value="Adventure">Adventure</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Strategy">Strategy</option>
              </select>
            </label>

            {/* User Email */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">User Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="p-3 rounded-lg bg-gray-100 border border-border-color focus:outline-none text-gray-500 cursor-not-allowed"
                readOnly
              />
            </label>

            {/* User Name */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">User Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="p-3 rounded-lg bg-gray-100 border border-border-color focus:outline-none text-gray-500 cursor-not-allowed"
                readOnly
              />
            </label>

            {/* Review Description */}
            <label className="col-span-full flex flex-col space-y-1">
              <span className="font-medium text-text-color">Review Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write your detailed review here..."
                className="p-3 rounded-lg bg-white border border-border-color focus:outline-none focus:ring-2 ring-primary-color text-text-color"
                rows="4"
                required
              ></textarea>
            </label>

            {/* Submit Button */}
            <div className="col-span-full">
              <input
                type="submit"
                value="Update Review"
                className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-black hover:text-white transition cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditReview;
