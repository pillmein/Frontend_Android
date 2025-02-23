import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingView from "../screens/OnBoarding/OnBoardingView";
import SurveyView from "../screens/OnBoarding/Survey/SurveyView";
import SurveySupplementView from "../screens/OnBoarding/Survey/SurveySupplementView";

const Stack = createNativeStackNavigator<SurveyStackParamList>();
type SurveyStackParamList = {
  OnBoardingView: undefined;
  SurveyView: undefined;
  SurveySupplementView: undefined;
};
function SurveyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoardingView" component={OnBoardingView} />
      <Stack.Screen name="SurveyView" component={SurveyView} />
      <Stack.Screen
        name="SurveySupplementView"
        component={SurveySupplementView}
      />
    </Stack.Navigator>
  );
}

export default SurveyStack;
