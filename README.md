# 🎭 Mood Tracker

Modern ve kullanıcı dostu bir ruh hali takip uygulaması. Günlük ruh halinizi kaydedin, istatistiklerinizi görüntüleyin ve duygusal yolculuğunuzu takip edin.

🌐 **Live Demo**: [https://mood-tracker-wheat.vercel.app/](https://mood-tracker-wheat.vercel.app/)

![Mood Tracker](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase)

## ✨ Özellikler

- 🔐 **Güvenli Giriş**: Email/şifre ile kimlik doğrulama
- 📅 **Günlük Takip**: 8 farklı ruh hali seçeneği
- 📊 **İstatistikler**: Pie chart ile mood analizi
- 🗓️ **Takvim**: Geçmiş kayıtları görüntüleme
- 💭 **Notlar**: Her kayıt için açıklama ekleme
- 📱 **Responsive**: Tüm cihazlarda uyumlu

## 🛠️ Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend & Database
- **Chart.js** - Data visualization
- **Framer Motion** - Animations

## 🚀 Kurulum

### 1. Projeyi klonlayın
```bash
git clone https://github.com/your-username/mood-tracker.git
cd mood-tracker
```

### 2. Bağımlılıkları yükleyin
```bash
npm install
```

### 3. Environment variables
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Development server
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresini açın.

## 🎨 Mood Seçenekleri

- 😊 **Happy** - Mutlu
- 😢 **Sad** - Üzgün  
- 😠 **Angry** - Kızgın
- 😐 **Neutral** - Nötr
- 😌 **Calm** - Sakin
- 😍 **Lover** - Aşık
- 😰 **Anxious** - Endişeli
- 😴 **Tired** - Yorgun

## 📱 Kullanım

1. **Kayıt Ol/Giriş Yap**: Email ile hesap oluştur
2. **Mood Kaydet**: Günlük ruh halini seç ve kaydet
3. **İstatistikleri Gör**: Mood dağılımını analiz et
4. **Geçmişi İncele**: Takvimden eski kayıtları görüntüle

## 🚀 Deployment

Proje [Vercel](https://vercel.com) üzerinde deploy edilmiştir.

**Live URL**: [https://mood-tracker-wheat.vercel.app/](https://mood-tracker-wheat.vercel.app/)

---

Bu proje modern web development teknolojilerini öğrenmek için ideal bir örnektir.