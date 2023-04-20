import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LocationCard = ({ location }) => {

  return (
    <Link
        key={location._id}
        to={`/location/${location._id}`}
        style={{ textDecoration: "none", color: "black" }}
    >
      <div className="flex flex-col w-full lg:flex-row">
        <div className="card card-compact w-48 h-80 bg-base-100 shadow-xl flex justify-center flex-wrap flex-row ">
          <figure>
            <img
              src={location.image}
              alt="Location Image"
              className="w-52 h-32"
            />
          </figure>
          <div className="card-body flex-wrap flex-row">
            <h2 className="card-title text-ellipsis overflow-clip whitespace-nowrap w-100%">
              {location.locationName}
            </h2>
            <p className="text-xs">{location.locationType}</p>
            <div className="badge badge-outline">
              <p className="text-xs">
                {location.ageGroup.join(" / ")} years old
              </p>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Bookmark</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;



    // const [isBookmark, setIsBook] = useState(false);
    // const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);

    // useEffect (() => {
    //     const checkBookmark = async () => {
    //         if (user) {
    //             try {
    //                 const response = await fetch(`/api/user/${user._id}/bookmarks`);
    //                 const bookmarks = await response.json();
    //                 setIsBookmark(true); 
    //             } catch (error) {
    //                 console.error(error);
    //             }}
    //     };
    //     checkBookmark();
    // }, [id]);

    // handleBookmark = async (event) => {
    //   event.preventDefault();
    //   try {
    //     const method = isBookmark ? "DELETE" : "POST";
    //     const response = await fetch(`api/location/locationcard/addbookmark`, {
    //       method: method,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ _id: user._id, locationid: location._id }),
    //     });
    //     if (response.ok && method == "POST") {
    //       setIsBookmark(!isBookmark); // set the state to indicate that the book has been added to favourites
    //       setIsBookmarkAdded(true);
    //     } else if (response.ok) {
    //       setIsBookmark(!isBookmark);
    //       setIsBookmarkAdded(false);
    //     } else if (response.status === 400) {
    //       const data = await response.json();
    //       // display the error message using a toast or alert
    //       alert(data.message);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };