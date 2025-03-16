import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntakeTimeListView from "../screens/IntakeTime/IntakeTimeListView";
import SetAlarmTimeView from "../screens/IntakeTime/SetAlarmTime/SetAlarmTimeView";
import RecommendAlarmTimeView from "../screens/IntakeTime/RecommendAlarmTime/RecommendAlarmTimeView";

const Stack = createNativeStackNavigator<IntakeTimeStackParamList>();
type IntakeTimeStackParamList = {
  IntakeTimeListView: undefined;
  SetAlarmTimeView: undefined;
  RecommendAlarmTimeView: undefined;
};
function IntakeTimeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IntakeTimeListView" component={IntakeTimeListView} />
      <Stack.Screen name="SetAlarmTimeView" component={SetAlarmTimeView} />
      <Stack.Screen
        name="RecommendAlarmTimeView"
        component={RecommendAlarmTimeView}
      />
    </Stack.Navigator>
  );
}

export default IntakeTimeStack;
