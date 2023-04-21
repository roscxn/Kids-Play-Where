import { useState, useEffect } from "react";
import LocationCard from "../../components/LocationCard/LocationCard";

const BookmarksPage = ({ user }) => {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`/api/user/${user._id}/bookmarks`);
        const { showBookmarks } = await response.json();
        setBookmarks(showBookmarks.bookmarks);
      } catch (error) {
        console.log("Error fetching bookmarks:", error);
      }
    };
    fetchBookmarks();
  }, [user._id]);

  return (
    <>
      {bookmarks.length > 0 ? (
        <>
          {bookmarks.map((location) => (
            <LocationCard key={location._id} location={location} user={user} />
          ))}
        </>
      ) : (
        <h2>No bookmarks</h2>
      )}
    </>
  );
};

export default BookmarksPage;
