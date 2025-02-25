import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import OnboardingStack from "./OnboardingStack";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [isOnboardingFinished, setIsOnboardingFinished] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName="OnboardingStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
