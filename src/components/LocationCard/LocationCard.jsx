import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LocationCard = ({ location, user }) => {
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/user/${user._id}/bookmarks`);
          const userBookmarks = await response.json();
          setIsBookmark(
            userBookmarks.showBookmarks.bookmarks.find(
              (b) => b._id === location._id
            )
          );
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkBookmark();
  }, []);

  const handleLocationBookmarkClick = async (event) => {
    event.preventDefault();
    try {
      const method = isBookmark ? "DELETE" : "POST";
      const response = await fetch(
        `/api/location/locationcard/addBookmarkCard`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: user._id, locationId: location._id }),
        }
      );
      if (response.ok && method == "POST") {
        setIsBookmark(!isBookmark);
      } else if (response.ok) {
        setIsBookmark(!isBookmark);
      } else if (response.status === 400) {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
          <br />
          <p className="text-xs">{location.locationType}</p>
          <div className="badge badge-outline">
            <p className="text-xs">{location.ageGroup.join(" / ")} years old</p>
          </div>
          <div className="card-actions justify-end">
            <Link
              key={location._id}
              to={`/location/${location._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <button>View More</button>
            </Link>
            <br />
            {!user ? (
              <></>
            ) : (
              <>
                <button
                  className="btn btn-success"
                  onClick={handleLocationBookmarkClick}
                >
                  {isBookmark ? "Added to Bookmarks" : "Bookmark"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
