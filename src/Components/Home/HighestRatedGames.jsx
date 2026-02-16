import { Link, useLoaderData } from 'react-router-dom';

const HighestRatedGames = () => {
  const reviews = useLoaderData() || [];

  return (
    <section className="section py-[30px] md:py-[45px] lg:py-[60px]">
      <div className="row">
        <div className="column">
          <h2 className="heading text-center">Highest Rated Games</h2>
        </div>
      </div>
      <div className="row justify-center">
        {reviews.length === 0 ? (
          <div className="text text-center py-10">No review to show</div>
        ) : (
          <div className="grid p-[10px] lg:grid-cols-4 md:grid-cols-2 grid-cols-1 !important gap-4">
            {reviews.map((review) => {
              const { _id, coverImage, title, rating, genre, name } = review;
              return (
                <div key={_id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-[#dddddd]">
                  <img src={coverImage} alt={title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-l font-semibold text-gray-900 mb-1">{title}</h3>
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
        )}
      </div>
      <div className="row">
        <div className="column">
          <Link to={'/reviews'} className="self-center">
            <button className="button mt-7">View All</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HighestRatedGames;
