import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../screens/Home/HomeView";
import RecommendStack from "./RecommendStack"; // Recommend는 Stack 구조
import ScanStack from "./ScanStack";
import MyPageStack from "./MyPageStack";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          title: "홈",
          tabBarIcon: (props) => (
            <Feather name="home" size={24} color="black" />
          ),
          tabBarActiveBackgroundColor: "#A5D6A766",
          tabBarActiveTintColor: "black",
          tabBarItemStyle: {
            marginTop: 2,
            borderRadius: 20,
            overflow: "hidden",
          },
        }}
      />
      <Tab.Screen
        name="RecommendStack"
        component={RecommendStack}
        options={{
          title: "영양제 추천",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="pill" size={24} color="black" />
          ),
          tabBarActiveBackgroundColor: "#A5D6A766",
          tabBarActiveTintColor: "black",
          tabBarItemStyle: {
            marginTop: 2,
            borderRadius: 20,
            overflow: "hidden",
          },
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanStack}
        options={{
          title: "영양성분 스캔",
          tabBarIcon: (props) => (
            <MaterialIcons name="image-search" size={24} color="black" />
          ),
          tabBarActiveBackgroundColor: "#A5D6A766",
          tabBarActiveTintColor: "black",
          tabBarItemStyle: {
            marginTop: 2,
            borderRadius: 20,
            overflow: "hidden",
          },
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          title: "마이페이지",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color="black"
            />
          ),
          tabBarActiveBackgroundColor: "#A5D6A766",
          tabBarActiveTintColor: "black",
          tabBarItemStyle: {
            marginTop: 2,
            borderRadius: 20,
            overflow: "hidden",
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
