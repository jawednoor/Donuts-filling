// أضف هذا الكود إلى ملف server.js أو في ملف منفصل مع ربطه بـ Express
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express(); // إذا كان لديك app جاهز تجاهل هذا السطر

// إعداد التخزين الديناميكي حسب target
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let target = req.body.target || 'img';
    // حماية: اسم المجلد فقط
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

// مسار رفع الملفات
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
  res.json({ success: true, filename: req.file.filename });
});

// إذا كان لديك app.listen(...) في مكان آخر احذف السطر التالي
// app.listen(3000, () => console.log('Upload server running...'));

// ملاحظة: تأكد أن لديك body-parser أو express.json() مفعّل في السيرفر لباقي المسارات
