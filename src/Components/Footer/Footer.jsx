import { Link, NavLink } from 'react-router-dom';
import { FaFacebookF, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/reviews'}>All Reviews</NavLink>
      </li>
      <li>
        <NavLink to={'/addReview'}>Add Review</NavLink>
      </li>
      <li>
        <NavLink to={'/myReviews'}>My Reviews</NavLink>
      </li>
      <li>
        <NavLink to={'/myWatchlist'}>Game WatchList</NavLink>
      </li>
    </>
  );

  return (
    <section className="section bg-bg-color pt-[60px] md:pt-[40px] pb-4">
      <div className="row border-b border-b-black/50 pb-5">
        <div className="column items-center md:items-start">
          <Link to={'/'} className="text-xl font-bold">
            AlphaReviews
          </Link>
          <p className="text text-center md:text-start">
            Your one-stop destination for the best deals and savings. We help you shop smarter and save bigger on your favorite brands.
          </p>
        </div>
        <div className="column">
          <h6 className="heading text-center">Quicklinks</h6>
          <ul className="text-center text">{navLinks}</ul>
        </div>
        <div className="column">
          <h6 className="heading text-center">Social</h6>
          <ul className="text-center text-3xl flex gap-3 justify-center">
            <li>
              <a href="https://www.facebook.com/ytnahidd/">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="https://github.com/ytNahid/">
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="column pt-0">
          <p className="text text-center">Copyright © All Rights Reserved 2024</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
