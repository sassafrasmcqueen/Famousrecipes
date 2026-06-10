import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;
const purchasesFile = '/home/team/shared/waitlist.json';

app.use(cors());
app.use(express.json());

app.post('/api/purchase', (req, res) => {
  const { recipeTitle, email, price } = req.body;
  
  if (!recipeTitle || !email || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const purchase = {
    timestamp: new Date().toISOString(),
    recipeTitle,
    email,
    price
  };

  let purchases = [];
  try {
    if (fs.existsSync(purchasesFile)) {
      const data = fs.readFileSync(purchasesFile, 'utf8');
      purchases = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading purchases file:', err);
  }

  purchases.push(purchase);

  try {
    fs.writeFileSync(purchasesFile, JSON.stringify(purchases, null, 2));
    console.log(`Purchase logged: ${recipeTitle} by ${email}`);
    res.json({ success: true, message: 'Purchase logged successfully' });
  } catch (err) {
    console.error('Error writing purchases file:', err);
    res.status(500).json({ error: 'Failed to log purchase' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Simulated checkout server listening at http://0.0.0.0:${port}`);
});
