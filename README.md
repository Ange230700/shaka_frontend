<!-- shaka_frontend\README.md -->

# 🌊 Shaka — Surf spots mobile app (Expo + React Native)

**Shaka** is a cross-platform app that helps users browse surf spots, save favorites, and visualize locations on an interactive map. It targets **iOS, Android, and Web** from a single codebase using **Expo 53** and **React Native 0.79**, with a clean state model and a solid developer experience (tests, linting, CI).

## ✨ Highlights

- **Cross-platform UI**: Single codebase for iOS/Android/Web via Expo.
- **Maps on every platform**:
  - Web: **Leaflet** (+ OpenStreetMap tiles).
  - Native: **react-native-maps** (Google Maps support when configured).

- **Theming**: Light/dark support using the system color scheme (customized React Navigation themes and status bar).
- **Favorites**: Simple, predictable UX powered by **Redux Toolkit**.
- **Type-safe**: **TypeScript** everywhere with strict mode on.
- **Great DX**: Jest + React Testing Library, Husky pre-commit hooks, ESLint + Prettier (with Tailwind plugin), commit linting, and a CI that runs lint, type-check, tests, and **web export**.

## 🧱 Architecture (at a glance)

- **Screens**: `Home` (list), `Favorites` (filtered list), `Detail` (spot details + map), `AllSpotsMap` (all markers).
- **State**: Minimal Redux slice for `favorites` (`ids: string[]`), typed hooks for ease of use.
- **API layer**: `src/api/surfspotApi.ts` wraps an Axios instance; two endpoints:
  - `GET /surfspot/all` → `SurfSpot[]`
  - `GET /surfspot/:id` → `SurfSpot`

- **Model**: `SurfSpot` includes metadata (destination, address, difficulty, season, photos) and `geocodeRaw` (base64 JSON containing coordinates).
- **Maps abstraction**:
  - `UniversalMap.native.tsx` (react-native-maps)
  - `UniversalMap.web.tsx` (react-leaflet)
  - `AllSpotsMap.*` renders multiple markers; on Web, Leaflet icons are prepped via `public/images` and `setupLeafletIcons`.

## 🧪 Testing & quality gates

- **Jest (jest-expo)** with **@testing-library/react-native**
  - Component tests for screens (`Home`, `Favorites`, `Detail`) and UI cards.
  - Slice tests for `favorites`.
  - Robust mocks for `react-native-reanimated`, `react-native-safe-area-context`, `expo-status-bar`, HTTP, and map components.

- **Husky** hooks
  - `pre-commit`: branch name validation + lint-staged formatting/lint.
  - `pre-push`: run tests if present.
  - `commit-msg`: commitlint conventional rules.

- **CI (GitHub Actions)**
  - Lint → Type-check → Tests (coverage) → Web export artifact (after tests pass).

## 🧰 Tech stack

- **Core**: React 19, React Native 0.79, Expo 53, TypeScript 5
- **Navigation**: React Navigation (stack + bottom tabs, Ionicons)
- **State**: Redux Toolkit
- **HTTP**: Axios (single configured instance)
- **Maps**: react-native-maps (native), Leaflet/react-leaflet (web)
- **Styling utilities**: NativeWind/Tailwind (RN), CSS Modules for web map
- **Tooling**: ESLint flat config, Prettier + Tailwind plugin, Husky, Commitizen/commitlint, Jest, React Testing Library

## 🔌 Configuration

Environment variables:

```bash
# .env (example)
EXPO_PUBLIC_API_BASE_URL=https://shaka-backend.onrender.com
# Optional for Google Maps (Android, native):
GOOGLE_MAPS_API_KEY=YOUR_KEY
```

Expo config (`app.config.ts`) already wires the Google Maps API key for Android and the `react-native-maps` plugin. Web uses OpenStreetMap via Leaflet and needs no key.

## ▶️ Run it locally

```bash
# 1) Install
npm ci

# 2) Copy env
cp .env.sample .env
# edit EXPO_PUBLIC_API_BASE_URL (if needed)

# 3) Start
npm start
# press 'a' for Android, 'i' for iOS, or 'w' for Web
```

> First run will copy Leaflet marker icons to `public/images/` (via `postinstall`).

## 🧱 Useful scripts

- `npm run lint` – ESLint (with auto-fix)
- `npm test` / `npm run test:watch` / `npm run test:ci`
- `npm run export` – **Expo web export** (outputs `dist/`)

## 🗂️ Project structure (selected)

```
src/
  api/           # axios-based API calls (surf spots)
  components/    # UniversalMap (native/web), AllSpotsMap (native/web), SurfSpotCard
  models/        # SurfSpot types
  screens/       # Home, Favorites, Detail, AllSpotsMap
  services/      # http.ts (axios instance)
  store/         # Redux store + favorites slice + typed hooks
  ui/            # layout + responsive helpers
tests/
  mocks/         # maps & CSS mocks
  utils/         # renderWithNav, store factory
  ...            # screen/component/slice tests
```

## 🧭 UX flow

- **Home**: fetches and lists surf spots, quick access to details, one-tap favorite toggle.
- **Favorites**: derives a filtered list from the Redux `ids`, shows empty state when none.
- **Detail**: shows photo/metadata, decodes `geocodeRaw` → passes coordinates to `UniversalMap`, quick link to external surf report if available.
- **All Spots Map**: plots every spot on an interactive map (Leaflet on web, native maps on mobile).

## 🔒 Code quality & conventions

- Conventional commits enforced (Commitizen + commitlint).
- Branch naming rules enforced (feature/_, fix/_, release/\*, etc.).
- ESLint + Prettier run on staged files; CI fails if auto-fix produces changes you didn’t commit.
