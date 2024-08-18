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

  console.log(imageUrls);

  return (
    <main>
      <h1>Listings</h1>
      {imageUrls.map((image, index) => (
        <img
          key={index}
          style={{ maxWidth: "750px" }}
          src={`${image}`}
          alt="listing view image"
        />
      ))}
      <div
        style={{
          margin: "14px",
          border: "1px solid gainsboro",
          maxWidth: "480px",
          padding: "20px",
          display: "block",
        }}
      >
        <h4>name: {listing.name}</h4>
        <p>address: {listing.address}</p>
        <p>description: {listing.description}</p>
        <p>bedrooms: {listing.bedroom}</p>
        <p>furnished: {listing.furnished}</p>
      </div>
    </main>
  );
};

export default ListingView;
