import styled from "styled-components/native";

const Container = styled.View`
  height: 60px;
  background-color: white;
  flex-direction: row;
  justify-content: left;
  margin-top: 40px;
  border-bottom-width: 0px;
`;
const Frame = styled.View`
  flex-direction: row;
  margin-left: 20px;
  align-items: center;
`;
const Logo = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const Header = () => {
  return (
    <Container>
      <Frame>
        <Logo source={require("../assets/headerLogo.png")} />
        <Title>Pill Me In</Title>
      </Frame>
    </Container>
  );
};

export default Header;
