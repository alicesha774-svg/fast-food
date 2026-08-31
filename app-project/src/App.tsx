import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ProductPage, { FoodDetailPage } from "./pages/ProductPage";
import {
  fetchFoodItems,
  type FoodItem as ApiFood,
} from "./assets/component/cart/lib/food-api";
import "./App.css";

type Page = "home" | "menu" | "about";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [foods, setFoods] = useState<ApiFood[]>([]);
  const [menuError, setMenuError] = useState(false);
  const location = useLocation();
  const routerNavigate = useNavigate();
  const { pathname } = location;
  const page: Page =
    pathname === "/menu" ? "menu" : pathname === "/about" ? "about" : "home";

  const navigate = (path: string) => {
    routerNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (pathname !== "/menu" || foods.length > 0 || menuError) {
      return;
    }

    let isCurrent = true;

    fetchFoodItems(0, 100)
      .then((data) => {
        if (isCurrent) {
          setFoods(data);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setMenuError(true);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [foods.length, menuError, pathname]);

  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);
  const categories = [
    "All",
    ...Array.from(new Set(foods.map((food) => food.category))),
  ];
  const menuLoading = pathname === "/menu" && foods.length === 0 && !menuError;

  return (
    <div className="app">
      <header className="navbar">
        <div className="container nav-container">
          <button
            className="logo"
            onClick={() => navigate("/")}
            aria-label="Go to home page"
          >
            <span className="logo-icon">🍔</span>
            Fast<span>Food</span>
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <nav className={mobileMenuOpen ? "nav-links open" : "nav-links"}>
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => navigate("/")}
            >
              Home
            </button>

            <button
              className={page === "menu" ? "active" : ""}
              onClick={() => navigate("/menu")}
            >
              Food Menu
            </button>

            <button
              className={page === "about" ? "active" : ""}
              onClick={() => navigate("/about")}
            >
              About Us
            </button>

            <button
              className={pathname.startsWith("/foods") ? "active" : ""}
              onClick={() => navigate("/foods")}
            >
              Food Data
            </button>
          </nav>
        </div>
      </header>

      <main>
        {pathname === "/foods" && <ProductPage />}

        {pathname.startsWith("/foods/") && <FoodDetailPage />}

        {pathname === "/" && <HomePage navigate={navigate} />}

        {page === "menu" && (
          <MenuPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredFoods={filteredFoods}
            navigate={navigate}
            categories={categories}
            loading={menuLoading}
            error={menuError}
            onRetry={() => {
              setFoods([]);
              setMenuError(false);
            }}
          />
        )}

        {page === "about" && <AboutPage />}
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>
            <h3>
              🍔 Fast<span>Food</span>
            </h3>
            <p>Fresh food. Fast service. Happy moments.</p>
          </div>

          <p>© {new Date().getFullYear()} FastFood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

type NavigationProps = {
  navigate: (path: string) => void;
};

function HomePage({ navigate }: NavigationProps) {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />

        <div className="container hero-content">
          <div className="hero-text">
            <p className="hero-label">🔥 THE BEST FAST FOOD IN TOWN</p>

            <h1>
              Delicious Food,
              <span> Delivered Fast.</span>
            </h1>

            <p className="hero-description">
              Enjoy fresh, tasty and satisfying meals made with quality
              ingredients. Your favorite food is only one click away.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() => navigate("/menu")}
              >
                Explore Menu →
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("/about")}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-heading">
            <p>WHY CHOOSE US</p>
            <h2>Fast Food Made Better</h2>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">🍅</div>
              <h3>Fresh Ingredients</h3>
              <p>
                We use carefully selected ingredients to make every meal fresh
                and delicious.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon"></div>
              <h3>Fast Service</h3>
              <p>
                Your food is prepared quickly so you can enjoy your favorite
                meal without waiting.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon"></div>
              <h3>Made With Love</h3>
              <p>
                Every meal is prepared with care, passion and a love for great
                food.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="popular-section">
        <div className="container">
          <div className="popular-banner">
            <div>
              <p>OUR MOST POPULAR MEAL</p>
              <h2>The Ultimate Burger Experience 🍔</h2>
              <span>
                Fresh ingredients, juicy meat and melted cheese in every bite.
              </span>

              <button
                className="primary-button"
                onClick={() => navigate("/menu")}
              >
                View Food Menu
              </button>
            </div>

            <div className="popular-emoji">🍔</div>
          </div>
        </div>
      </section>
    </>
  );
}

type MenuProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredFoods: ApiFood[];
  navigate: (path: string) => void;
  categories: string[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
};

function MenuPage({
  selectedCategory,
  setSelectedCategory,
  filteredFoods,
  navigate,
  categories,
  loading,
  error,
  onRetry,
}: MenuProps) {
  return (
    <section className="menu-page">
      <div className="container">
        <div className="page-header">
          <p>OUR DELICIOUS FOOD</p>
          <h1>Food Menu</h1>
          <span>
            Choose from our selection of delicious meals and refreshing drinks.
          </span>
        </div>

        {loading && (
          <div className="api-message" role="status" aria-live="polite">
            Loading the food menu…
          </div>
        )}

        {error && (
          <div className="api-message error-message" role="alert">
            <strong>We couldn&apos;t load the menu.</strong>
            <p>Check your connection and try again.</p>
            <button className="primary-button" type="button" onClick={onRetry}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category ? "category active-category" : "category"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          </div>
        )}

        {!loading && !error && filteredFoods.length === 0 && (
          <div className="api-message">No food items match this category.</div>
        )}

        {!loading && !error && filteredFoods.length > 0 && (
          <div className="food-grid">
          {filteredFoods.map((food) => (
            <article className="food-card" key={food.id}>
              <div className="food-image-wrapper">
                {food.image_url ? (
                  <img src={food.image_url} alt={food.name} loading="lazy" />
                ) : (
                  <div className="food-image-placeholder" aria-hidden="true">
                    🍽️
                  </div>
                )}
                <span className="food-category">{food.category}</span>
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
                  onClick={() => navigate(`/foods/${encodeURIComponent(food.id)}`)}
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <section className="about-page">
        <div className="container about-grid">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
              alt="Restaurant food preparation"
            />
          </div>

          <div className="about-content">
            <p className="section-label">អំពីយើង</p>

            <h1>Good Food Brings People Together.</h1>

            <p>
              FastFood was created with one simple idea: serve delicious food
              that makes people happy.
            </p>

            <p>
              We believe fast food can still be fresh, flavorful and prepared
              with quality ingredients. From juicy burgers to crispy chicken and
              tasty sides, every item is made to give you a satisfying
              experience.
            </p>

            <div className="about-stats">
              <div>
                <strong>10+</strong>
                <span>Food Choices</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Fresh Taste</span>
              </div>

              <div>
                <strong>Fast</strong>
                <span>Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="section-heading">
            <p>OUR VALUES</p>
            <h2>What We Believe In</h2>
          </div>

          <div className="mission-grid">
            <article>
              <div></div>
              <h3>Our Mission</h3>
              <p>
                To serve delicious and affordable food while providing a fast
                and enjoyable experience.
              </p>
            </article>

            <article>
              <div></div>
              <h3>Our Vision</h3>
              <p>
                To become a favorite destination for people who love simple,
                fresh and delicious fast food.
              </p>
            </article>

            <article>
              <div></div>
              <h3>Our Promise</h3>
              <p>
                Great taste, friendly service and quality food every time you
                visit us.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
