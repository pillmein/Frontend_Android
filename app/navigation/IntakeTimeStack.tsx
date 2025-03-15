import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntakeTimeListView from "../screens/IntakeTime/IntakeTimeListView";

const Stack = createNativeStackNavigator<IntakeTimeStackParamList>();
type IntakeTimeStackParamList = {
  IntakeTimeListView: undefined;
};
function IntakeTimeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IntakeTimeListView" component={IntakeTimeListView} />
    </Stack.Navigator>
  );
}

export default IntakeTimeStack;
