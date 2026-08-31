import { use } from "react";
import type { FoodItem } from "../cart/lib/food-api";
import FoodCardComponent from "./FoodCardComponent";

interface FoodListProps {
  foodPromise: Promise<FoodItem[]>;
}

export default function FoodCardListComponent({ foodPromise }: FoodListProps) {
  const foods = use(foodPromise);

  if (!foods.length) {
    return <div className="api-message">No food items found.</div>;
  }

  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodCardComponent key={food.id} food={food} />
      ))}
    </div>
  );
}
