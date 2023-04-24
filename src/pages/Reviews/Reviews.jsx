import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Reviews = ({ location, user }) => {
  const { id } = useParams();
  const [locationReviews, setLocationReviews] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchLocationReviews = async () => {
      try {
        const response = await fetch(`/api/location/${id}`);
        const data = await response.json();
        setLocationReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocationReviews();
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
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

      window.location.reload();
    } catch (error) {
      console.error(error);
      window.alert(error.message);
    }
  };

  const handleDelete = async (reviewId) => {
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
      <h2>View All Reviews</h2> <hr />
      {locationReviews?.reviews?.length > 0 ? (
        locationReviews.reviews.map((review) => (
          <div key={review._id}>
            <h3>By {review.userName}</h3>
            <p>Rating: {review.rating}</p>
            <p>{review.content}</p>
            {user && review.userName === user.name ? (
              <>
                <button
                  className="btn"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <></>
            )}
            <hr />
          </div>
        ))
      ) : (
        <h2>No reviews</h2>
      )}
      {!user ? (
        <></>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default Reviews;
