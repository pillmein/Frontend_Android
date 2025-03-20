import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

interface ButtonCommonProps {
  text: string;
  onPress?: () => void;
  navigateTo?: string;
}

function ButtonCommon({ text, onPress, navigateTo }: ButtonCommonProps) {
  const navigation = useNavigation();
  return (
    <>
      <Button
        onPress={() => {
          if (onPress) {
            onPress();
          } else if (navigateTo) {
            navigation.navigate(navigateTo as never);
          }
        }}
      >
        <ButtonText>{text}</ButtonText>
      </Button>
    </>
  );
}
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
