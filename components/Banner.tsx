import Image from "next/image";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiColorSwatch, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import { sanityClient, urlFor } from "../sanity";

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-8 absolute bottom-32 z-30 right-10 border-[1px] border-gray-900 px-2 hover:border-gray-800 bg-black/50 hover:bg-black shadow-btnShadow overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full  text-2xl flex items-center cursor-pointer group  ">
        <HiChevronDoubleRight className="text-white transform group-hover:translate-x-8 translate-x-0 duration-500 transition-transform" />
      </div>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-8 absolute bottom-32 z-30 left-10 border-[1px] border-gray-900 px-2 hover:border-gray-800 bg-black/50 hover:bg-black shadow-btnShadow overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full  text-2xl flex items-center cursor-pointer group  ">
        <HiChevronDoubleLeft className="text-white transform group-hover:-translate-x-5 translate-x-3 duration-500 transition-transform" />
      </div>
    </div>
  );
}

interface Props {
  banners: {
    image: string;
    alt: string;
    loading: "lazy" | "eager" | undefined;
  }[];
}

const Banner = ({ banners }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="w-full h-auto md:h-[500px] relative">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img
              className="w-full h-auto md:h-[500px]   object-cover object-center"
              src={urlFor(banner.image).url()}
              loading={banner.loading}
              alt={banner.alt}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
