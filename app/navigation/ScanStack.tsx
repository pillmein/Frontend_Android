import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScanView from "../screens/Scan/ScanView";
import { CameraView } from "../screens/Scan/CameraScan/CameraView/CameraView";
import PreviewView from "../screens/Scan/CameraScan/Preview/PreviewView";
import AnalysisView from "../screens/Scan/AnalysisView";
import SupplementAddConfirmView from "../screens/Scan/SupplementAddConfirm/SupplementAddConfirmView";

const Stack = createNativeStackNavigator<ScanStackParamList>();
type ScanStackParamList = {
  ScanView: undefined;
  CameraView: undefined;
  PreviewView: undefined;
  AnalysisView: undefined;
  SupplementAddConfirmView: undefined;
};
function ScanStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScanView" component={ScanView} />
      <Stack.Screen name="CameraView" component={CameraView} />
      <Stack.Screen name="PreviewView" component={PreviewView} />
      <Stack.Screen name="AnalysisView" component={AnalysisView} />
      <Stack.Screen
        name="SupplementAddConfirmView"
        component={SupplementAddConfirmView}
      />
    </Stack.Navigator>
  );
}

export default ScanStack;
