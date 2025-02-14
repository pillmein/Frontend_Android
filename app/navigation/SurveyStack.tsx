import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingView from "../screens/OnBoarding/OnBoardingView";
import SurveyView from "../screens/OnBoarding/Survey/SurveyView";
import SurveyDoneView from "../screens/OnBoarding/SurveyDoneView";

const Stack = createNativeStackNavigator<SurveyStackParamList>();
type SurveyStackParamList = {
  OnBoardingView: undefined;
  SurveyView: undefined;
  SurveyDoneView: undefined;
};
function SurveyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoardingView" component={OnBoardingView} />
      <Stack.Screen name="SurveyView" component={SurveyView} />
      <Stack.Screen name="SurveyDoneView" component={SurveyDoneView} />
    </Stack.Navigator>
  );
}

export default SurveyStack;
