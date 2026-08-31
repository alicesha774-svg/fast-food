import { useState } from "react";
import type { FoodItem } from "../cart/lib/food-api";

export default function FoodCardComponent({ food }: { food: FoodItem }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="food-card">
      <div className="food-image-wrapper">
        {food.image_url ? (
          <img src={food.image_url} alt={food.name} loading="lazy" />
        ) : (
          <div className="food-image-placeholder" aria-hidden="true">
            🍽️
          </div>
        )}
        <span className="food-category">{food.cuisine}</span>
      </div>
      <div className="food-content">
        <div className="food-title">
          <h3>{food.name}</h3>
          <strong>${food.price.toFixed(2)}</strong>
        </div>
        <p>{food.description}</p>
        <button
          className="order-button"
          type="button"
          onClick={() => setIsFavorite((favorite) => !favorite)}
        >
          {isFavorite ? "Saved" : "Save favorite"}
        </button>
      </div>
    </article>
  );
}
