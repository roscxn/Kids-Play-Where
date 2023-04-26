import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";

const LocationReviews = ({ location, user }) => {
  const { id } = useParams();
  const [locationReviews, setLocationReviews] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("5");
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchLocationReviews = async () => {
      try {
        const response = await fetch(`/api/location/${id}`);
        const data = await response.json();
        // Add a date property to each review
        const reviewsWithDate = data.reviews.map((review) => ({
          ...review,
          date: new Date(review.createdAt).toLocaleDateString(),
        }));
        setLocationReviews({ ...data, reviews: reviewsWithDate });
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocationReviews();
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (content.length < 4 || content.length > 100) {
        throw new Error("Review must be between 4 and 100 characters.");
      }
      const response = await fetch(`/api/reviews/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, rating, user }),
      });
      if (!response.ok) {
        throw new Error("Failed to add review");
      }
      const data = await response.json();
      // Update the locationReviews state with the new review
      setLocationReviews((prevReviews) => {
        return {
          ...prevReviews,
          reviews: [...prevReviews.reviews, data],
        };
      });
      // Clear the form fields
      setContent("");
      setRating(0);
      setError(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmed)
      try {
        const userId = user._id;
        const locationId = location._id;
        const response = await fetch(`/api/reviews/${reviewId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locationId, userId }),
        });
        const data = await response.json();
        console.log(data.message);
        if (!response.ok) {
          throw new Error(data.message);
        }
        // Remove the deleted review from the locationReviews state
        setLocationReviews((prevReviews) => ({
          ...prevReviews,
          reviews: prevReviews.reviews.filter(
            (review) => review._id !== reviewId
          ),
        }));
      } catch (error) {
        console.error(error);
        window.alert(error.message);
      }
  };

  return (
    <>
      <div className="flex flex-wrap px-40 gap-8 mt-10 ">
        {locationReviews?.reviews?.length > 0 ? (
          locationReviews.reviews.map((review) => (
            <div
              key={review._id}
              className="card w-60 h-60 bg-base-100 shadow-xl mb-10 border-2"
            >
              <div className="card-body flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="card-title text-sm flex items-center">
                    {Array.from({ length: review.rating }, (_, index) => (
                      <img
                        key={index}
                        className="w-5 h-5"
                        src="https://i.ibb.co/F54cRjT/star.jpg"
                        alt="star"
                      />
                    ))}
                  </h3>

                  {user && review.userName === user.name ? (
                    <button
                      className="btn btn-circle btn-xs btn-outline"
                      onClick={() => handleDelete(review._id)}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <p className="text-xs mb-3 flex gap-3">
                  <img
                    className="w-8 h-8"
                    src="https://i.ibb.co/0YzqCQ4/children-playing-png-icon-transparent-png-modified.png"
                    alt="icon"
                  />
                  {review.userName}
                  <br />
                  {formatDate(review.createdAt)}
                </p>
                <p className="text-sm">{review.content}</p>
              </div>
            </div>
          ))
        ) : (
          <h2>No reviews yet.</h2>
        )}
      </div>

      {!user ? (
        <></>
      ) : (
        <div className="collapse px-36 gap-5 mt-10 mb-16">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Add Review +</div>
          <div className="collapse-content">
            <form onSubmit={handleSubmit}>
              <label>Leave a rating:</label>
              <br />
              <div className="rating rating-md">
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value="1"
                  checked={rating === "1"}
                  onChange={(event) => setRating(event.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value="2"
                  checked={rating === "2"}
                  onChange={(event) => setRating(event.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value="3"
                  checked={rating === "3"}
                  onChange={(event) => setRating(event.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value="4"
                  checked={rating === "4"}
                  onChange={(event) => setRating(event.target.value)}
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value="5"
                  checked={rating === "5"}
                  onChange={(event) => setRating(event.target.value)}
                />
              </div>
              <br />
              <br />
              <label>
                Content:
                <br />
                <textarea
                  className="textarea textarea-primary textarea-lg w-full max-w-xs"
                  value={content}
                  minLength={4}
                  maxLength={100}
                  onChange={(event) => setContent(event.target.value)}
                />
              </label>
              <br />
              <button className="btn btn-sm btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      )}
    </>
  );
};

export default LocationReviews;
