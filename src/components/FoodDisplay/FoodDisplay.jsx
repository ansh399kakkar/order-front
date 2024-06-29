import { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import PropTypes from 'prop-types';

const FoodDisplay = ({ category }) => {
  const { fetchFoodList, food_list = [] } = useContext(StoreContext); // Default to empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodItems = async () => {
      setLoading(true);
      await fetchFoodList();
      setLoading(false);
    };

    loadFoodItems();
  }, [fetchFoodList]);

  return (
    <div className="food-display" id="food-display">
      <h2>Best dishes in your vicinity</h2>
      <div className="food-display-list">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                );
              }
              return null;
            })}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
