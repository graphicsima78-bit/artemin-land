# آرتمین لند (Artemin Land)

ساخت کارت ویزیت دیجیتال (QR / vCard) برای کسب‌وکارها و اشخاص. فارسی / English، قابل نصب به‌صورت PWA.

سایت: https://graphicsima78-bit.github.io/artminland

## ساختار فایل‌ها

```
artminland/
├── index.html              صفحه اصلی (فرم + ساخت QR)
├── admin.html              پنل مدیریت (ورود با ایمیل/رمز Firebase)
├── manifest.json           تنظیمات PWA
├── sw.js                   Service Worker
├── firestore.rules         قوانین امنیتی (در کنسول Firebase paste می‌شود)
├── icon.png                آیکون اصلی (مربع، شفاف)
├── icon-192.png            آیکون PWA
├── icon-512.png            آیکون PWA
├── icon-maskable-512.png   آیکون PWA برای اندروید (با حاشیه امن)
└── icon-180.png            آیکون آیفون (پس‌زمینه مشکی)
```

## به‌روزرسانی سایت

1. فایل را در GitHub باز کن → مداد ✏️ → ویرایش → Commit
2. بعد از ۱–۲ دقیقه (Actions) سایت آپدیت می‌شود
3. اگر فایل‌های اصلی را عوض کردی، در `sw.js` شماره `CACHE_NAME` را یکی بالا ببر

## امنیت (مهم)

- `apiKey` فایربیس در کد عمومی بودنش مشکلی ندارد؛ امنیت واقعی با **Security Rules** است.
- `firestore.rules` را در Firebase Console → Firestore → Rules بگذار و `YOUR_ADMIN_UID` را عوض کن.
- ورود به `admin.html` از طریق Firebase Authentication (Email/Password) است، نه رمز داخل کد.

## ساختار داده (collection: customers)

name, phones[], title, description, address, category, type (business/personal),
registerGoogle, registerNeshan, hasPhoto, createdAt (ISO)
