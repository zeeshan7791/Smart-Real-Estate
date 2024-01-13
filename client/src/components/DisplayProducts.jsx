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
        console.log(data, "value get listing");
        setListingData(data.getProductListing);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="border-2 h-fit m-auto flex justify-evenly">
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
