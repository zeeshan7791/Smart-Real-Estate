import { useState } from "react";

const CreateListing = () => {
  const [inputProductValues, setInputProductValues] = useState({});
  const [productPhotos, setProductPhotos] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const handleChangeProduct = (e) => {
    setInputProductValues({
      ...inputProductValues,
      [e.target.id]: e.target.value,
    });
  };
  console.log(inputProductValues, "data in product values");
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const productForm = new FormData();
      productForm.append("name", inputProductValues.name);
      productForm.append("description", inputProductValues.description);
      productForm.append("address", inputProductValues.address);
      productForm.append("regularPrice", inputProductValues.regularPrice);
      productForm.append("discountPrice", inputProductValues.discountPrice);
      productForm.append("bedrooms", inputProductValues.bedrooms);
      productForm.append("bathrooms", inputProductValues.bathrooms);
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
        alert("Failed to create product");
        return;
      }
      alert("Product created successfully");
      return;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  console.log(productPhotos.length, "product photos------");
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl mt-16 my-7 text-center font-semibold">
          Create a Listing
        </h1>
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
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg "
              id="description"
              required
              onChange={handleChangeProduct}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg "
              id="address"
              required
              onChange={handleChangeProduct}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChangeProduct}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChangeProduct}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChangeProduct}
                />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChangeProduct}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChangeProduct}
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
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="regularPrice"
                  required
                  onChange={handleChangeProduct}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  <span className="text-xs">{"$ / Month"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="discountPrice"
                  required
                  onChange={handleChangeProduct}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">{"$ / Month"}</span>
                </div>
              </div>
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
              <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                Upload
              </button>
            </div>
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              {isloading ? "loading....." : "Create listing"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateListing;
