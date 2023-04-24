import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LocationReviews from "../LocationReviews/LocationReviews";

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
      <h1 className="text-5xl font-bold">{location.locationName}</h1> <br />
      <img src={location.image} alt="Location Image" className="w-100 h-96" />
      <br />
      {location.description}
      <br />
      {!user ? (
        <></>
      ) : (
        <>
          <button className="btn btn-success" onClick={handleBookmarkClick}>
            {isBookmark ? "Added to Bookmarks" : "Bookmark"}
          </button>
        </>
      )}
      <>
        <LocationReviews location={location} user={user} />
      </>
    </>
  );
};

export default LocationDetails;
