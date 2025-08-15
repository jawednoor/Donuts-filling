// --- دعم رفع الصور من السي بانل ---
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let target = req.body.target || 'img';
    if (!['img', 'assets/brand'].includes(target)) target = 'img';
    const dest = path.join(__dirname, target);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
  res.json({ success: true, filename: req.file.filename });
});
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// قراءة settings.json
app.get('/settings.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'settings.json'));
});

// حفظ settings.json
app.post('/settings.json', (req, res) => {
  fs.writeFile(path.join(__dirname, 'settings.json'), JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({error: 'خطأ في الحفظ'});
    res.json({success: true});
  });
});
// قراءة slides.json
app.get('/slides.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'slides.json'));
});

// حفظ slides.json
app.post('/slides.json', (req, res) => {
  fs.writeFile(path.join(__dirname, 'slides.json'), JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({error: 'خطأ في الحفظ'});
    res.json({success: true});
  });
});

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
