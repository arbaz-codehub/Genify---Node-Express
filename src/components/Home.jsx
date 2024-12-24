import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FaRocket, FaHistory, FaMagic, FaArrowRight } from "react-icons/fa";

function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Transform Your <span className={styles.highlight}>Development</span>{" "}
          Workflow
        </h1>
        <p className={styles.subtitle}>
          Harness the power of AI to streamline your project file generation and
          management. Build faster, smarter, and more efficiently than ever
          before.
        </p>
        <Link to="/generate" className={styles.ctaButton}>
          Get Started <FaArrowRight className={styles.ctaIcon} />
        </Link>
      </section>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.iconWrapper}>
            <FaRocket className={styles.featureIcon} />
          </div>
          <h2 className={styles.featureTitle}>Lightning-Fast Generation</h2>
          <p className={styles.featureDescription}>
            Create project files in seconds with our advanced AI engine. Say
            goodbye to repetitive file creation tasks.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.iconWrapper}>
            <FaHistory className={styles.featureIcon} />
          </div>
          <h2 className={styles.featureTitle}>Seamless History Tracking</h2>
          <p className={styles.featureDescription}>
            Access your complete generation history with a single click. Never
            lose track of your created files again.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.iconWrapper}>
            <FaMagic className={styles.featureIcon} />
          </div>
          <h2 className={styles.featureTitle}>Intelligent Templates</h2>
          <p className={styles.featureDescription}>
            Experience dynamic templates that evolve with your needs. Let AI
            understand and adapt to your project requirements.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
