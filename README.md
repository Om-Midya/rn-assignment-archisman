# My Expo App

An Expo React Native demo showcasing a spring-animated, ticker-style counter UI with long-press acceleration and styled controls.

## Features
- Animated digit ticker using Moti and Reanimated
- Increment/decrement with long-press acceleration and bounds
- Styled UI using NativeWind and Tailwind classes

## Tech Stack
- Expo + React Native
- Moti + Reanimated
- NativeWind + Tailwind CSS
- TypeScript

## Getting Started

### Prerequisites
- Node.js
- Expo CLI (optional, but recommended)

### Install
```bash
pnpm install
```

### Run
```bash
pnpm start
```

Then open the app in:
- iOS simulator: press `i`
- Android emulator: press `a`
- Web: press `w`

## Scripts
- `pnpm start` - start Expo dev server
- `pnpm android` - start Android
- `pnpm ios` - start iOS
- `pnpm web` - start Web
- `pnpm lint` - lint and check formatting
- `pnpm format` - auto-fix lint and formatting

## Project Structure
- `App.tsx` - entry point
- `components/AnimatedCounter.tsx` - animated counter UI and logic
- `components/Container.tsx` - layout helpers
- `global.css` - NativeWind/Tailwind base styles

## Notes
- The counter bounds and initial value are defined in `components/AnimatedCounter.tsx`.
