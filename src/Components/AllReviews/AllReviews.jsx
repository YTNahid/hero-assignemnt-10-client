import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

const AllReviews = () => {
  const reviews = useLoaderData() || [];

  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("");

  const genres = [...new Set(reviews.map((review) => review.genre))];

  const handleFilter = (genre) => {
    setSelectedGenre(genre);
    if (genre === "") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter((review) => review.genre === genre));
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedReviews = [...filteredReviews];
    if (option === "rating-asc") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (option === "rating-desc") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (option === "year-asc") {
      sortedReviews.sort((a, b) => a.year - b.year);
    } else if (option === "year-desc") {
      sortedReviews.sort((a, b) => b.year - a.year);
    }
    setFilteredReviews(sortedReviews);
  };

  return (
    <section className="section section-gap min-h-[60vh] dark:bg-bg-dark1">
      <div className="row">
        <div className="column">
          <h2 className="heading text-center">All Reviews</h2>
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="column md:flex-row md:items-center mb-6 px-4">
        <div>
          <label htmlFor="genre-filter" className="text mr-2 font-semibold">
            Genre:
          </label>
          <select
            id="genre-filter"
            value={selectedGenre}
            onChange={(e) => handleFilter(e.target.value)}
            className="text p-2 border rounded"
          >
            <option value="">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by Rating or Year */}
        <div>
          <label htmlFor="sort-options" className="text mr-2 font-semibold">
            Sort by:
          </label>
          <select
            id="sort-options"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className=" text p-2 border rounded"
          >
            <option value="">None</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="year-asc">Year (Oldest to Newest)</option>
            <option value="year-desc">Year (Newest to Oldest)</option>
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text text-center py-10">No review to show</div>
      ) : (
        <div className="row justify-center">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 !important gap-4 px-[10px]">
            {filteredReviews.map((review) => {
              const { _id, coverImage, title, rating, genre, name } = review;
              return (
                <div
                  key={_id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img src={coverImage} alt={title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600">By: {name}</p>
                    <div className="mt-4 border-t border-[#dddddd] pt-4 flex justify-between text-sm">
                      <p className="w-auto">
                        <strong>Genre:</strong> {genre}
                      </p>
                      <p className="w-auto">
                        <strong>Rating:</strong> {rating}/5
                      </p>
                    </div>
                    <Link
                      to={`/review/${_id}`}
                      className="block mt-4 text-center bg-accent-color text-white py-2 px-4 rounded-lg hover:bg-black transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default AllReviews;
