import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../../theme/tokens";

type GreetingSectionProps = {
  greeting?: string;
  name?: string;
};

export function GreetingSection({
  greeting = "Good Evening,",
  name = "Alex",
}: GreetingSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {greeting}
        {"\n"}
        <Text style={styles.name}>{name}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  greeting: {
    ...typography.displayLg,
    color: colors.onSurface,
    letterSpacing: -0.88,
  },
  name: {
    color: colors.onSurfaceVariant,
  },
});
