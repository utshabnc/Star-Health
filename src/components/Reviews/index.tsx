// @ts-ignore
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

interface Review {
  // user: string;
  rating: number;
  text: string;
  createdAt: Date;
}

type Props = {
  reviews: Review[];
};
const Reviews = ({ reviews }: Props) => {
  return (
    <>
      <div className=' py-4 px-8 flex flex-col h-full'>
        <div style={{ height: '500px' }} className='overflow-auto p-2 shadow-md rounded-md'>
          {reviews.map((data) => (
            <div className='bg-white ring-2 ring-purp-3 rounded-lg px-3 py-2 my-4 mx-1 justify-center'>
              <>
                {/* <div className='flex flex-row'>
                  <label>User: </label>
                  <p>&nbsp;{data.user}</p>
                </div> */}
                <p>{new Date(data.createdAt).toLocaleDateString()}</p>

                <div className='flex flex-row'>
                  <ReactStars
                    edit={false}
                    value={data.rating}
                    count={5}
                    activeColor='#ffd700'
                    size={24}
                  />
                </div>

                <div className='flex flex-col'>
                  <p>{data.text}</p>
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
