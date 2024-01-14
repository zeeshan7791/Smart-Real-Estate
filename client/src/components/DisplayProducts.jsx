import { useEffect, useState } from "react";

const DisplayProducts = () => {
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/listing/get-listing"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data, "value get listing");
        setListingData(data.getProductListing);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // const imagePoint = `http://localhost:3000/image/`;
  console.log(listingData[0].pictures.length, "value in listingData");
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
  return (
    <>
      <div className="border-2 h-fit m-auto flex justify-evenly">
        <div className=" m-auto w-2/4 h-96 flex p-2">
          {/* <button onClick={prevImage}>&lt; Prev</button>
          <img
            src={pics[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="w-96 h-full rounded"
          />
          <button onClick={nextImage}>Next &gt;</button> */}
        </div>
        {listingData.map((item) => (
          <div key={item.id} className="  w-64 ">
            <p>
              <b>Name:</b> {item.name}
            </p>
            <p>
              <b>Description: </b>
              {item.description}
            </p>
            <p>
              <b>address:</b>
              {item.address}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayProducts;
