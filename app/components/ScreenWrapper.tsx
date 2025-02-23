import { View, StyleSheet } from "react-native";
import Header from "./Header";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <View style={styles.container}>
      <Header />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
});

export default ScreenWrapper;
