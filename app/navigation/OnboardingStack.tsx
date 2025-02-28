import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "../screens/OnBoarding/LoginView";
import OnBoardingView from "../screens/OnBoarding/OnBoardingView";
import SurveyView from "../screens/OnBoarding/Survey/SurveyView";
import SurveySupplementView from "../screens/OnBoarding/Survey/SurveySupplementView";

const Stack = createNativeStackNavigator<SurveyStackParamList>();
type SurveyStackParamList = {
  LoginView: undefined;
  OnBoardingView: undefined;
  SurveyView: undefined;
  SurveySupplementView: undefined;
};
function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginView" component={LoginView} />
      <Stack.Screen name="OnBoardingView" component={OnBoardingView} />
      <Stack.Screen name="SurveyView" component={SurveyView} />
      <Stack.Screen
        name="SurveySupplementView"
        component={SurveySupplementView}
      />
    </Stack.Navigator>
  );
}

export default OnboardingStack;
