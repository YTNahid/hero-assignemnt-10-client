import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Fade } from 'react-awesome-reveal';
import 'swiper/css/bundle';
import './swiper.css';

import hero1 from '../../assets/hero1.jpg';
import hero2 from '../../assets/hero2.jpg';
import hero3 from '../../assets/hero3.jpg';

const Hero = () => {
  return (
    <div className="home-hero">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
        }}
        modules={[Pagination, Autoplay]}
        className="h-[650px] md:h-[550px] lg:h-[650px]"
      >
        <SwiperSlide
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hero1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="row m-auto h-full items-center justify-center">
            <div className="column items-center">
              <Fade direction="down" triggerOnce={true}>
                <h1 className="heading text-center text-white max-w-[900px]">Discover Your Next Gaming Adventure</h1>
              </Fade>
              <Fade triggerOnce={true}>
                {' '}
                <p className="text text-center text-white max-w-[800px]">
                  Welcome to your ultimate gaming destination! Explore honest reviews, ratings, and insights on the latest video games across all
                  platforms. From indie gems to AAA blockbusters, find the perfect games that match your style and preferences.
                </p>
              </Fade>

              <Fade direction="up" triggerOnce={true}>
                <a href="#explore">
                  <button className="button mt-7">Explore Reviews</button>
                </a>
              </Fade>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hero2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="row m-auto h-full items-center justify-center">
            <div className="column items-center">
              <h1 className="heading text-center text-white max-w-[900px]">Unleash the Power of Gaming</h1>
              <p className="text text-center text-white max-w-[800px]">
                Dive into a world of immersive gaming experiences. Discover the latest trends, best graphics, and most captivating stories in the
                gaming universe. Your adventure awaits!
              </p>
              <a href="#power">
                <button className="button mt-7">Explore Reviews</button>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hero3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="row m-auto h-full items-center justify-center">
            <div className="column items-center">
              <h1 className="heading text-center text-white max-w-[900px]">Level Up Your Gaming Experience</h1>
              <p className="text text-center text-white max-w-[800px]">
                Explore tips, tricks, and strategies to dominate your favorite games. Stay ahead in the competitive world of gaming with insights from
                experts and enthusiasts alike.
              </p>
              <a href="#levelup">
                <button className="button mt-7">Explore Reviews</button>
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
