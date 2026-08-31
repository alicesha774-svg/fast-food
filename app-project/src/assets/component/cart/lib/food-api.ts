export const API_BASE = "https://sombobaeb.cheat.casa";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  cuisine: string;
  meal_types: string[];
  ingredients: string[];
  preparation_time_minutes: number;
  image_url: string | null;
  available: boolean;
  calories: number | null;
  restaurant_id: string;
  average_rating: number | null;
  rating_count: number;
  created_at: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine_types: string[];
  phone: string;
  price_range: string;
  image_url: string | null;
  average_rating: number | null;
  rating_count: number;
  is_trending: boolean;
  food_items_count: number;
}

/**
 * Fetch food items from the Food Recommendation API.
 * Public endpoint — GET /food-items?skip=0&limit=100
 */
export async function fetchFoodItems(skip = 0, limit = 100): Promise<FoodItem[]> {
  const res = await fetch(`${API_BASE}/food-items?skip=${skip}&limit=${limit}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch food items (status ${res.status})`);
  }

  return res.json();
}

/** Fetch a single food item — GET /food-items/{food_id} */
export async function fetchFoodItem(foodId: string): Promise<FoodItem> {
  const res = await fetch(`${API_BASE}/food-items/${foodId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch food item ${foodId} (status ${res.status})`);
  }

  return res.json();
}

/** Fetch the restaurant a food item belongs to — GET /restaurants/{restaurant_id} */
export async function fetchRestaurant(restaurantId: string): Promise<Restaurant> {
  const res = await fetch(`${API_BASE}/restaurants/${restaurantId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch restaurant ${restaurantId} (status ${res.status})`);
  }

  return res.json();
}

/** Fetch restaurants — GET /restaurants?skip=0&limit=100 */
export async function fetchRestaurants(skip = 0, limit = 100): Promise<Restaurant[]> {
  const res = await fetch(`${API_BASE}/restaurants?skip=${skip}&limit=${limit}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch restaurants (status ${res.status})`);
  }

  return res.json();
}
