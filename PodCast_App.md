# 🎙️ Podcast App

A React application for discovering, streaming, and saving podcasts. Browse shows, play episodes, favourite episodes, and customize your theme.

**Live Demo:** [https://podcast-app-djs.vercel.app/](https://podcast-app-djs.vercel.app/)

---

## ✨ Features

- **🎵 Global Audio Player** - Play episodes while navigating the app; full playback controls
- **❤️ Favourites** - Save episodes and view on dedicated page, sorted A-Z or by date
- **🔍 Search & Filter** - Find podcasts by name and filter by genre
- **📊 Sort & Pagination** - Sort results and navigate through pages
- **🎠 Carousel** - Featured shows displayed in horizontal scrollable carousel
- **📺 Show Details** - View show info, seasons, and episodes with play buttons
- **🌙 Theme Toggle** - Switch between light and dark mode (saved to localStorage)
- **📱 Responsive** - Works on mobile, tablet, and desktop

---

## 🛠️ Technologies

### Frontend Framework & Build Tools

#### Technology

| --------------------
| **HTML**
| **CSS**
| **JavaScript**
| **Vite**
| **Vercel**

### Architecture & State Management

- **React Context API** - Global state management for:
  - 🎵 Audio playback (`AudioContext`)
  - ❤️ Favourite episodes (`FavouritesContext`)
  - 🎨 Theme selection (`ThemeContext`)
  - 📊 Podcast data (`PodcastContext`)
- **React Hooks** - `useState`, `useRef`, `useEffect`, `useContext` for functional components
- **localStorage** - Client-side persistence for favourites and theme preferences

### Styling

- **CSS Modules** - Component-scoped styling to prevent conflicts
- **CSS Variables** - Theme-aware color system with light/dark modes
- **Responsive Grid & Flexbox** - Modern layout techniques

### API Integration

- **Podcast API** - Real-world podcast data from [https://podcast-api.netlify.app/](https://podcast-api.netlify.app/)
- **Async/Await** - Clean promise handling for API calls
- **Error handling** - Graceful fallbacks and user-friendly error messages

### Installation

```bash
git clone <repository-url>
cd podcast-app
npm install
```

### Development

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/)

```

#### Favourite an Episode

1. On ShowDetail page, locate episode
2. Click ❤️ heart icon next to episode
3. Episode **saves to localStorage**

### ⭐ Favourites Page

#### Access Favourites

1. Click **"❤️ Favourites"** link in header
2. View all saved episodes

#### Favourite Features

- **Shows as count badge** - "❤️ Favourites (15)" shows total count
- **Grouped by show** - Episodes grouped under show titles
- **Show context** - See which show and season each episode is from
- **Date info** - See when you added each favourite

#### Sort Favourites

Choose sorting from dropdown:

- **Title A-Z** - Alphabetical ascending
- **Title Z-A** - Alphabetical descending
- **Newest** - Recently added first
- **Oldest** - Last added first

#### Manage Favourites

- Click ❤️ to remove from favourites
- Removed episodes disappear from page

### 🏠 Homepage

- **Carousel** - Browse featured shows at top with left/right arrows
- **Search** - Type podcast name to filter results
- **Filter** - Select genre to narrow results
- **Sort** - Organize by title, date, or popularity
- **Pagination** - Navigate through pages (12 shows per page)

### 📺 Show Detail Page

- Click any podcast to view full details, seasons, and episodes
- Select season tabs to browse different season episodes
- Click play button to start listening

### ▶️ Audio Player

- Play/Pause button
- Seek bar to jump to any point
- Time display shows current position / total duration
- Continues playing while you navigate
- Click new episode to switch playback

### ❤️ Favourites

- Click ❤️ icon next to episode to save
- Click "Favourites" in header to view all saved episodes
- Episodes grouped by show
- Sort by A-Z, Z-A, Newest, or Oldest
- Click ❤️ again to remove from favourites

### 🌙 Theme

- Click sun/moon icon (top right) to toggle light/dark mode
- Theme preference saves automatically

```
