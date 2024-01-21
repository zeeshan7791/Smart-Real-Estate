// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { actions } from "../redux/listing/listingSlice";
// import { imagePoint } from "../config/imageLink";
// import ListingPage from "./listingPage";

// const DisplayProducts = () => {
//   // const [listingData, setListingData] = useState([]);
//   const { loading, error, allListings } = useSelector(
//     (state) => state.listings
//   );

//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch(actions.getProductStart());
//         const response = await fetch(
//           "http://localhost:3000/api/listing/get-listing"
//         );

//         const data = await response.json();

//         if (data.success === false) {
//           dispatch(actions.getProductFailure(data.message));
//           return;
//         }
//         dispatch(actions.getProductSuccess(data));
//       } catch (error) {
//         dispatch(actions.getProductFailure(error.message));
//       }
//     };

//     fetchData();
//   }, []);
//   console.log(loading, error);

//   console.log(allListings.getProductListing, "value in allListings");

//   // const [currentSlides, setCurrentSlides] = useState(
//   //   Array(allListings.getProductListing.length).fill(0)
//   // );

//   // const nextSlide = (index) => {
//   //   setCurrentSlides((prevSlides) => {
//   //     const newSlides = [...prevSlides];

//   //     newSlides[index] =
//   //       (newSlides[index] + 1) %
//   //       allListings.getProductListing[index].pictures.length;
//   //     return newSlides;
//   //   });
//   // };

//   // const prevSlide = (index) => {
//   //   setCurrentSlides((prevSlides) => {
//   //     const newSlides = [...prevSlides];
//   //     newSlides[index] =
//   //       newSlides[index] === 0
//   //         ? allListings.getProductListing[index].pictures.length - 1
//   //         : newSlides[index] - 1;
//   //     return newSlides;
//   //   });
//   // };
//   return (
//     <>
//       <ListingPage allListings={allListings} />
//       {/* <div className="border-2 h-fit m-auto flex flex-wrap justify-start">
//         {allListings.getProductListing.map((item, index) => (
//           <div
//             key={index}
//             className={`slide ${
//               index === currentSlides[index] ? "active" : ""
//             } imageSlideContainer`}
//           >
//             <div className="flex justify-around border-2 border-gray-200 items-center ">
//               <button
//                 className="back-btn w-6 h-6 bg-green-400"
//                 onClick={() => prevSlide(index)}
//               ></button>

//               <img
//                 src={imagePoint + item.pictures[currentSlides[index]]}
//                 alt={`Slide ${currentSlides[index] + 1}`}
//                 className="w-44  h-44 rounded"
//               />

//               <button
//                 className="next-btn w-6 h-6 bg-green-400"
//                 onClick={() => nextSlide(index)}
//               ></button>
//             </div>
//             <div className="flex flex-col items-center">
//               <p className="text-xs">
//                 <b>Name:</b> {item.name}
//               </p>
//               <p className="text-xs">
//                 <b>Description: </b>
//                 {item.description}
//               </p>
//               <p className="text-xs">
//                 <b>Address:</b> {item.address.substring(0, 14)}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div> */}
//     </>
//   );
// };

// export default DisplayProducts;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/listing/listingSlice";
// Assuming ListingPage is exported from ListingPage.jsx
import ListingPage from "./listingPage";

const DisplayProducts = () => {
  const { loading, error, allListings } = useSelector(
    (state) => state.listings
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(actions.getProductStart());
        const response = await fetch("api/listing/get-listing");

        const data = await response.json();

        if (data.success === false) {
          dispatch(actions.getProductFailure(data.message));
          return;
        }
        dispatch(actions.getProductSuccess(data));
      } catch (error) {
        dispatch(actions.getProductFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);
  const allListingsObject = {
    getProductListing: allListings.getProductListing,
  };
  // console.log(allListingsObject, "value in a lll ");
  return (
    <>
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : allListings.getProductListing.length === 0 ? (
        <div className="h-96  flex justify-center items-center">
          <p className="text-5xl font-bold">No Data Here</p>
        </div>
      ) : (
        <div className="border-2 border-red -500 h-fit m-auto flex flex-wrap justify-start">
          <ListingPage allListings={allListingsObject} />
        </div>
      )}
      {error && (
        <div className="h-96 flex justify-center items-center">
          <p>Error: {error}</p>
        </div>
      )}
    </>
  );
};

export default DisplayProducts;
