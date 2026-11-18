import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <header className="header">
        <a className="logo" href="#home">Health Nest</a>
        <nav aria-label="Main navigation">
          <a href="/prescriptions">Details</a>
          <a href="#about">About</a>
        </nav>
        <a className="button" href="/shop">Add Medicine</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div>
            <p className="eyebrow">A little care, delivered</p>
            <h1>Health Nest</h1>
            <p>Looking after yourself can be simple. Find everyday health products and friendly prescription support in one place.</p>
            <a className="button" href="/shop">Explore the shop</a>
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
            <p>Visit our prescription area to find the help you need.</p>
          </div>
          <a className="button button-light" href="/prescriptions">Prescription support</a>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Health Nest. Your health, our priority.</p>
        <p>Always follow your pharmacist's or doctor's advice.</p>
      </footer>
    </div>
  );
}