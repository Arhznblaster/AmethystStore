// Comprehensive External Data Server - Node.js (Express)
// Implements all ProfileStore features with optimized security

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "YOUR_SECURE_API_KEY";

app.use(express.json());

// In-memory data and session locks (replace with a database for production)
const playerData = {};
const sessionLocks = {};

// Authentication middleware
function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.split(" ")[1] === API_KEY) {
        next();
    } else {
        res.status(403).json({ error: "Unauthorized" });
    }
}

// Get player profile
app.get("/api/profile/get", authenticate, (req, res) => {
    const playerId = req.query.playerId;
    if (!playerId) return res.status(400).json({ error: "Missing playerId" });

    const data = playerData[playerId] || {};
    res.json({ playerId, data });
});

// Set player profile
app.post("/api/profile/set", authenticate, (req, res) => {
    const { playerId, data } = req.body;
    if (!playerId || !data) return res.status(400).json({ error: "Invalid request" });

    playerData[playerId] = data;
    res.json({ message: "Profile saved successfully" });
});

// Lock player profile for exclusive access
app.post("/api/profile/lock", authenticate, (req, res) => {
    const playerId = req.body.playerId;
    if (!playerId) return res.status(400).json({ error: "Missing playerId" });

    if (sessionLocks[playerId]) return res.status(423).json({ error: "Profile already locked" });

    sessionLocks[playerId] = true;
    res.json({ message: "Profile locked" });
});

// Release profile lock
app.post("/api/profile/unlock", authenticate, (req, res) => {
    const playerId = req.body.playerId;
    if (!playerId) return res.status(400).json({ error: "Missing playerId" });

    sessionLocks[playerId] = false;
    res.json({ message: "Profile unlocked" });
});

// Update metadata
app.post("/api/profile/metadata", authenticate, (req, res) => {
    const { playerId, metadata } = req.body;
    if (!playerId || !metadata) return res.status(400).json({ error: "Invalid request" });

    playerData[playerId] = { ...playerData[playerId], metadata };
    res.json({ message: "Metadata updated" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
