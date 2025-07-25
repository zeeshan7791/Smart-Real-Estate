import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

import { myListingActions } from "../redux/listing/myListingSlice";
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { isLoading, isError } = useSelector((state) => state.myListing);
  const imagePoint = `https://smart-real-estate-1.onrender.com/image/`
  console.log(isError);
  const [updateValue, setUpdateData] = useState({});
  const [listings, setListings] = useState([]);
  const [update, setUpdate] = useState(false);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUpdateData({
      ...updateValue,
      [e.target.id]: e.target.value,
    });
  };
  // logOutUser
  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess());
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };
  // updateUserInformation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateForm = new FormData();
      updateForm.append(
        "username",
        updateValue.username ? updateValue.username : currentUser.username
      );
      updateForm.append(
        "email",
        updateValue.email ? updateValue.email : currentUser.email
      );
      updateForm.append(
        "password",
        updateValue.password ? updateValue.password : ""
      );
      updateForm.append("photo", photo);
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        body: updateForm,
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdate(true);
      handleSignOut();
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  // console.log(myListings, "value in my Listing0000000000000000");

  const userRef = currentUser._id;

  const handleShowListing = async () => {
    try {
      // dispatch(myListingActions.getMyListingStart());
      const res = await fetch("http://localhost:3000/api/listing/my-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userRef }),
      });
      const data = await res.json();

      setListings(data.userListing);
      if (data.success === false) {
        dispatch(myListingActions.getMyListingFailure(data.message));
        return;
      }
      dispatch(myListingActions.getMyListingSuccess(data));
    } catch (error) {
      dispatch(myListingActions.getMyListingFailure(error.message));
    }
  };
  const handleDeleteListing = async (listingId) => {
    console.log(listingId, "dleete listing id-------");
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        return alert(data.message);
      }
      setListings((prev) => prev.filter((listing) => listing._id != listingId));
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              <div className=" m-auto w-fit">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:3000/image/${currentUser.photo}`}
                      alt="product_photo"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                )}
              </div>
              <p className="text-center">
                {photo ? photo.name : "Upload Photo"}
              </p>
              <input
                type="file"
                name="photo"
                className="form-control"
                placeholder="Enter Product photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <input
            type="text"
            defaultValue={currentUser.username}
            placeholder="username"
            className="border p-3 rounded-lg  "
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            defaultValue={currentUser.email}
            placeholder="email"
            className="border p-3 rounded-lg  "
            id="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg  "
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "loading..." : " update"}
          </button>
          <Link
            className="bg-green-700 p-3 text-center text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
            to={"/create-listing"}
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-500 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-red-500 cursor-pointer">
            Sign out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {update ? "user updated Successfully!" : ""}
        </p>
        <button onClick={handleShowListing} className="text-green-700 w-full">
          Show Listing
        </button>
        {isError && <p className="text-red-700 mt-5">{isError}</p>}
        <h1 className="text-center mt-7 text-2xl font-semibold">
          Your Listings
        </h1>
        {isLoading ? (
          <p className="text-5xl font-bold">Loading...</p>
        ) : (
          listings &&
          listings.length > 0 &&
          listings.map((listing) => (
            <>
              <div className="flex flex-col gap-4">
                <div
                  key={listing._id}
                  className="flex border rounded-lg p-3 justify-between items-center gap-4"
                >
                  <Link to={`listing/${listing._id}`}>
                    <img
                      src={imagePoint + listing.pictures[0]}
                      alt="listing"
                      className="w-16 h-16 object-contain "
                    />
                  </Link>
                  <Link
                    className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                    to={`listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleDeleteListing(listing._id)}
                      className="text-red-700 uppercase"
                    >
                      Delete
                    </button>
                    <button className="text-green-700 uppercase">Edit</button>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default Profile;
