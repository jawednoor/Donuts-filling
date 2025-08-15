# رفع الصور إلى GitHub

1- انتقل إلى مجلد المشروع:
```powershell
cd "D:\مواقع ويب\دونات وحشوة\موقع تعريفي\Donuts-filling\Donuts-filling"
```

2- تأكد أن المستودع مربوط بـ GitHub:
```powershell
git remote -v
```
إذا لم يظهر الرابط:
```powershell
git remote add origin https://github.com/jawednoor/Donuts-filling.git
```

3- أضف مجلد الصور للتتبع:
```powershell
git add img/
```

4- احفظ التغييرات:
```powershell
git commit -m "إضافة مجلد الصور img"
```

5- ارفع الملفات إلى GitHub:
```powershell
git push origin main
```
إذا ظهر خطأ أن الفرع master بدلاً من main:
```powershell
git push origin master
```
رابط صفحة INDEX http://127.0.0.1:3000/index.html



git status
git pull
git add . && git commit -m "تحديث جميع الملفات بعد التطوير الأخير" && git push
git add .; git commit -m "تحديث جميع الملفات بعد التطوير الأخير"; git push