// import Box from "@mui/material/Box";
// import Rating from "@mui/material/Rating";
// import { useDispatch, useSelector } from "react-redux";
// import { createRating, getProductRating } from "../../../State/Ratings/Action";
// import { useEffect, useState } from "react";

// export default function BasicRating({ pid }) {
//   const dispatch = useDispatch();
//   const ratings = useSelector((state) => state.ratings);
//   const initialAverageRating =
//     ratings?.ratings?.reduce(
//       (totalRating, currRating) => totalRating + currRating.rating,
//       0
//     ) / (ratings.ratings.length || 1);
//   const [value, setValue] = useState(initialAverageRating);

//   // Only one review should be given. Subsequent clicks will update the current review.

//   useEffect(() => {
//     dispatch(getProductRating(pid));
//   }, [dispatch, pid]);

//   useEffect(() => {
//     const averageRating =
//       ratings?.ratings?.reduce(
//         (totalRating, currRating) => totalRating + currRating.rating,
//         0
//       ) / (ratings?.ratings?.length || 1);

//     setValue(averageRating);
//   }, [ratings]);

//   const handleRatingChange = (newValue) => {
//     const reqData = {
//       pid: pid,
//       rating: newValue,
//     };
//     dispatch(createRating(reqData));
//   };

//   return (
//     <Box
//       sx={{
//         "& > legend": { mt: 2 },
//       }}
//     >
//       <Rating
//         name="half-rating"
//         precision={0.25}
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//           handleRatingChange(newValue);
//         }}
//       />
//     </Box>
//   );
// }

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getProductRating, createRating } from "../../../State/Ratings/Action";
import { useEffect, useState } from "react";

export default function BasicRating({ pid }) {
  const [value, setValue] = useState(0);
  const [userHasSelected, setUserHasSelected] = useState(false);

  const ratings = useSelector((state) => state.ratings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductRating(pid));
  }, [dispatch, pid]);

  useEffect(() => {
    if (!userHasSelected) {
      const averageRating =
        ratings?.ratings?.reduce(
          (totalRating, currRating) => totalRating + currRating.rating,
          0
        ) / (ratings?.ratings?.length || 1);

      setValue(averageRating);
    }
  }, [ratings, userHasSelected]);

  const handleRatingChange = (newValue) => {
    const reqData = {
      pid: pid,
      rating: newValue,
    };
    dispatch(createRating(reqData));
    setUserHasSelected(true);
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="half-rating"
        precision={0.25}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleRatingChange(newValue);
        }}
      />
      <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
        {ratings.ratings.length} reviews
      </span>
    </Box>
  );
}
