import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../utils/colors';

type ButtonProps = {
  children: string;
  onPress: () => void;
};

export const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: Colors.primary800,
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: { opacity: 0.7 },
  text: { textAlign: 'center', fontSize: 16, color: Colors.primary50 },
});
