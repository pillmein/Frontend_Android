import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const ButtonSaveSupplement = ({
  id,
  savedStatus,
  toggleSave,
}: {
  id: number;
  savedStatus: Record<number, boolean>;
  toggleSave: (index: number) => void;
}) => {
  return (
    <IconContainer onPress={() => toggleSave(id)}>
      <MaterialCommunityIcons
        name="pill"
        size={25}
        color={savedStatus[id] ? "#a5d6a7" : "#D3D3D3"}
      />
    </IconContainer>
  );
};

export default ButtonSaveSupplement;

const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;
