import { useState, useEffect } from "react";

export default function AdminReviews() {

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {

    fetch("https://web-development-services-platform.onrender.com/api/reviews")
      .then((response) => response.json())
      .then((data) => {

        setReviews(data.reviews);

        let total = 0;

        data.reviews.forEach((review) => {
          total += review[3];
        });

        if (data.reviews.length > 0) {
          setAverageRating(
            (total / data.reviews.length).toFixed(1)
          );
        }

      });

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        ⭐ Client Reviews
      </h1>

      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Average Rating: {averageRating} / 5
        </h2>

        <p className="mt-2">
          Total Reviews: {reviews.length}
        </p>

      </div>

      {reviews.map((review, index) => (

        <div
          key={index}
          className="mb-6 p-6 border rounded-xl"
        >

          <h2 className="text-2xl mb-2">
            {"⭐".repeat(review[3])}
          </h2>

          <p>
            <strong>Project:</strong> {review[2]}
          </p>

          <p className="mt-2">
            {review[4]}
          </p>

          <p className="mt-2">
            — {review[1]}
          </p>

        </div>

      ))}

    </div>

  );

}