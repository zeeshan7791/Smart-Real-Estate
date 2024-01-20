import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [productPhotos, setProductPhotos] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [pics, setPics] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [uploadError, setImageUploadError] = useState("");
  const [isError, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const handleChangeProduct = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  console.log(formData, "product values");
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      if (productPhotos.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setError(false);
      const productForm = new FormData();
      productForm.append("name", formData.name);
      productForm.append("description", formData.description);
      productForm.append("address", formData.address);
      productForm.append("regularPrice", formData.regularPrice);
      productForm.append("discountPrice", formData.discountPrice);
      productForm.append("bedrooms", formData.bedrooms);
      productForm.append("bathrooms", formData.bathrooms);
      productForm.append("type", formData.type);
      productForm.append("furnished", formData.furnished);
      productForm.append("parking", formData.parking);
      productForm.append("offer", formData.offer);
      productForm.append("userRef", currentUser._id);
      for (let i = 0; i < productPhotos.length; i++) {
        productForm.append("pictures", productPhotos[i]);
        console.log(productPhotos[i]);
      }
      setIsLoading(true);
      const res = await fetch("/api/listing/create-listing", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: productForm,
      });
      setIsLoading(false);
      const data = await res.json();
      console.log(data, "value in data product");
      if (data.success === false) {
        setError(data.message);
        return;
      }
      console.log(data, "val in data--------");
      // navigate(`listing/${data.listing._id}`);
      navigate(`/`);

      alert(data.message);
      return;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  const handleUploadImages = () => {
    const imageUrls = Array.from(productPhotos).map((file) =>
      URL.createObjectURL(file)
    );

    if (imageUrls.length > 6 || imageUrls.length < 1) {
      setImageUploadError("You can upload a maximum of six images.");
      return;
    }

    setPics(imageUrls);
    setImageUploadError("");
  };

  const nextImage = () => {
    if (pics.length === 1) {
      return alert("please enter more than one image to move left or right");
    }
    setCurrentImage((prevImage) => (prevImage + 1) % pics.length);
  };

  const prevImage = () => {
    if (pics.length === 1) {
      return alert("please enter more than one image to move left or right");
    }
    setCurrentImage((prevImage) =>
      prevImage === 0 ? pics.length - 1 : prevImage - 1
    );
  };
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl mt-16 my-7 text-center font-semibold">
          Create a Listing
        </h1>
        {pics && pics.length > 0 ? (
          <div className="w-3/4 m-auto flex items-center">
            <button
              onClick={prevImage}
              className=" back-btn  w-6 h-6 bg-green-400"
            ></button>
            <div className="  border-slate-400 m-auto w-2/4 h-96 flex p-2">
              <img
                src={pics[currentImage]}
                alt={`Slide ${currentImage + 1}`}
                className=" w-96 h-full rounded"
              />
            </div>
            <button
              onClick={nextImage}
              className="next-btn  w-6 h-6 bg-green-400"
            ></button>
          </div>
        ) : (
          ""
        )}

        <form
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleCreateProduct}
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg "
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChangeProduct}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg "
              id="description"
              required
              onChange={handleChangeProduct}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg "
              id="address"
              required
              onChange={handleChangeProduct}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChangeProduct}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChangeProduct}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChangeProduct}
                  checked={formData.parking}
                />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChangeProduct}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChangeProduct}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChangeProduct}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChangeProduct}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="regularPrice"
                  required
                  min="50"
                  max="10000000"
                  onChange={handleChangeProduct}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    className="p-3 border border-gray-300 rounded-lg"
                    type="number"
                    id="discountPrice"
                    min="50"
                    max="10000000"
                    required
                    onChange={handleChangeProduct}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted Price</p>
                    {formData.type === "rent" && (
                      <span className="text-xs">($ / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be cover max 6
              </span>
            </p>
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300  rounded w-full"
                type="file"
                id="images"
                accept="images/*"
                name="pictures"
                multiple
                onChange={(e) => setProductPhotos(e.target.files)}
              />
              <button
                type="button"
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                onClick={handleUploadImages}
              >
                Upload
              </button>
            </div>
            <p className="text-red-600">{uploadError}</p>
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              {isloading ? "loading....." : "Create listing"}
            </button>
            {/* <div className="border-2 border-red-500 flex justify-center flex-wrap">
              {pics.map((item) => (
                <img
                  key={item}
                  src={item}
                  alt="images"
                  className="w-36 h-44 m-2"
                />
              ))}
            </div> */}
            {isError && <p className="text-red-700 text-sm">{isError}</p>}
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateListing;
