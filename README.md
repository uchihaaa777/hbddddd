# Dhritii Birthday Site

React + Vite birthday website (opening screen, typewriter letter, photo gallery, music toggle).

## Run karne ka tareeka

Node.js 18 ya usse naya chahiye.

```bash
npm install
npm run dev
```

Phir browser mein `http://localhost:3000` kholo.

## Production build

```bash
npm run build
npm run preview
```

## Files

- `src/App.jsx` – poora UI aur logic (photos, letter message, music)
- `src/App.css` – saari styling
- `src/index.css` – basic body styles
- `src/main.jsx` – React entry point

## Dhyan dene wali baatein

- Photos `emergentagent.net` ke URLs se load hoti hain. Agar kabhi wo links expire ho jayein, to photos apne `public/` folder mein daalo aur `src/App.jsx` ke `photos` array mein `src` ko `/photo1.jpg` jaisa path de do.
- Music Pixabay ke URL se play hota hai. Browser autoplay block karta hai, isliye music tab chalta hai jab photo ya "Open your surprise" button par click hota hai.
