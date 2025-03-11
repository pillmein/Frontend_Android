import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScanView from "../screens/Scan/ScanView";
import { CameraView } from "../screens/Scan/CameraScan/CameraView/CameraView";
import PreviewView from "../screens/Scan/CameraScan/Preview/PreviewView";
import AnalysisView from "../screens/Scan/AnalysisView";

const Stack = createNativeStackNavigator<ScanStackParamList>();
type ScanStackParamList = {
  ScanView: undefined;
  CameraView: undefined;
  PreviewView: undefined;
  AnalysisView: undefined;
};
function ScanStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScanView" component={ScanView} />
      <Stack.Screen name="CameraView" component={CameraView} />
      <Stack.Screen name="PreviewView" component={PreviewView} />
      <Stack.Screen name="AnalysisView" component={AnalysisView} />
    </Stack.Navigator>
  );
}

export default ScanStack;
