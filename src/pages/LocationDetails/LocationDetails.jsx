import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LocationReviews from "../LocationReviews/LocationReviews";
import LocationMap from "../../components/Map/LocationMap";

const LocationDetails = ({ user }) => {
  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/location/${id}`);
        const location = await response.json();
        setLocation(location);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocation();
  }, [id]);

  useEffect(() => {
    const checkBookmark = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/user/${user._id}/bookmarks`);
          const userBookmarks = await response.json();
          setIsBookmark(
            userBookmarks.showBookmarks.bookmarks.find(
              (b) => b._id.toString() === id
            )
          );
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkBookmark();
  }, [id]);

  const handleBookmarkClick = async (event) => {
    event.preventDefault();
    try {
      const method = isBookmark ? "DELETE" : "POST";
      const response = await fetch(`/api/location/${id}/addBookmark`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: user._id }),
      });
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
    <>
      <div className="w-10/12 text-justify my-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold pl-40">{location.locationName}</h1>
      </div>
      <div className="flex items-center ps-40 my-4">
        <img
          className="w-6 h-6 mr-2"
          src="https://i.ibb.co/m8VsQWF/houseicon.png"
        />
        <p className="text-gray-800">{location.address}</p>
      </div>
      <br />
      <div className="flex flex-col w-full lg:flex-row justify-center px-20">
        <div className="w-3/5 lg:pr-0">
          <div className="grid h-32 card bg-base-100 rounded-box place-items-center rounded-lg">
            <img
              src={location.image}
              className="h-full w-full object-cover rounded-lg"
              style={{ width: "800px", height: "510px", opacity: 0.9 }}
            />
          </div>
        </div>
        <div className="w-1/7 lg:pl-0">
          <div
            className="grid h-16 mb-2 card bg-base-200 rounded-box place-items-center rounded-lg"
            style={{ height: "180px", width: "400px" }}
          >
            {location.locationType === "Pool" ? (
              <img
                className="w-96 h-36 rounded-lg object-cover opacity-90"
                src="https://hips.hearstapps.com/hmg-prod/images/what-parents-shouldnt-let-kids-do-at-pool-1529945762.jpg"
              />
            ) : (
              <img
                className="w-96 h-36 rounded-lg object-cover opacity-90"
                src="https://shopsinsg.com/wp-content/uploads/2020/03/indoor-playground-in-singapore.jpg"
              />
            )}
          </div>

          <div
            className="grid h-32 card bg-base-200 rounded-box place-items-center rounded-lg"
            style={{ height: "280px", width: "400px" }}
          >
            <div
              className="grid h-4/5 mt-2 mb-2 bg-base-200 rounded-box place-items-center rounded-lg"
              style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
            >
              <LocationMap
                id={id}
                style={{
                  height: "300px",
                  width: "100%",
                  borderRadius: "0.5rem",
                }}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-9/12 h-6 text-justify py-6 mx-40 my-8 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Description </h1>
          {!user ? (
            <></>
          ) : (
            <button
              className="btn btn-sm gap-2 btn-outline btn-primary"
              onClick={handleBookmarkClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              {isBookmark ? "Added to Bookmarks" : "Bookmark"}
            </button>
          )}
        </div>

        <div></div>
      </div>
      <div
        className="w-7/12 h-auto text-justify ps-40 mb-16 text-gray-800 text-sm tracking-wide"
        style={{ paddingTop: "20px" }}
      >
        {location.description}
        <br />
        <br />
        <br />
        Website:{" "}
        <a
          href={location.website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-cyan-600"
        >
          Click here
        </a>
        <br />
        <br />
        Recommended for ages:{" "}
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
          .join(", ")}
      </div>
      <>
        <div className="w-10/12 text-justify ps-40 my-5 flex">
          <h1 className="text-2xl font-bold">View All Reviews</h1>
          <img
            className="ml-3 w-8 h-8"
            src="https://i.ibb.co/F54cRjT/star.jpg"
            alt="star"
          />
        </div>
        <LocationReviews location={location} user={user} />
      </>
    </>
  );
};

export default LocationDetails;
