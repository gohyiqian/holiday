const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();

const upload = multer({ dest: "uploads/" });

// Serve static files
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

// Endpoint to upload images
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Simulate returning a URL for the uploaded image
  const imageUrl = `http://localhost:3000/uploads/${file.filename}`;
  res.json({ url: imageUrl });
});

// Endpoint to save updated itinerary JSON
app.post("/save-itinerary", (req, res) => {
  const updatedData = req.body;

  fs.writeFileSync(
    "public/itinerary.json",
    JSON.stringify(updatedData, null, 2)
  );
  res.json({ message: "Itinerary updated successfully!" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
