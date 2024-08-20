import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const ListingView = () => {
  SwiperCore.use([Navigation]);

  const { id } = useParams();

  const [listing, setListing] = useState([]);
  const [imageUrls, setImageUrls] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/api/listing/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListing(data);
        setImageUrls(data.imageUrls);
      });
  }, []);

  return (
    <main className="max-w-screen-sm mx-auto ">
      <h1>Listings</h1>

      {imageUrls &&
        imageUrls.map((image) => (
          <img className="w-full max-h-96" key={image} src={image} alt="" />
        ))}

      <div
        style={{
          margin: "14px 0",
          border: "2px solid gainsboro",
          padding: "20px",
          display: "block",
          borderRadius: "0.4em",
          lineHeight: "2.5em",
        }}
      >
        <h4 className="text-4xl">{listing.name}</h4>
        <p>address: {listing.address}</p>
        <p>description: {listing.description}</p>
        <p>bedrooms: {listing.bedrooms}</p>
        <p>furnished: {listing.furnished ? "Yes" : "No"}</p>
      </div>
    </main>
  );
};

export default ListingView;
