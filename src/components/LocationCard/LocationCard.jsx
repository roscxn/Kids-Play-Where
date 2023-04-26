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
      <div className="flex flex-col w-full lg:flex-row ">
        <div className="card card-compact w-52 h-80 bg-base-100 shadow-3xl flex justify-center flex-wrap flex-row hover:-translate-y-2 transition duration-200">
          <figure>
            <img
              src={location.image}
              alt="Location Image"
              className="w-52 h-36 opacity-90 object-cover"
            />
          </figure>
          <div className="card-body flex-wrap flex-row flex-col">
            <h2 className="card-title text-ellipsis overflow-clip whitespace-nowrap w-100% text-md">
              {location.locationName}
            </h2>
            <div className="text-xs flex gap-2 mb-3">
              {location.locationType}
              {location.locationType === "Playground" ? (
                <img
                  className="w-4 h-4"
                  src="https://i.ibb.co/Nx7sCZP/playground.png"
                  alt="Playground"
                />
              ) : (
                <img
                  className="w-4 h-4"
                  src="https://i.ibb.co/J2HtwCV/swimming.png"
                  alt="Pool"
                />
              )}
            </div>

            <div className="badge badge-outline">
              <p className="text-xs">
                {location.ageGroup.join(" / ")} years old
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

                  {/* <button
                    className="btn gap-1 btn-outline btn-primary btn-xs"
                    onClick={handleLocationBookmarkClick}
                  >
                    {isBookmark ? "Added" : "Bookmark"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button> */}
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
