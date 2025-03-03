import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPageView from "../screens/MyPage/MyPageView";
import SavedSupplementsView from "../screens/MyPage/SavedSupplements/SavedSupplementsView";
import SavedSupplementInfoView from "../screens/MyPage/SavedSupplements/SavedSupplementInfoView";
import MySupplementsView from "../screens/MyPage/MySupplements/MySupplementsView";
import AddMySupplementsView from "../screens/MyPage/MySupplements/AddMySupplementsView";

const Stack = createNativeStackNavigator<MyPageStackParamList>();
type MyPageStackParamList = {
  MyPageView: undefined;
  SavedSupplementsView: undefined;
  SavedSupplementInfoView: undefined;
  MySupplementsView: undefined;
  AddMySupplementsView: undefined;
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
    </Stack.Navigator>
  );
}

export default MyPageStack;
