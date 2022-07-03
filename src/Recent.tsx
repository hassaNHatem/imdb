import "./App.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useState } from "react";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

function Recent() {
  const [display, setDisplay] = useState(true);
  const local = localStorage.getItem("recent-views");
  let recentConerted = [];
  if (local !== null) {
    recentConerted = JSON.parse(local);
  }
  return (
    <div className="recent">
      <div className="recent-header">
        <h2>Recently Viewd Shows</h2>
        <MdArrowBackIosNew
          className={display ? "arrow" : "reverse-arrow"}
          onClick={() => {
            setDisplay(!display);
          }}
        />
      </div>
      {display && (
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {recentConerted.map((el: any, index: number) => {
            return (
              <SwiperSlide>
                <div key={index} className="movie">
                  <img width={150} height={200} src={el.Poster}></img>
                  <h2>{el.Title}</h2>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

export default Recent;
