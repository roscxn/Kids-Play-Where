import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/location/${id}/reviews`);
        const reviews = await response.json();
        setReviews(reviews);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReview();
  }, [id]);

  return (
    <>
      <h2>View All Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <>
            <h3>By{review.userName}</h3>
            <p>Rating: {review.rating}</p>
            <p>{review.content}</p>
          </>
        ))
      ) : (
        <h2>No reviews</h2>
      )}
    </>
  );
};

export default Reviews;