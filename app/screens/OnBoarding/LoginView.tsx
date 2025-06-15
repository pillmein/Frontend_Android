import { Image, View } from "react-native";
import logo from "../../assets/splashLogo.png";
import styled from "styled-components/native";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, API_BASE_URL_SR } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const LoginView = ({ navigation }: any) => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true, // refresh token 받기
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const idToken = (await GoogleSignin.getTokens()).idToken;
      console.log("로그인 성공:", userInfo);

      // 1. 서버에 로그인 요청
      const response = await axios.post(`${API_BASE_URL_SR}/api/v1/auth/login`, {
        idToken: idToken,
        fcmToken: "temporary"
      });

      const { accessToken, refreshToken } = response.data.data;

      console.log("서버 로그인 성공, 토큰 발급:", accessToken, refreshToken);

      await AsyncStorage.setItem("accessToken", accessToken);
      navigation.navigate("OnBoardingView");
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("사용자가 로그인 취소");
      } else {
        console.error("로그인 실패:", error);
      }
    }
  };

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
      <LoginContainer>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          onPress={signin}
        />
      </LoginContainer>
    </Container>
  );
};
export default LoginView;

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
const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
