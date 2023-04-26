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
    <div>
      <div
        className="hero h-80"
        style={{
          backgroundImage: `url("https://www.littledayout.com/wp-content/uploads/01-tayo-1.jpg")`,
        }}
      >
        <div className="hero-overlay bg-base-200 bg-opacity-50"></div>
        <div className="hero-content text-white">
          <div className="mb-2">
            <br />
            <h1 className="mb-4 text-5xl text-center font-bold">
              My Bookmarks
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-20 mt-14 mb-20">
        {bookmarks.length > 0 ? (
          <>
            {bookmarks.map((location) => (
              <div
                key={location._id}
                className="card card-compact w-48 bg-base-100 shadow-xl"
              >
                <LocationCard location={location} user={user} />
              </div>
            ))}
          </>
        ) : (
          <h2>No bookmarks</h2>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
