# 🎭 Mood Tracker

Modern ve kullanıcı dostu bir ruh hali takip uygulaması. Günlük ruh halinizi kaydedin, istatistiklerinizi görüntüleyin ve duygusal yolculuğunuzu takip edin.

![Mood Tracker](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Özellikler

- 🔐 **Güvenli Kimlik Doğrulama**: Supabase Auth ile email/şifre girişi
- 📅 **Günlük Mood Takibi**: 8 farklı ruh hali seçeneği ile günlük kayıt
- 📊 **İstatistik Görüntüleme**: Pie chart ile mood dağılımı analizi
- 🗓️ **Takvim Entegrasyonu**: Geçmiş kayıtları takvim üzerinden görüntüleme
- 💭 **Not Ekleme**: Her mood kaydı için açıklama ekleme özelliği
- 🌓 **Dark/Light Mode**: Kullanıcı tercihine göre tema değiştirme
- 📱 **Responsive Tasarım**: Tüm cihazlarda uyumlu görüntüleme
- ⚡ **Real-time Updates**: Anlık veri güncelleme

## 🛠️ Teknoloji Stack'i

### Frontend
- **Next.js 15** - App Router ile modern React framework
- **React 19** - En güncel React sürümü
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Chakra UI** - Modern React component library
- **Material-UI** - Icons ve ek UI bileşenleri

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Güçlü ilişkisel veritabanı
- **Supabase Auth** - Kimlik doğrulama sistemi
- **Row Level Security** - Veri güvenliği

### State Management & Data
- **TanStack React Query** - Server state management
- **React Hooks** - Local state management
- **Server Actions** - Form handling

### Data Visualization
- **Chart.js** - İnteraktif grafikler
- **React-Chartjs-2** - React Chart.js wrapper
- **Recharts** - Declarative charting library
- **React Calendar** - Takvim bileşeni

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast development server

## 🚀 Kurulum

### Ön Gereksinimler
- Node.js 18.17 veya üzeri
- npm, yarn, pnpm veya bun
- Supabase hesabı

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/your-username/mood-tracker.git
cd mood-tracker
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Environment Variables
`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Supabase Setup

#### Database Schema
Supabase'de aşağıdaki tabloyu oluşturun:

```sql
-- Moods tablosu
create table public.moods (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  mood text not null,
  mood_img text not null,
  mood_desc text,
  mood_date text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, mood_date)
);

-- Row Level Security (RLS) aktif et
alter table public.moods enable row level security;

-- RLS Policy: Kullanıcılar sadece kendi verilerini görebilir
create policy "Users can view own moods" on public.moods
  for select using (auth.uid() = user_id);

create policy "Users can insert own moods" on public.moods
  for insert with check (auth.uid() = user_id);

create policy "Users can update own moods" on public.moods
  for update using (auth.uid() = user_id);
```

### 5. Development Server'ı Başlatın
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📱 Kullanım

### 1. Hesap Oluşturma/Giriş
- `/register` sayfasından yeni hesap oluşturun
- Email doğrulaması yapın
- `/login` sayfasından giriş yapın

### 2. Mood Kaydetme
- Dashboard'da günlük ruh halinizi seçin
- İsteğe bağlı olarak açıklama ekleyin
- "Save Mood" butonuna tıklayın

### 3. İstatistikleri Görüntüleme
- `/statistics` sayfasından mood dağılımınızı görüntüleyin
- Pie chart ile görsel analiz yapın

### 4. Geçmiş Kayıtlar
- Sidebar'daki takvimi kullanarak geçmiş kayıtları görüntüleyin
- Belirli bir tarihi seçerek o günün mood'unu görün

## 🎨 Mood Seçenekleri

Uygulama 8 farklı ruh hali seçeneği sunar:

- 😊 **Happy** - Mutlu
- 😢 **Sad** - Üzgün
- 😠 **Angry** - Kızgın
- 😐 **Neutral** - Nötr
- 😌 **Calm** - Sakin
- 😍 **Lover** - Aşık
- 😰 **Anxious** - Endişeli
- 😴 **Tired** - Yorgun

## 🏗️ Proje Yapısı

```
mood-tracker/
├── public/
│   ├── icons/          # Mood ikonları
│   └── JoeyTribbiani.png
├── src/
│   └── app/
│       ├── (auth)/     # Authentication sayfaları
│       ├── (dashboard)/ # Ana dashboard
│       ├── (statistics)/ # İstatistik sayfası
│       ├── actions/    # Server actions
│       ├── api/        # API routes
│       ├── components/ # React bileşenleri
│       ├── types/      # TypeScript type definitions
│       └── utils/      # Utility functions
├── utils/
│   └── supabase/       # Supabase configuration
└── _components/        # Shared components
```

## 🔧 Scripts

```bash
# Development server başlat
npm run dev

# Production build oluştur
npm run build

# Production server başlat
npm run start

# Linting yap
npm run lint
```

## 🚀 Deployment

### Vercel (Önerilen)
1. GitHub'a push edin
2. [Vercel](https://vercel.com)'e import edin
3. Environment variables'ları ekleyin
4. Deploy edin

### Diğer Platformlar
- **Netlify**: `npm run build` çıktısını deploy edin
- **Railway**: Git integration ile otomatik deploy
- **Heroku**: Buildpack ayarları ile deploy

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 License

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Chart.js](https://www.chartjs.org/) - Charting library
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 İletişim

Proje hakkında sorularınız için:
- GitHub Issues kullanın
- Email: your-email@example.com

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir ve modern web development teknolojilerini öğrenmek için ideal bir örnektir.