import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;
const purchasesFile = '/home/team/shared/waitlist.json';
const membershipFile = '/home/team/shared/membership_signups.json';
const bundlesFile = '/home/team/shared/bundle_purchases.json';

app.use(cors());
app.use(express.json());

app.post('/api/bundle', (req, res) => {
  const { category, email, price } = req.body;
  
  if (!category || !email || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const bundlePurchase = {
    timestamp: new Date().toISOString(),
    category,
    email,
    price
  };

  let bundlePurchases = [];
  try {
    if (fs.existsSync(bundlesFile)) {
      const data = fs.readFileSync(bundlesFile, 'utf8');
      bundlePurchases = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading bundle purchases file:', err);
  }

  bundlePurchases.push(bundlePurchase);

  try {
    fs.writeFileSync(bundlesFile, JSON.stringify(bundlePurchases, null, 2));
    console.log(`Bundle purchase logged: ${category} by ${email}`);
    res.json({ success: true, message: 'Bundle purchase logged successfully' });
  } catch (err) {
    console.error('Error writing bundle purchases file:', err);
    res.status(500).json({ error: 'Failed to log bundle purchase' });
  }
});

app.post('/api/membership', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const signup = {
    timestamp: new Date().toISOString(),
    email
  };

  let signups = [];
  try {
    if (fs.existsSync(membershipFile)) {
      const data = fs.readFileSync(membershipFile, 'utf8');
      signups = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading membership file:', err);
  }

  signups.push(signup);

  try {
    fs.writeFileSync(membershipFile, JSON.stringify(signups, null, 2));
    console.log(`Membership signup logged: ${email}`);
    res.json({ success: true, message: 'Membership signup logged successfully' });
  } catch (err) {
    console.error('Error writing membership file:', err);
    res.status(500).json({ error: 'Failed to log membership signup' });
  }
});

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
