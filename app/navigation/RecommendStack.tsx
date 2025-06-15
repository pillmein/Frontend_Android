import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreRecommendView from "../screens/Recommend/PreRecommend/PreRecommendView";
import AnalysisResultView from "../screens/Recommend/AnalysisResult/AnalysisResultView";
import RecommendView from "../screens/Recommend/RecommendView";
import SupplementInfoView from "../screens/Recommend/SupplementInfo/SupplementInfoView";
import ReSurveyAnswersView from "../screens/Recommend/ReSurveyAnswers/ReSurveyAnswersView";

const Stack = createNativeStackNavigator<RecommendStackParamList>();
type RecommendStackParamList = {
  PreRecommendView: undefined;
  AnalysisResultView: undefined;
  RecommendView: undefined;
  SupplementInfoView: undefined;
  ReSurveyAnswersView: undefined;
};
function RecommendStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PreRecommendView" component={PreRecommendView} />
      <Stack.Screen name="AnalysisResultView" component={AnalysisResultView} />
      <Stack.Screen name="RecommendView" component={RecommendView} />
      <Stack.Screen name="SupplementInfoView" component={SupplementInfoView} />
      <Stack.Screen name="ReSurveyAnswersView" component={ReSurveyAnswersView} />
    </Stack.Navigator>
  );
}

export default RecommendStack;
