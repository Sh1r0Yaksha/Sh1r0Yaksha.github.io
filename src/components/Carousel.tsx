import React, { useRef, useState, useEffect, Children } from "react";
import "./Carousel.css";

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const totalPages = Children.count(children); // ✅ Always number of children
  const [currentPage, setCurrentPage] = useState(0);

  const updateShadowsAndCurrentPage = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeftFade(scrollLeft > 0);
    setShowRightFade(scrollLeft + clientWidth < scrollWidth - 1);

    // ✅ Find the nearest child to center
    const childWidth = scrollRef.current.children[0]?.clientWidth || clientWidth;
    const centerPosition = scrollLeft + clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(scrollRef.current.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + childWidth / 2;
      const distance = Math.abs(centerPosition - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentPage(closestIndex);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateShadowsAndCurrentPage();
    el.addEventListener("scroll", updateShadowsAndCurrentPage, { passive: true });
    window.addEventListener("resize", updateShadowsAndCurrentPage);

    return () => {
      el.removeEventListener("scroll", updateShadowsAndCurrentPage);
      window.removeEventListener("resize", updateShadowsAndCurrentPage);
    };
  }, []);

  const scrollToPage = (pageIndex: number) => {
    if (scrollRef.current) {
      const child = scrollRef.current.children[pageIndex] as HTMLElement;
      if (child) {
        scrollRef.current.scrollTo({
          left:
            child.offsetLeft -
            scrollRef.current.clientWidth / 2 +
            child.clientWidth / 2,
          behavior: "smooth",
        });
      }
    }
  };

  const scroll = (direction: "left" | "right") => {
    let targetIndex = currentPage + (direction === "left" ? -1 : 1);
    targetIndex = Math.max(0, Math.min(totalPages - 1, targetIndex));
    scrollToPage(targetIndex);
  };

  // Touch handling remains (used for drag)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeftStart(scrollRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.touches[0].clientX - startX;
    scrollRef.current.scrollLeft = scrollLeftStart - dx;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    scrollToPage(currentPage); // ✅ snap to center on release
  };

  return (
    <div className="carousel">
      <div
        className={`carousel-container 
          ${showLeftFade ? "fade-left" : ""} 
          ${showRightFade ? "fade-right" : ""}`}
      >
        <button className="scroll-button left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        <div
          className="carousel-scroll-area"
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>

        <button className="scroll-button right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>

      {/* ✅ Pagination Dots — one per child */}
      <div className="carousel-pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentPage ? "active" : ""}`}
            onClick={() => scrollToPage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
