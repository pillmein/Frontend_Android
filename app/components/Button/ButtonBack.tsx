import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ButtonBack = () => {
  const navigation = useNavigation();
  return (
    <BackButton>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} />
      </TouchableOpacity>
    </BackButton>
  );
};

export default ButtonBack;

const BackButton = styled.View`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
