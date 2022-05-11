import React from 'react';

export default function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? 'text-warning fa-solid fa-star'
              : rating >= 0.5
              ? 'text-warning fa-solid fa-star-half-alt'
              : 'text-warning far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'text-warning fa-solid fa-star'
              : rating >= 1.5
              ? 'text-warning fa-solid fa-star-half-alt'
              : 'text-warning far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'text-warning fa-solid fa-star'
              : rating >= 2.5
              ? 'text-warning fa-solid fa-star-half-alt'
              : 'text-warning far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'text-warning fa-solid fa-star'
              : rating >= 3.5
              ? 'text-warning fa-solid fa-star-half-alt'
              : 'text-warning far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'text-warning fa-solid fa-star'
              : rating >= 4.5
              ? 'text-warning fa-solid fa-star-half-alt'
              : 'text-warning far fa-star'
          }
        ></i>
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{/* {numReviews + " reviews"} */}</span>
      )}
    </div>
  );
}
