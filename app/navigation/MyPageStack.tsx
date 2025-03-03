import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPageView from "../screens/MyPage/MyPageView";
import SavedSupplementsView from "../screens/MyPage/SavedSupplements/SavedSupplementsView";
import SavedSupplementInfoView from "../screens/MyPage/SavedSupplements/SavedSupplementInfoView";

const Stack = createNativeStackNavigator<MyPageStackParamList>();
type MyPageStackParamList = {
  MyPageView: undefined;
  SavedSupplementsView: undefined;
  SavedSupplementInfoView: undefined;
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
    </Stack.Navigator>
  );
}

export default MyPageStack;
