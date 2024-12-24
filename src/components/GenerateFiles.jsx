import { useState } from "react";
import styles from "./GenerateFiles.module.css";
import { FaFileAlt, FaPaperPlane } from "react-icons/fa";

function GenerateFiles() {
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate that content is valid JSON before sending
      let contentToSend;
      try {
        // Try parsing as JSON first
        JSON.parse(content);
        contentToSend = content;
      } catch {
        // If not valid JSON, send as string
        contentToSend = content;
      }

      const response = await fetch(
        `https://genify.onrender.com/generate?filename=${encodeURIComponent(
          filename
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: contentToSend,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate file");
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = filename; // Set the filename for download

      // Append link to body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);

      // Add to history in localStorage
      const newHistoryItem = {
        filename: filename,
        timestamp: new Date().toISOString(),
      };

      const existingHistory = JSON.parse(
        localStorage.getItem("fileHistory") || "[]"
      );
      localStorage.setItem(
        "fileHistory",
        JSON.stringify([newHistoryItem, ...existingHistory])
      );

      // Reset form
      setFilename("");
      setContent("");
    } catch (error) {
      console.error("Error generating file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>
          Generate Files{" "}
          <FaFileAlt
            className={styles.titleIcon}
            style={{ color: "#646cff" }}
          />
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="filename">Filename (with extension)</label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g. index.html"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="content">File Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your file content here..."
              required
              className={styles.textarea}
              rows="10"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              "Generating..."
            ) : (
              <>
                Generate File <FaPaperPlane className={styles.buttonIcon} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GenerateFiles;

// Blob ek special data type hai jo binary data store karta hai
// Jaise ki images, PDFs, ya koi bhi file ka raw data
// Yahan pe response.blob() server se aaye hue file data ko blob format mein convert karta hai

// Example samajhne ke liye:
// Jaise WhatsApp pe photo/video aati hai, wo bhi blob ki tarah hi aati hai
// Blob matlab "Binary Large Object" - jo ki computer ke liye readable format hai

// const blob = await response.blob(); // Server se blob data lete hai

// Ab is blob ko browser ke through download karwane ke liye:
// const url = window.URL.createObjectURL(blob); // Blob ka temporary URL banate hai

// Download ke liye ek invisible link banate hai
// const link = document.createElement("a");
// link.href = url; // Link mein blob URL set karte hai
// link.download = filename; // User ke chosen filename se save hoga

// Link ko click karwate hai automatically
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);

// Memory clean up - temporary URL ko delete karte hai
// window.URL.revokeObjectURL(url);
