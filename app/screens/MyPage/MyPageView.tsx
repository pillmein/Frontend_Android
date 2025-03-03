import { ScreenWrapper } from "../../components";
import * as S from "./MyPage.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyPageView = ({ navigation }: any) => {
  const menuItems = [
    { icon: "pill", text: "찜한 영양제", screen: "SavedSupplementsView" },
    {
      icon: "format-list-bulleted-square",
      text: "나의 영양제 목록",
      screen: "MySupplements",
    },
    { icon: "clock-outline", text: "나의 복용 알림 설정", screen: "Reminder" },
    {
      icon: "file-document-edit-outline",
      text: "설문 답변 수정",
      screen: "EditSurvey",
    },
    {
      icon: "image-search-outline",
      text: "분석 결과 목록",
      screen: "AnalysisResults",
    },
  ] as const;

  return (
    <ScreenWrapper>
      <S.Container>
        <S.Header>
          <S.Title>마이페이지</S.Title>
          <S.LogoutButton>
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
