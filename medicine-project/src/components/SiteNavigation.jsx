import { Link } from "react-router-dom";
import "./HomePage.css";

export default function SiteNavigation() {
  return (
    <header className="header">
      <Link className="logo" to="/">Health Nest</Link>
      <nav aria-label="Main navigation">
        <Link to="/#home">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/shop">Shop</Link>
      </nav>
      <Link className="button" to="/add-medicine">Add Medicine</Link>
    </header>
  );
}
