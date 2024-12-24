import { useState, useEffect } from "react";
import styles from "./History.module.css";
import { FaFileAlt } from "react-icons/fa";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Get history from localStorage
    const savedHistory = localStorage.getItem("fileHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2>File Generation History</h2>
      <div className={styles.historyList}>
        {history.length === 0 ? (
          <p>No history found</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className={styles.historyItem}>
              <FaFileAlt className={styles.fileIcon} />
              <div className={styles.fileInfo}>
                <h3>{item.filename}</h3>
                <p>Generated on: {new Date(item.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
