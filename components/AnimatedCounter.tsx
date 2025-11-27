import { MotiView } from 'moti';
import React from 'react';
import { Text, View } from 'react-native';

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const AnimatedCounter = () => {
  const [value, setValue] = React.useState(123405);
  const splittedValue = value.toString().split('')
  return (
    <View className="items-center flex-1 justify-center bg-white">
      <View>
        <Text
          className="mb-8 text-blue-500 underline"
          onPress={() => setValue(value - 1)}
        >
          Decrement
        </Text>
      </View>
      <View className="flex-row">
        {splittedValue.map((digit, index) => (
          <TickerList
          digit={digit}
          key={index}
          />
        ))}
      </View>
      <View>
        <Text
          className="mt-8 text-blue-500 underline"
          onPress={() => setValue(value + 1)}
        >
          Increment
        </Text>
      </View>
    </View>
  );
};

const TickerList = ({digit}: {digit: string}) => {
  const digitNum = parseInt(digit, 10);
  return (
    <View className='h-8 bg-red-400 overflow-hidden'>
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: -digitNum * 32 }}
        transition={{
          type: 'timing',
          duration: 500,
        }}
      >
        {nums.map((num, index) => (
        <Text
          key={index}
          className="text-3xl font-bold text-black"
          style={{ height: 32, fontSize: 32 }}
        >
          {num}
        </Text>
      ))}
      </MotiView>
    </View>
  )
}