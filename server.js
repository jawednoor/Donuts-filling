
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5500;

app.use(express.static(__dirname));
app.use(express.json());

// قراءة المنتجات
app.get('/products.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.json'));
});

// قراءة intro.json
app.get('/intro.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'intro.json'));
});

// حفظ intro.json
app.post('/intro.json', (req, res) => {
  fs.writeFile(path.join(__dirname, 'intro.json'), JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({error: 'خطأ في الحفظ'});
    res.json({success: true});
  });
});

// حفظ المنتجات
app.post('/products.json', (req, res) => {
  fs.writeFile(path.join(__dirname, 'products.json'), JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({error: 'خطأ في الحفظ'});
    res.json({success: true});
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
