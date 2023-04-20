import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const LocationDetails = ({ user }) => {
  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [isBookmark, setIsBookmark] = useState(false);
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);

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
        setIsBookmarkAdded(true);
      } else if (response.ok) {
        setIsBookmark(!isBookmark);
        setIsBookmarkAdded(false);
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
      <h1>Location Details</h1>
      {location.locationName}
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
    </>
  );
};

export default LocationDetails;
