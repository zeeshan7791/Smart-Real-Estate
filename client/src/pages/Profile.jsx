import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4">
          <img
            src={currentUser.avatar}
            alt="profile image"
            className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
          />
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg  "
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg  "
            id="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="profile URL"
            className="border p-4 rounded-lg  "
            id="avatar"
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
            update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-500 cursor-pointer">Delete Account</span>
          <span className="text-red-500 cursor-pointer">Sign out</span>
        </div>
      </div>
    </>
  );
};

export default Profile;
