import { useState } from "react";

export default function Review() {

  const [project, setProject] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const submitReview = async () => {

    await fetch(
      "https://web-development-services-platform.onrender.com/api/add-review",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          project,
          rating,
          review
        })
      }
    );

    alert("Review Submitted");

  };

  return (

    <div className="p-8">

      <h1>⭐ Client Feedback</h1>

      <input
        type="text"
        placeholder="Project Name"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      />

      <br /><br />

      <div className="flex gap-2 text-5xl mb-4">

  {[1, 2, 3, 4, 5].map((star) => (

    <span
  key={star}
  onClick={() => setRating(star)}
  className={`cursor-pointer text-5xl ${
    star <= rating
      ? "text-yellow-400"
      : "text-gray-500"
  }`}
>
  {star <= rating ? "★" : "☆"}
</span>

  ))}

</div>
<p className="mb-4">
  Selected Rating: {rating} / 5
</p>

      <br /><br />

      <textarea
        placeholder="Write Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <br /><br />

      <button onClick={submitReview}>
        Submit Review
      </button>

    </div>

  );

}