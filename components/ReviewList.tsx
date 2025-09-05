'use client';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Props {
  reviews: Review[];
}

const ReviewList = ({ reviews }: Props) => (
  <div className="bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-purple-900 dark:via-gray-900 dark:to-purple-900 shadow-lg rounded-2xl p-6">
    <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
      💬 Customer Reviews
    </h3>
    {Array.isArray(reviews) && reviews.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400 italic">No reviews yet.</p>
    ) : (
      <ul className="space-y-4">
        {reviews.map((review, idx) => (
          <li
            key={idx}
            className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-purple-700 dark:text-purple-200">
                {review.user}
              </span>
              <span className="text-yellow-500 text-lg">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">“{review.comment}”</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ReviewList;
