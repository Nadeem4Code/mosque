const jsonServer = require("json-server");
const express = require("express");
const path = require("path");

const apiServer = jsonServer.create(); // JSON Server instance
const apiRouter = jsonServer.router("./db.json");
const apiMiddlewares = jsonServer.defaults();

const frontendApp = express(); // Express app for serving frontend
const frontendBuildPath = path.join(__dirname, "../client/build");

// Serve API with JSON Server's middlewares
apiServer.use(apiMiddlewares);
apiServer.use(apiRouter);

// Serve static files from the frontend build
frontendApp.use(express.static(frontendBuildPath));

// Catch-all route to serve frontend app
frontendApp.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

const apiPort = 3001; // Port for JSON Server


apiServer.listen(apiPort, () => {
  console.log(`JSON Server is running on port ${apiPort}`);
});


