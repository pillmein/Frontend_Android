import { Image, View, Text } from "react-native";
import logo from "../../assets/splashLogo.png";
import styled from "styled-components/native";

const OnBoardingView = () => {
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          marginTop: 150,
          marginLeft: 20,
        }}
      >
        <Description>
          내 몸에 맞는 영양제,{"\n"}정확하게 알고 복용하세요.
        </Description>
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          height: 150,
          marginTop: 50,
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
        올바른 영양제 조합, 복용까지 완벽하게 !{"\n"}당신만의 영양제 큐레이터
      </Description>
      <LoginButton>
        <Text>로그인 하기</Text>
      </LoginButton>
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
const LoginButton = styled.TouchableOpacity`
  border: 1px #d9d9d9;
  padding: 15px;
  border-radius: 10px;
  margin-vertical: 10px;
`;
