import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/listing/listingSlice";

const DisplayProducts = () => {
  // const [listingData, setListingData] = useState([]);
  const { loading, error, allListings } = useSelector(
    (state) => state.listings
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(actions.getProductStart());
        const response = await fetch(
          "http://localhost:3000/api/listing/get-listing"
        );

        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }

        const data = await response.json();
        // console.log(data, "value get listing");
        if (data.success === false) {
          dispatch(actions.getProductFailure(data.message));
          return;
        }
        dispatch(actions.getProductSuccess(data));
        // setListingData(data.getProductListing);
      } catch (error) {
        dispatch(actions.getProductFailure(error.message));
      }
    };

    fetchData();
  }, []);
  console.log(loading, error);
  const imagePoint = `http://localhost:3000/image/`;
  console.log(allListings.getProductListing, "value in allListings");
  // useEffect(() => {
  //   if (listingData) {
  //     let arrEditImage = [];

  //     for (let i = 0; i < listingData[0].pictures.length; i++) {
  //       arrEditImage.push(imagePoint + listingData.pictures[i]);
  //     }
  //   }
  // }, [listingData]);
  // let pics = [];
  // for (let i = 0; i < listingData[0].pictures.length; i++) {
  //   pics.push(imagePoint + listingData[0].pictures[i]);
  // }
  // const [currentImage, setCurrentImage] = useState(0);

  // const nextImage = () => {
  //   setCurrentImage((prevImage) => (prevImage + 1) % pics.length);
  // };

  // const prevImage = () => {
  //   setCurrentImage((prevImage) =>
  //     prevImage === 0 ? pics.length - 1 : prevImage - 1
  //   );
  // };

  // const getImage = allListings.getProductListing.map((item) => item.pictures);

  const [currentSlides, setCurrentSlides] = useState(
    Array(allListings.getProductListing.length).fill(0)
  );

  const nextSlide = (index) => {
    setCurrentSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[index] =
        (newSlides[index] + 1) %
        allListings.getProductListing[index].pictures.length;
      return newSlides;
    });
  };

  const prevSlide = (index) => {
    setCurrentSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[index] =
        newSlides[index] === 0
          ? allListings.getProductListing[index].pictures.length - 1
          : newSlides[index] - 1;
      return newSlides;
    });
  };
  return (
    <>
      <div className="border-2 h-fit m-auto flex flex-wrap justify-start">
        {allListings.getProductListing.map((item, index) => (
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
                className="w-44  h-44 rounded"
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
    </>
  );
};

export default DisplayProducts;
