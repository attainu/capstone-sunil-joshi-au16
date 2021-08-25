import React from "react";
import propTypes from "prop-types";
import {FaStar ,FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
       >  {
          value >= 1
            ? <FaStar/>
            : value >= 0.5
            ? <FaStarHalfAlt/>
            : <FaStar/>
        }</i>
      </span>

      <span>
        <i
          style={{ color }}
         
        > {
          value >= 2
            ? <FaStar/>
            : value >= 1.5
            ?<FaStarHalfAlt/>
            : <FaStar/>
        }</i>
      </span>

      <span>
        <i
          style={{ color }}
         
        > {
          value >= 3
            ?<FaStar/>
            : value >= 2.5
            ?<FaStarHalfAlt/>
            :<FaStar/>
        }</i>
      </span>

      <span>
        <i
          style={{ color }}
         
        > {
          value >= 4
            ? <FaStar/>
            : value >= 3.5
            ? <FaStarHalfAlt/>
            : <FaStar/>
        }</i>
      </span>

      <span>
        <i
          style={{ color }}
      
        >  {
          value >= 5
            ?<FaStar/>
            : value >= 4.5
            ? <FaStarHalfAlt/>
            :<FaStar/>
        }</i>
      </span>

      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "orange",
};

Rating.propTypes = {
  value: propTypes.number.isRequired,
  text: propTypes.string.isRequired,
  color: propTypes.string,
};

export default Rating;
