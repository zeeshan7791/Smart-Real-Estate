import { useDispatch, useSelector } from "react-redux";
import { myListingActions } from "../redux/listing/myListingSlice";
import { useEffect } from "react";
import ListingPage from "./listingPage";

const MyListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error, myListings } = useSelector(
    (state) => state.myListing
  );
  console.log(currentUser._id, "value in my listing------");
  const userRef = currentUser._id;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch(myListingActions.getMyListingStart());
        const res = await fetch(
          "http://localhost:3000/api/listing/my-listing",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userRef }),
          }
        );
        const data = await res.json();
        console.log(data, "value in data");
        if (data.success === false) {
          dispatch(myListingActions.getMyListingFailure(data.message));
          return;
        }
        dispatch(myListingActions.getMyListingSuccess(data));
      } catch (error) {
        dispatch(myListingActions.getMyListingFailure(error.message));
      }
    };

    fetchData();
  }, [userRef, dispatch]);

  const myListingsObject = {
    getProductListing: myListings.userListing,
  };

  return (
    <>
      {loading && (
        <div className="h-96 flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="h-96 flex justify-center items-center">
          <p>Error: {error}</p>
        </div>
      )}
      {myListings.userListing.length === 0 ? (
        <div className="h-96  flex justify-center items-center">
          <p className="text-5xl font-bold">No Data Here</p>
        </div>
      ) : (
        <>
          <h1 className="text-center">My Listings</h1>
          <ListingPage allListings={myListingsObject} />
        </>
      )}
    </>
  );
};

export default MyListing;
