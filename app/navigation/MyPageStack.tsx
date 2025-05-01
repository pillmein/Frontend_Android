import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPageView from "../screens/MyPage/MyPageView";
import SavedSupplementsView from "../screens/MyPage/SavedSupplements/SavedSupplementsList/SavedSupplementsView";
import SavedSupplementInfoView from "../screens/MyPage/SavedSupplements/SavedSupplementInfo/SavedSupplementInfoView";
import MySupplementsView from "../screens/MyPage/MySupplements/MySupplementsView";
import AddMySupplementsView from "../screens/MyPage/MySupplements/AddMySupplementsView";
import EditSurveyAnswersView from "../screens/MyPage/EditSurveyAnswers/EditSurveyAnswersView";
import AnalysisResultsListView from "../screens/MyPage/AnalysisResults/AnalysisResultsList/AnalysisResultsListView";
import AnalysisResultsDetailView from "../screens/MyPage/AnalysisResults/AnalysisResultsDetail/AnalysisResultsDetailView";

const Stack = createNativeStackNavigator<MyPageStackParamList>();
type MyPageStackParamList = {
  MyPageView: undefined;
  SavedSupplementsView: undefined;
  SavedSupplementInfoView: undefined;
  MySupplementsView: undefined;
  AddMySupplementsView: undefined;
  EditSurveyAnswersView: undefined;
  AnalysisResultsListView: undefined;
  AnalysisResultsDetailView: undefined;
};
function MyPageStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageView" component={MyPageView} />
      <Stack.Screen
        name="SavedSupplementsView"
        component={SavedSupplementsView}
      />
      <Stack.Screen
        name="SavedSupplementInfoView"
        component={SavedSupplementInfoView}
      />
      <Stack.Screen name="MySupplementsView" component={MySupplementsView} />
      <Stack.Screen
        name="AddMySupplementsView"
        component={AddMySupplementsView}
      />
      <Stack.Screen
        name="EditSurveyAnswersView"
        component={EditSurveyAnswersView}
      />
      <Stack.Screen
        name="AnalysisResultsListView"
        component={AnalysisResultsListView}
      />
      <Stack.Screen
        name="AnalysisResultsDetailView"
        component={AnalysisResultsDetailView}
      />
    </Stack.Navigator>
  );
}

export default MyPageStack;
