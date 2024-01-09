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
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateValue, setUpdateData] = useState({});
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
      </div>
    </>
  );
};

export default Profile;
