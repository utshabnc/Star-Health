import { ChangeEventHandler, MouseEventHandler } from 'react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

interface Review {
  reviewText: string;
  reviewStars: number;
  onSubmitReview: MouseEventHandler<HTMLButtonElement>;
  setReviewText: ChangeEventHandler<HTMLTextAreaElement>;
  setReviewStars: (newRating: number) => void;
}

function ReviewForm(review: Review) {
  return (
    <>
      <div className='flex flex-col px-8'>
        <p className='text-purp-4 text-xl font-semibold align'>Write a Review</p>
        <ReactStars
          value={review.reviewStars}
          count={5}
          activeColor='#ffd700'
          size={24}
          onChange={review.setReviewStars}
        />
        <textarea
          className='pl-3 shadow-lg mt-5 text-gray-800 py-2 border-purp-2 rounded-md focus:ring
focus:ring-purp-4 ring-purp-2 ring focus:ring-offset-2 appearance-none resize-none'
          placeholder=''
          value={review.reviewText}
          onChange={review.setReviewText}
        />
        {/* <label className='pb-2 pt-5 text-base text-purp-4 font-medium'>
          Stars: (Maximum = 5 Stars)
        </label> */}

        <button
          className='bg-purp-2 hover:bg-purp-3 active:bg-purp-4 text-white px-2 py-2 mt-4 rounded-md'
          onClick={review.onSubmitReview}
        >
          Submit Review
        </button>
      </div>
    </>
  );
}

export default ReviewForm;
