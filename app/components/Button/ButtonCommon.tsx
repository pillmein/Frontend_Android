import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

interface ButtonCommonProps {
  text: string;
  navigateTo?: string;
}

function ButtonCommon({ text, navigateTo }: ButtonCommonProps) {
  const navigation = useNavigation();
  return (
    <ButtonContainer>
      <Button
        onPress={() => {
          if (navigateTo) {
            navigation.navigate(navigateTo as never);
          }
        }}
      >
        <ButtonText>{text}</ButtonText>
      </Button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.View`
  margin-top: 40px;
`;
const Button = styled.TouchableOpacity`
  background-color: #a5d6a790;
  padding: 15px;
  border-radius: 10px;
  margin-vertical: 10px;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
`;
export default ButtonCommon;
