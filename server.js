import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./supabaseClient.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Fetch all gadgets
app.get("/api/gadgets", async (req, res) => {
  const { data, error } = await supabase.from("gadgets").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add a gadget
app.post("/api/gadgets", async (req, res) => {
  const { name, price } = req.body;
  const { data, error } = await supabase
    .from("gadgets")
    .insert([{ name, price }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
