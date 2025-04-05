import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

interface ButtonCommonProps {
  text: string;
  onPress?: () => void;
  navigateTo?: string;
  style?: any;
}

function ButtonCommon({ text, onPress, navigateTo, style }: ButtonCommonProps) {
  const navigation = useNavigation();
  return (
    <>
      <Button
        style={style}
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
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
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
