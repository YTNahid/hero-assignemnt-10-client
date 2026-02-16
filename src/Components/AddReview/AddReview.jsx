import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const serverURL = import.meta.env.VITE_ServerURL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const coverImage = form.coverImage.value;
    const title = form.title.value;
    const rating = form.rating.value;
    const year = form.year.value;
    const genre = form.genre.value;
    const description = form.description.value;
    const name = form.name.value;
    const email = form.email.value;

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
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`${serverURL}/reviews/addReview`, reviewData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('🚀 ~ handleSubmit ~ response:', response.data);
      Swal.fire({
        title: 'Success',
        text: 'Review Added Successfully!',
        icon: 'success',
      }).then(() => {
        form.reset();
        form.email.value = user.email;
        form.name.value = user.displayName;
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
  };

  return (
    <section className="section py-[30px] md:py-[45px] lg:py-[60px]">
      <div className="row">
        <div className="column ">
          <h2 className="heading text-center">Add a Review</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0 bg-bg-color shadow-2xl rounded-lg p-4 md:p-10 w-full"
          >
            {/* Game Cover Image */}
            <label className="flex flex-col space-y-1">
              <span className="font-medium text-text-color">Game Cover Image (URL)</span>
              <input
                type="text"
                name="coverImage"
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
                value={user.email}
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
                value={user.displayName}
                className="p-3 rounded-lg bg-gray-100 border border-border-color focus:outline-none text-gray-500 cursor-not-allowed"
                readOnly
              />
            </label>

            {/* Review Description */}
            <label className="col-span-full flex flex-col space-y-1">
              <span className="font-medium text-text-color">Review Description</span>
              <textarea
                name="description"
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
                value="Submit Review"
                className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-black hover:text-white transition cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddReview;
