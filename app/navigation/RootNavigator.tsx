import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./BottomTabNavigator";
import OnboardingStack from "./OnboardingStack";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      setInitialRoute(token ? "MainApp" : "OnboardingStack");
    };

    checkToken();
  }, []);

  // 아직 토큰 확인 중이면 로딩 스피너
  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#a5d6a7" />
      </View>
    );
  }

  return (
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
