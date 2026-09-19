const express = require('express');
const cors = require('cors');
const path = require('path');
const dns = require('dns');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Ensure public DNS resolution for MongoDB Atlas SRV records on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://company:company@cluster0.2nwrn6k.mongodb.net/company?retryWrites=true&w=majority';
const DB_NAME = process.env.DB_NAME || 'company';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'love';

app.use(cors());
app.use(express.json());

// Serve static website files
app.use(express.static(path.join(__dirname)));

let dbClient = null;
let loveCollection = null;

// Connect to MongoDB Atlas with fallback
async function connectDB() {
  const uris = [
    process.env.MONGODB_URI || 'mongodb+srv://company:company@cluster0.2nwrn6k.mongodb.net/company?retryWrites=true&w=majority',
    'mongodb+srv://company:company@cluster0.2nwrn6k.mongodb.net/love?retryWrites=true&w=majority',
    process.env.MONGODB_DIRECT_URI
  ].filter(Boolean);

  for (const uri of uris) {
    try {
      dbClient = new MongoClient(uri, {
        family: 4,
        serverSelectionTimeoutMS: 5000
      });
      await dbClient.connect();
      const db = dbClient.db(DB_NAME);
      loveCollection = db.collection(COLLECTION_NAME);
      console.log(`[MongoDB] Successfully connected to Database "${DB_NAME}", Collection "${COLLECTION_NAME}"`);
      return;
    } catch (err) {
      console.warn(`[MongoDB Notice] Connection attempt failed (${err.message}). Retrying fallback...`);
    }
  }
  console.error('[MongoDB Error] All connection attempts failed.');
}
connectDB();

// API: Save Question Answer in 'love' Collection (Creates a new document with fresh timestamp on each save)
app.post('/api/save-answer', async (req, res) => {
  try {
    const { qid, question, answer, user } = req.body;
    if (!qid || !answer) {
      return res.status(400).json({ success: false, error: 'qid and answer are required' });
    }

    if (!loveCollection) {
      await connectDB();
    }
    if (!loveCollection) {
      return res.status(503).json({ success: false, error: 'Database connection not ready' });
    }

    const payload = {
      user: user || 'Shreya',
      qid: String(qid),
      question: question || `Q${qid}`,
      answer: String(answer).trim(),
      updatedAt: new Date()
    };

    // Insert a new document with new timestamp every time someone saves
    const result = await loveCollection.insertOne(payload);

    console.log(`[Database] Inserted new answer document for Q${qid} (${payload.user}): "${payload.answer}" (id: ${result.insertedId})`);
    return res.json({ success: true, message: 'Answer saved to DB layer "love"', insertedId: result.insertedId, doc: payload });
  } catch (error) {
    console.error('[API Error] save-answer failed:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// API: Retrieve Saved Answers from 'love' Collection (returns latest answer for each question)
app.get('/api/get-answers', async (req, res) => {
  try {
    if (!loveCollection) {
      await connectDB();
    }
    if (!loveCollection) {
      return res.status(503).json({ success: false, error: 'Database connection not ready' });
    }

    const user = req.query.user || 'Shreya';
    // Retrieve all documents for this user sorted by updatedAt descending (latest first)
    const docs = await loveCollection.find({ user }).sort({ updatedAt: -1 }).toArray();

    // Map latest answer for each question ID
    const latestMap = {};
    docs.forEach((d) => {
      if (d.qid && !latestMap[d.qid]) {
        latestMap[d.qid] = d;
      }
    });

    const latestAnswers = Object.values(latestMap).sort((a, b) => Number(a.qid) - Number(b.qid));
    return res.json({ success: true, user, answers: latestAnswers, totalEntries: docs.length });
  } catch (error) {
    console.error('[API Error] get-answers failed:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Level 19 Birthday Server running on port ${PORT}`);
});
