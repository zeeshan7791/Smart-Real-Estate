import React from "react";

const UpdateListing = () => {
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

            {isError && <p className="text-red-700 text-sm">{isError}</p>}
          </div>
        </form>
      </main>
    </>
  );
};

export default UpdateListing;
