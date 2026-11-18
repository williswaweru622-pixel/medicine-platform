import "./HomePage.css";
import { Link } from "react-router-dom";
import SiteNavigation from "./SiteNavigation.jsx";

export default function HomePage() {
  return (
    <div className="homepage">
      <SiteNavigation />

      <main>
        <section className="hero" id="home">
          <div>
            <p className="eyebrow">A little care, delivered</p>
            <h1>Health Nest</h1>
            <p>Looking after yourself can be simple. Find everyday health products and friendly prescription support in one place.</p>
            <Link className="button" to="/shop">Explore the shop</Link>
          </div>
          <div className="hero-mark" aria-hidden="true">+</div>
        </section>

        <section className="benefits" id="about">
          <h2>Here to help</h2>
          <ul>
            <li>Friendly support when you need a hand.</li>
            <li>Simple ways to find what you need.</li>
            <li>A welcoming team ready to help.</li>
          </ul>
        </section>

        <section className="prescriptions" id="prescriptions">
          <div>
            <h2>Need prescription support?</h2>
            <p>Search our catalog to find the medicine you need.</p>
          </div>
          <Link className="button button-light" to="/search">Search medicines</Link>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Health Nest. Your health, our priority.</p>
        <p>Always follow your pharmacist's or doctor's advice.</p>
      </footer>
    </div>
  );
}