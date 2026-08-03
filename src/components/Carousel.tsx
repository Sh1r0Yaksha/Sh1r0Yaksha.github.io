import React, { Children } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Carousel.css";

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const totalPages = Children.count(children);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    loop: false,
    rubberband: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      origin: "center",
      perView: "auto",
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          origin: "center",
          perView: 1,
          spacing: 8,
        },
      },
    },
  });

  return (
    <div className="carousel">
      <div className="carousel-container">

        <button
          className="scroll-button left"
          disabled={currentSlide === 0}
          onClick={() => instanceRef.current?.prev()}
        >
          &#10094;
        </button>

        <div ref={sliderRef} className="keen-slider">
          {Children.map(children, (child, index) => (
            <div className="keen-slider__slide" key={index}>
              {child}
            </div>
          ))}
        </div>

        <button
          className="scroll-button right"
          disabled={currentSlide === totalPages - 1}
          onClick={() => instanceRef.current?.next()}
        >
          &#10095;
        </button>
      </div>

      {loaded && (
        <div className="carousel-pagination">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <span
              key={idx}
              className={`dot ${currentSlide === idx ? "active" : ""}`}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;