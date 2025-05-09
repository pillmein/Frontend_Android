import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const ButtonSaveSupplement = ({
  apiSupplementId,
  savedStatus,
  toggleSave,
}: {
  apiSupplementId: number;
  savedStatus: Record<number, boolean>;
  toggleSave: (index: number) => void;
}) => {
  const isSaved = savedStatus[apiSupplementId];

  return (
    <IconContainer onPress={() => toggleSave(apiSupplementId)}>
      <MaterialCommunityIcons
        name="pill"
        size={25}
        color={isSaved ? "#a5d6a7" : "#D3D3D3"}
      />
    </IconContainer>
  );
};

export default ButtonSaveSupplement;

const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;
