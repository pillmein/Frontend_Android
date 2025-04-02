import { useEffect, useState } from "react";
import { ScreenWrapper } from "../../../components";
import * as S from "./Survey.style";
import SupplementSearch from "./SupplementSearch";
import apiSR from "../../../api/apiSR";

const SurveySupplementView = function ({ navigation }: any) {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no" | null>(
    null
  );
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [confirmedSupplements, setConfirmedSupplements] = useState<string[]>(
    []
  );
  const [isSearching, setIsSearching] = useState<boolean>(true);

  const isButtonEnabled = selectedOption === "no" || isConfirmed;
  const isSelectedYes = selectedOption === "yes";

  useEffect(() => {
    if (confirmedSupplements.length > 0) {
      console.log("현재 저장된 영양제 목록:", confirmedSupplements);
      setIsSearching(false);
    }
  }, [confirmedSupplements]);

  const handleSubmitSupplements = async () => {
    try {
      if (confirmedSupplements.length === 0) {
        navigation.navigate("MainApp");
        return;
      }
      const response = await apiSR.post("/api/v1/supplements/mylist", {
        supplements: confirmedSupplements,
      });

      console.log("영양제 전송 성공:", response.data);
      navigation.navigate("MainApp");
    } catch (error: any) {
      console.log("영양제 전송 실패:", error.response?.data || error.message);
    }
  };

  return (
    <ScreenWrapper>
      <S.SurveyContainer>
        {!isSelectedYes ? (
          <>
            <S.Question>현재 복용 중인 영양제가 있으신가요?</S.Question>
            <S.YesOrNoContainer>
              <S.YesOrNoButton
                isSelected={isSelectedYes}
                onPress={() => {
                  setSelectedOption("yes");
                  setIsSearching(true);
                }}
              >
                <S.YesOrNoText>예</S.YesOrNoText>
              </S.YesOrNoButton>
              <S.YesOrNoButton
                isSelected={isButtonEnabled}
                onPress={() => {
                  setSelectedOption("no");
                  setIsConfirmed(true);
                }}
              >
                <S.YesOrNoText>아니요</S.YesOrNoText>
              </S.YesOrNoButton>
            </S.YesOrNoContainer>
          </>
        ) : null}

        {isSelectedYes ? (
          <SupplementSearch
            setIsConfirmed={setIsConfirmed}
            confirmedSupplements={confirmedSupplements}
            setConfirmedSupplements={setConfirmedSupplements}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        ) : null}
      </S.SurveyContainer>

      <S.NextButton
        disabled={!isConfirmed}
        onPress={handleSubmitSupplements}
      >
        <S.NextButtonText>Pill Me In 시작</S.NextButtonText>
      </S.NextButton>
    </ScreenWrapper>
  );
};

export default SurveySupplementView;
