import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="container not-found-content">
        <p className="section-label">404 ERROR</p>
        <h1>That page is off the menu.</h1>
        <p>
          The page you requested does not exist. Let&apos;s get you back to
          something delicious.
        </p>
        <Link className="primary-button inline-button" to="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
