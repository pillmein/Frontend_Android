import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import SurveyStack from "./SurveyStack";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [isOnboardingFinished, setIsOnboardingFinished] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName="SurveyStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="SurveyStack" component={SurveyStack} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
