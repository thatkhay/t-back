const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/products", async (req, res) => {
  const { name, category, price, description, image_url } = req.body;
  const { data, error } = await supabase
    .from("products")
    .insert([{ name, category, price, description, image_url }]);

  if (error) return res.status(400).json(error);
  res.json(data);
});

app.get("/products", async (req, res) => {
  const category = req.query.category;
  let query = supabase.from("products").select("*");

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json(data);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ message: "Deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

