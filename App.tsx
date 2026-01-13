import { AnimatedCounter } from 'components/AnimatedCounter';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <>
      <AnimatedCounter></AnimatedCounter>
      <StatusBar style="auto" />
    </>
  );
}
