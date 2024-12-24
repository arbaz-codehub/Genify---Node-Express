const express = require("express");
const app = express();
const port = process.env.PORT || 5300;
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.post("/generate", (req, resp) => {
  try {
    const fileName = req.query.filename || "hello.txt";
    const content = JSON.stringify(req.body) || "";

    // Create generatedFiles directory if it doesn't exist
    if (!fs.existsSync("generatedFiles")) {
      fs.mkdirSync("generatedFiles");
    }

    const filePath = `generatedFiles/${fileName}`;

    fs.writeFileSync(filePath, content);

    // Important Headers for download
    resp.header("Content-Type", "text/plain"); // Uncommented this line
    resp.header("Content-Disposition", `attachment; filename=${fileName}`);

    const fileStream = fs.createReadStream(filePath);

    fileStream.on("error", (error) => {
      console.error("Error reading file:", error);
      resp.status(500).json({ error: "Error Reading File" });
    });

    fileStream.pipe(resp);
    // This line connects the file stream to the response stream
    // If we don't use pipe():
    // 1. We would need to manually read chunks from fileStream
    // 2. Handle 'data' events to write chunks to response
    // 3. Handle 'end' event to close response
    // Example without pipe:
    // fileStream.on('data', chunk => resp.write(chunk));
    // fileStream.on('end', () => resp.end());

    fileStream.on("end", () => {
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.log("Error:", err);
    resp.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log("Server is running at port", port));

// Example URLs for Postman:
// Local development:
// POST http://localhost:5300/generate?filename=myfile.txt
// Body (raw JSON):
// {
//   "key": "value",
//   "message": "Hello World"
// }
//
// If deployed:
// POST https://your-domain.com/generate?filename=myfile.txt
// With same JSON body
//
// Notes:
// - filename parameter is optional, defaults to hello.txt
// - Body should be JSON format with Content-Type: application/json header
// - Response will be a downloadable text file
