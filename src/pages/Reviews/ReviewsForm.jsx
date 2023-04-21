import { useState } from "react";
import { useParams } from "react-router-dom";

const ReviewsForm = ({ user }) => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/reviews/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, rating }),
    });
    if (response.ok) {
      setContent("");
      setRating(0);
    }
  };

  return (
    <>
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
    </>
  );
};

export default ReviewsForm;
