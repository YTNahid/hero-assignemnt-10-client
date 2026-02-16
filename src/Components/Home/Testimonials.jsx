import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import './swiper.css';

import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <div className="bg-accent-color section-gap testimonials">
      <div className="row mx-auto mb-8">
        <div className="column">
          <h2 className="heading text-center text-white">Testimonials</h2>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        pagination={{
          el: '.swiper-custom-pagination',
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          581: {
            slidesPerView: 2,
          },
          1025: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-[1140px] !px-[10px]"
      >
        <SwiperSlide>
          <div className="row bg-white rounded-lg">
            <div className="column p-[18px] gap-3">
              <div className="text-yellow flex gap-[2px]">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <p className="text">This platform has completely changed how I choose games. The reviews are spot-on, and the community is amazing!</p>
              <h6 className="heading">- Alex</h6>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="row bg-white rounded-lg">
            <div className="column p-[18px] gap-3">
              <div className="text-yellow flex gap-[2px]">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <p className="tex">
                This website is an absolute gem for any gamer! The reviews are in-depth, well-written, and genuinely helpful in deciding which games
                are worth my time.
              </p>
              <h6 className="heading">- Stank</h6>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="row bg-white rounded-lg">
            <div className="column p-[18px] gap-3">
              <div className="text-yellow flex gap-[2px]">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <p className="tex">
                This website is an absolute gem for any gamer! The reviews are in-depth, well-written, and genuinely helpful in deciding which games
                are worth my time.
              </p>
              <h6 className="heading">- M Bond</h6>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="row bg-white rounded-lg">
            <div className="column p-[18px] gap-3">
              <div className="text-yellow flex gap-[2px]">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <p className="text">
                This website is an absolute gem for any gamer! The reviews are in-depth, well-written, and genuinely helpful in deciding which games
                are worth my time.
              </p>
              <h6 className="heading">- Jack</h6>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="text-center mt-6 swiper-custom-pagination" />
    </div>
  );
};

export default Testimonials;
