import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/colors';

type OutlinedButtonProps = {
  children: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => Promise<void>;
};

export const OutlinedButton = ({
  children,
  onPress,
  icon,
}: OutlinedButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}>
      <Ionicons name={icon} size={20} color={Colors.primary500} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    paddingVertical: 8,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 4,
  },
  buttonPressed: { opacity: 0.7 },
  text: { color: Colors.primary500, fontSize: 14, fontWeight: 'bold' },
});
