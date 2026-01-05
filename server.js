import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", true);

app.post("/lookup-ip", async (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: "IP не указан" });

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});
