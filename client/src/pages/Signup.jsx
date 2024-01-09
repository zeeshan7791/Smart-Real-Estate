import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUpData = new FormData();
      signUpData.append("username", inputValues.username);
      signUpData.append("email", inputValues.email);
      signUpData.append("password", inputValues.password);
      signUpData.append("photo", photo);
      setLoading(true);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        body: signUpData,
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  let defaultAvatar = "https://static.thenounproject.com/png/642902-200.png";
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
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
                      src={defaultAvatar}
                      alt="product_photo"
                      height={"200px"}
                      className="w-16 h-16"
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
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg  "
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "loading...." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </>
  );
};

export default Signup;
