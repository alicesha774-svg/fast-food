import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  API_BASE,
  fetchFoodItems,
  type FoodItem,
} from "../assets/component/cart/lib/food-api";

type RequestState = "loading" | "success" | "error";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function formatRating(rating: number | null) {
  return rating == null ? "—" : `${rating.toFixed(1)} / 5`;
}

function ErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="api-message error-message" role="alert">
      <strong>We couldn&apos;t load the food data.</strong>
      <p>Check your connection and try again.</p>
      <button className="primary-button" type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export default function ProductPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [requestState, setRequestState] = useState<RequestState>("loading");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    async function loadFoods() {
      setRequestState("loading");

      try {
        const data = await fetchFoodItems(0, 100);

        if (isCurrent) {
          setFoods(data);
          setRequestState("success");
        }
      } catch {
        if (isCurrent) {
          setRequestState("error");
        }
      }
    }

    void loadFoods();

    return () => {
      isCurrent = false;
    };
  }, [retryKey]);

  return (
    <section className="data-page">
      <div className="container">
        <div className="page-header">
          <p>LIVE FOOD DATA</p>
          <h1>Food Data Table</h1>
          <span>
            This table is loaded from the food service API. Select a food to
            view its full details.
          </span>
        </div>

        {requestState === "loading" && (
          <div className="api-message" role="status" aria-live="polite">
            Loading food data…
          </div>
        )}

        {requestState === "error" && (
          <ErrorMessage onRetry={() => setRetryKey((key) => key + 1)} />
        )}

        {requestState === "success" && foods.length === 0 && (
          <div className="api-message">No food items were returned.</div>
        )}

        {requestState === "success" && foods.length > 0 && (
          <div className="table-card">
            <div className="table-scroll">
              <table className="food-table">
                <caption className="sr-only">Food items from the API</caption>
                <thead>
                  <tr>
                    <th scope="col">Food</th>
                    <th scope="col">Cuisine</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Availability</th>
                    <th scope="col">
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food.id}>
                      <td>
                        <div className="table-food-name">
                          {food.image_url ? (
                            <img src={food.image_url} alt="" loading="lazy" />
                          ) : (
                            <span className="table-food-placeholder" aria-hidden="true">
                              🍽️
                            </span>
                          )}
                          <span>{food.name}</span>
                        </div>
                      </td>
                      <td>{food.cuisine}</td>
                      <td>{food.category}</td>
                      <td>{formatPrice(food.price)}</td>
                      <td>{formatRating(food.average_rating)}</td>
                      <td>{food.available ? "Available" : "Sold out"}</td>
                      <td>
                        <Link
                          className="table-link"
                          to={`/foods/${encodeURIComponent(food.id)}`}
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function FoodDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<FoodItem | null>(null);
  const [requestState, setRequestState] = useState<RequestState>("loading");

  useEffect(() => {
    let isCurrent = true;

    async function loadFood() {
      if (!id) {
        setRequestState("error");
        return;
      }

      setRequestState("loading");

      try {
        const response = await fetch(
          `${API_BASE}/food-items/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          if (isCurrent) {
            setFood(null);
            setRequestState("success");
          }
          return;
        }

        if (!response.ok) {
          throw new Error(`Food API returned ${response.status}`);
        }

        const data = (await response.json()) as FoodItem;

        if (isCurrent) {
          setFood(data);
          setRequestState("success");
        }
      } catch {
        if (isCurrent) {
          setRequestState("error");
        }
      }
    }

    void loadFood();

    return () => {
      isCurrent = false;
    };
  }, [id]);

  return (
    <section className="detail-page">
      <div className="container">
        {requestState === "loading" && (
          <div className="api-message" role="status" aria-live="polite">
            Loading food details…
          </div>
        )}

        {requestState === "error" && (
          <div className="api-message error-message" role="alert">
            <strong>We couldn&apos;t load this food.</strong>
            <p>Try the food table again or check your connection.</p>
            <Link className="primary-button inline-button" to="/foods">
              Back to food data
            </Link>
          </div>
        )}

        {requestState === "success" && !food && (
          <div className="api-message error-message" role="alert">
            <strong>Food not found</strong>
            <p>That food item does not exist.</p>
            <Link className="primary-button inline-button" to="/foods">
              Back to food data
            </Link>
          </div>
        )}

        {requestState === "success" && food && (
          <article className="food-detail-card">
            <div className="food-detail-image">
              {food.image_url ? (
                <img src={food.image_url} alt={food.name} />
              ) : (
                <span className="food-detail-placeholder" aria-hidden="true">
                  🍽️
                </span>
              )}
            </div>
            <div className="food-detail-content">
              <p className="section-label">{food.cuisine}</p>
              <h1>{food.name}</h1>
              <p className="food-detail-price">{formatPrice(food.price)}</p>
              <p className="food-detail-description">{food.description}</p>
              <dl className="food-detail-meta">
                <div>
                  <dt>Category</dt>
                  <dd>{food.category}</dd>
                </div>
                <div>
                  <dt>Preparation</dt>
                  <dd>{food.preparation_time_minutes} minutes</dd>
                </div>
                <div>
                  <dt>Rating</dt>
                  <dd>{formatRating(food.average_rating)}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{food.available ? "Available" : "Sold out"}</dd>
                </div>
              </dl>
              {food.ingredients.length > 0 && (
                <p className="food-detail-ingredients">
                  <strong>Ingredients:</strong> {food.ingredients.join(", ")}
                </p>
              )}
              <Link className="primary-button inline-button" to="/foods">
                Back to food data
              </Link>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
