import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/">
            <h1>Genify</h1>
          </Link>
        </div>

        <button className={styles.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ""}`}
        >
          <Link to="/" className={styles.navLink} onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/generate" className={styles.navLink} onClick={toggleMenu}>
            Generate Files
          </Link>
          <Link to="/history" className={styles.navLink} onClick={toggleMenu}>
            History
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
