import Header from "../../components/Header";
import { Image, View } from "react-native";
import logo from "../../assets/splashLogo.png";
import styled from "styled-components/native";

const OnBoardingView = ({ navigation }: any) => {
  return (
    <Container>
      <Header />
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          height: 150,
          marginTop: 100,
        }}
      >
        <Image
          source={logo}
          style={{
            height: 150,
            width: 150,
            marginRight: 20,
            resizeMode: "contain",
          }}
        />
      </View>
      <Description>
        간단한 3단계 설문을 완료하면, {"\n"}당신에게 딱 맞는 영양제를 추천해
        드려요!
      </Description>
      <Checklist>✔ 생활습관 체크</Checklist>
      <Checklist>✔ 건강 고민 확인</Checklist>
      <Checklist>✔ 현재 복용 영양제 입력</Checklist>
      <ButtonContainer>
        <Button>
          <ButtonText onPress={() => navigation.navigate("SurveyView")}>
            설문 시작하기
          </ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};
export default OnBoardingView;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const Description = styled.Text`
  text-align: right;
  font-size: 16px;
  color: gray;
  margin-top: 20px;
  margin-right: 15px;
  margin-bottom: 35px;
`;

const Checklist = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 5px;
`;
const ButtonContainer = styled.View`
  margin-top: 40px;
`;
const Button = styled.TouchableOpacity`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  margin-vertical: 10px;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
`;
