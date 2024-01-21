import { useState } from "react";
import { imagePoint } from "../config/imageLink";
import PropTypes from "prop-types";
const ListingPage = (props) => {
  // console.log(props.allListings, "props-----------");
  const allListings = props.allListings.getProductListing;
  // console.log(allListings, "value in all listing------");
  const [currentSlides, setCurrentSlides] = useState(
    Array(allListings.length).fill(0)
  );

  const nextSlide = (index) => {
    setCurrentSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[index] =
        (newSlides[index] + 1) % allListings[index].pictures.length;
      return newSlides;
    });
  };

  const prevSlide = (index) => {
    setCurrentSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[index] =
        newSlides[index] === 0
          ? allListings[index].pictures.length - 1
          : newSlides[index] - 1;
      return newSlides;
    });
  };

  return (
    <div>
      {allListings.map((item, index) => (
        <div
          key={index}
          className={`slide ${
            index === currentSlides[index] ? "active" : ""
          } imageSlideContainer`}
        >
          <div className="flex justify-around border-2 border-gray-200 items-center ">
            <button
              className="back-btn w-6 h-6 bg-green-400"
              onClick={() => prevSlide(index)}
            ></button>

            <img
              src={imagePoint + item.pictures[currentSlides[index]]}
              alt={`Slide ${currentSlides[index] + 1}`}
              className="w-44 h-44 rounded"
            />

            <button
              className="next-btn w-6 h-6 bg-green-400"
              onClick={() => nextSlide(index)}
            ></button>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs">
              <b>Name:</b> {item.name}
            </p>
            <p className="text-xs">
              <b>Description: </b>
              {item.description}
            </p>
            <p className="text-xs">
              <b>Address:</b> {item.address.substring(0, 14)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
ListingPage.propTypes = {
  allListings: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
export default ListingPage;
