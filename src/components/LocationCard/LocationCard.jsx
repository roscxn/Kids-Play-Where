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
  }, [user]);

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
    <Link key={location._id} to={`/location/${location._id}`}>
      <div className="flex flex-col w-auto h-80 lg:flex-row">
        <div className="card card-compact bg-base-100 shadow-3xl hover:-translate-y-2 transition duration-200">
          <figure>
            <img
              src={location.image}
              alt="Location Image"
              className="w-full h-44 opacity-90 object-cover"
            />
          </figure>
          <div className="card-body flex-wrap flex-row flex-col h-48 overflow-hidden">
            <h2 className="card-title text-md line-clamp-1">
              {location.locationName}
            </h2>
            <div className="text-sm flex gap-2 mb-3">
              {location.locationType}
              {location.locationType === "Playground" ? (
                <img
                  className="w-5 h-5"
                  src="https://i.ibb.co/Nx7sCZP/playground.png"
                  alt="Playground"
                />
              ) : (
                <img
                  className="w-5 h-5"
                  src="https://i.ibb.co/J2HtwCV/swimming.png"
                  alt="Pool"
                />
              )}
            </div>
            <div className="badge badge-outline">
              <p className="text-xs">
                {location?.ageGroup
                  ?.sort()
                  .reduce((acc, curr) => {
                    const lowerBound = parseInt(curr.split("-")[0]);
                    const upperBound = parseInt(curr.split("-")[1]);
                    const last = acc[acc.length - 1];
                    if (last && lowerBound === last.upperBound) {
                      last.upperBound = upperBound;
                      return acc.slice(0, -1).concat(last);
                    }
                    return acc.concat({ lowerBound, upperBound });
                  }, [])
                  .map(({ lowerBound, upperBound }) => {
                    if (upperBound === 18) {
                      return `${lowerBound}+ years old`;
                    }
                    return `${lowerBound}-${upperBound} years old`;
                  })
                  .join(", ")}{" "}
              </p>
            </div>
            <div className="card-actions justify-end">
              <br />
              {!user ? (
                <></>
              ) : (
                <>
                  {!isBookmark ? (
                    <button onClick={handleLocationBookmarkClick}>
                      <img
                        className="w-4 h-5"
                        src="https://i.ibb.co/RCPZY2v/bookmark.png"
                        alt="bookmark"
                        title="Add to Bookmarks"
                      />
                    </button>
                  ) : (
                    <button onClick={handleLocationBookmarkClick}>
                      <img
                        className="w-4 h-5"
                        src="https://i.ibb.co/9ysZXfL/bookmarked.jpg"
                        alt="bookmark"
                        title="Added to Bookmarks"
                      />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
