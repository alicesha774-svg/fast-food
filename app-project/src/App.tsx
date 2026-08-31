import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ProductPage, { FoodDetailPage } from "./pages/ProductPage";
import "./App.css";

type Page = "home" | "menu" | "about";

type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

const foods: FoodItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty, fresh lettuce, tomato, cheese and our special sauce.",
    price: "$8.99",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Double Cheese Burger",
    description: "Two delicious beef patties loaded with melted cheese.",
    price: "$11.99",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Crispy Chicken",
    description: "Golden crispy chicken with fresh vegetables and creamy sauce.",
    price: "$9.49",
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "French Fries",
    description: "Crispy golden fries served hot and perfectly seasoned.",
    price: "$4.99",
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Pepperoni Pizza",
    description: "Freshly baked pizza topped with cheese and pepperoni.",
    price: "$12.99",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Cold Cola",
    description: "Refreshing cold drink, perfect with your favorite meal.",
    price: "$2.99",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = ["All", "Burgers", "Chicken", "Pizza", "Sides", "Drinks"];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

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
  filteredFoods: FoodItem[];
  navigate: (path: string) => void;
};

function MenuPage({
  selectedCategory,
  setSelectedCategory,
  filteredFoods,
  navigate,
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

        <div className="food-grid">
          {filteredFoods.map((food) => (
            <article className="food-card" key={food.id}>
              <div className="food-image-wrapper">
                <img src={food.image} alt={food.name} />
                <span className="food-category">{food.category}</span>
              </div>

              <div className="food-content">
                <div className="food-title">
                  <h3>{food.name}</h3>
                  <strong>{food.price}</strong>
                </div>

                <p>{food.description}</p>

                <button
                  className="order-button"
                  type="button"
                  onClick={() => navigate("/foods")}
                >
                  View Food Data
                </button>
              </div>
            </article>
          ))}
        </div>
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
