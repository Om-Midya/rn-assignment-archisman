import { MotiView } from 'moti';
import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const AnimatedCounter = () => {
  const INITIAL_VALUE = 12340;
  const MIN_VALUE = 0;
  const MAX_VALUE = 999999999; // Reasonable max to prevent overflow

  const [value, setValue] = React.useState(INITIAL_VALUE);
  const splittedValue = value.toString().split('');
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const speedRef = React.useRef(1);
  const accelerationRef = React.useRef<NodeJS.Timeout | null>(null);

  const startContinuousChange = (direction: 'increment' | 'decrement') => {
    // Initial change with bounds checking
    setValue((prev) => {
      const newValue = direction === 'increment' ? prev + 1 : prev - 1;
      return Math.max(MIN_VALUE, Math.min(MAX_VALUE, newValue));
    });

    speedRef.current = 1;

    // Start continuous change with acceleration
    intervalRef.current = setInterval(() => {
      setValue((prev) => {
        const change = speedRef.current * (direction === 'increment' ? 1 : -1);
        const newValue = prev + change;
        // Stop at boundaries
        if (newValue < MIN_VALUE) {
          stopContinuousChange();
          return MIN_VALUE;
        }
        if (newValue > MAX_VALUE) {
          stopContinuousChange();
          return MAX_VALUE;
        }
        return newValue;
      });
    }, 100);

    // Gradually increase speed
    accelerationRef.current = setInterval(() => {
      if (speedRef.current < 50) {
        speedRef.current = Math.min(speedRef.current + 1, 50);
      }
    }, 200);
  };

  const stopContinuousChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (accelerationRef.current) {
      clearInterval(accelerationRef.current);
      accelerationRef.current = null;
    }
    speedRef.current = 1;
  };

  const resetCounter = () => {
    stopContinuousChange();
    setValue(MIN_VALUE);
  };

  React.useEffect(() => {
    return () => {
      stopContinuousChange();
    };
  }, []);

  return (
    <View className="flex-1 bg-slate-900 justify-center items-center">
      <View className="items-center">
        {/* Title */}
        <Text className="text-white text-2xl font-bold mb-4 tracking-wide">
          Animated Counter
        </Text>

        {/* Counter Display with Enhanced Styling */}
        <View className="flex-row bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50 shadow-2xl">
          {splittedValue.map((digit, index) => (
            <View key={index} className="mx-0.5">
              <TickerList digit={digit} />
            </View>
          ))}
        </View>

        {/* Control Buttons */}
        <View className="flex-row gap-4 mb-6">
          <Pressable
            onPress={() => setValue((prev) => Math.max(MIN_VALUE, prev - 1))}
            onLongPress={() => startContinuousChange('decrement')}
            onPressOut={stopContinuousChange}
            delayLongPress={300}
            className="bg-red-500 rounded-xl px-8 py-4 shadow-lg active:scale-95"
            disabled={value <= MIN_VALUE}
            style={value <= MIN_VALUE && { opacity: 0.5 }}
          >
            <Text className="text-white text-lg font-bold">− Decrement</Text>
          </Pressable>

          <Pressable
            onPress={() => setValue((prev) => Math.min(MAX_VALUE, prev + 1))}
            onLongPress={() => startContinuousChange('increment')}
            onPressOut={stopContinuousChange}
            delayLongPress={300}
            className="bg-blue-500 rounded-xl px-8 py-4 shadow-lg active:scale-95"
            disabled={value >= MAX_VALUE}
            style={value >= MAX_VALUE && { opacity: 0.5 }}
          >
            <Text className="text-white text-lg font-bold">+ Increment</Text>
          </Pressable>
        </View>

        {/* Reset Button */}
        <Pressable
          onPress={resetCounter}
          className="bg-slate-600 rounded-lg px-6 py-3 mb-4 shadow-md active:scale-95"
        >
          <Text className="text-white text-base font-semibold">↻ Reset</Text>
        </Pressable>

        {/* Current Value Display */}
        <View className="bg-slate-700/30 rounded-lg px-6 py-3 border border-slate-600/50">
          <Text className="text-slate-400 text-sm">Current Value</Text>
          <Text className="text-white text-xl font-mono font-bold text-center mt-1">
            {value.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const TickerList = ({ digit }: { digit: string }) => {
  const digitNum = parseInt(digit, 10);
  const DIGIT_HEIGHT = 56;

  return (
    <View className="bg-slate-700 overflow-hidden rounded-lg border-2 border-slate-600 shadow-xl" style={{ height: DIGIT_HEIGHT, width: 48 }}>
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: -digitNum * DIGIT_HEIGHT }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 90,
          mass: 0.8,
        }}
      >
        {nums.map((num, index) => (
          <View
            key={index}
            style={styles.digitContainer}
          >
            <Text style={styles.digitText}>
              {num}
            </Text>
          </View>
        ))}
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  digitContainer: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#60a5fa',
    lineHeight: 56,
    textAlign: 'center',
  },
});