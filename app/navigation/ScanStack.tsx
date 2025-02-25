import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScanView from "../screens/Scan/ScanView";
import AnalysisView from "../screens/Scan/AnalysisView";

const Stack = createNativeStackNavigator<ScanStackParamList>();
type ScanStackParamList = {
  ScanView: undefined;
  AnalysisView: undefined;
};
function ScanStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScanView" component={ScanView} />
      <Stack.Screen name="AnalysisView" component={AnalysisView} />
    </Stack.Navigator>
  );
}

export default ScanStack;
