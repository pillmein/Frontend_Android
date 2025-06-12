import { ScreenWrapper } from "../../components";
import * as S from "./MyPage.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyPageView = ({ navigation }: any) => {
  const menuItems = [
    { icon: "pill", text: "찜한 영양제", screen: "SavedSupplementsView" },
    {
      icon: "format-list-bulleted-square",
      text: "나의 영양제 목록",
      screen: "MySupplementsView",
    },
    {
      icon: "file-document-edit-outline",
      text: "설문 답변 수정",
      screen: "EditSurveyAnswersView",
    },
    {
      icon: "image-search-outline",
      text: "분석 결과 목록",
      screen: "AnalysisResultsListView",
    },
  ] as const;

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");

    navigation.reset({
      index: 0,
      routes: [{ name: "OnboardingStack" }],
    });
  };

  return (
    <ScreenWrapper>
      <S.Container>
        <S.Header>
          <S.Title>마이페이지</S.Title>
          <S.LogoutButton onPress={handleLogout}>
            <S.LogoutText>로그아웃</S.LogoutText>
          </S.LogoutButton>
        </S.Header>

        {menuItems.map((item, index) => (
          <S.MenuItem
            key={index}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={25}
              color="#a5d6a7"
            />
            <S.MenuText>{item.text}</S.MenuText>
          </S.MenuItem>
        ))}
      </S.Container>
    </ScreenWrapper>
  );
};

export default MyPageView;
