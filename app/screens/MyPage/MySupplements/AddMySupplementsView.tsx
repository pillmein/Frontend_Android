import { useState } from "react";
import { Text, Image } from "react-native";
import * as S from "../../OnBoarding/Survey/Survey.style";
import noResults from "../../../assets/noResults.png";
import SupplementInput from "./SupplementInput";
import { ScreenWrapper } from "../../../components";
import apiSR from "../../../api/apiSR";

const AddMySupplementsView = ({ navigation }: any) => {
  const [inputName, setInputName] = useState(""); // 입력
  const [supplementName, setSupplementName] = useState(""); // 확정
  const [searchResult, setSearchResult] = useState<boolean | null>(null); // DB 검색
  const [searchData, setSearchData] = useState<any | null>(null); // 검색 결과 데이터 저장
  const [isDirectInput, setIsDirectInput] = useState(false); // 직접입력 여부
  const [isComplete, setIsComplete] = useState(false); // 저장 완료 여부

  // 제품명 검색
  const handleSearch = async () => {
    if (!inputName.trim()) return;
    try {
      console.log("서버 요청 보냄:", { supplementName: inputName });
      const response = await apiSR.post("/api/v1/supplements/search", {
        supplementName: inputName,
      });
      console.log("검색 결과: ", response.data);
      setSearchData(response.data.data);
      setSupplementName(response.data.supplementName);
      setSearchResult(true);
    } catch (error: any) {
      console.log("영양제 검색 실패:", error.response?.data || error.message);
      const errorCode = error.response?.data?.errorCode;
      if (errorCode === "NOT_FOUND_SUPPLEMENT") {
        setSearchResult(null);
      } else {
        console.log("검색 오류");
      }
    }
  };

  const handleConfirmSupplement = async () => {
    try {
      const response = await apiSR.post("/api/v1/supplements/mylist", {
        supplementName: searchData?.supplementName,
        ingredients: searchData?.ingredients || "",
      });
      console.log("영양제 저장 성공:", response.data);
    } catch (error: any) {
      console.log("영양제 전송 실패:", error.response?.data || error.message);
    }
    setIsComplete(true);
  };

  // 저장 확인 후 이전 화면으로
  const handleConfirmComplete = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <S.SurveyContainer>
        {isComplete ? (
          <S.CompleteContainer>
            <S.ConfirmText>나의 영양제 목록에 저장되었습니다.</S.ConfirmText>
            <S.ConfirmButton onPress={handleConfirmComplete}>
              <Text>확인</Text>
            </S.ConfirmButton>
          </S.CompleteContainer>
        ) : (
          <>
            {isDirectInput ? (
              <SupplementInput
                supplementName={inputName}
                setIsComplete={setIsComplete}
                setIsDirectInput={setIsDirectInput}
              />
            ) : (
              <>
                <S.SearchInputContainer>
                  <S.SearchInput
                    placeholder="제품명을 입력해주세요!"
                    value={inputName}
                    onChangeText={setInputName}
                  />
                  <S.ConfirmButton onPress={handleSearch}>
                    <S.ConfirmButtonText>확인</S.ConfirmButtonText>
                  </S.ConfirmButton>
                </S.SearchInputContainer>

                {searchResult === true && (
                  <>
                    <S.ProductContainer>
                      <Text>아래 영양제가 맞나요?</Text>
                      <S.ProductCard>
                        <S.ProductImage
                          source={{
                            uri:
                              searchData?.imgUrl ||
                              "https://media.istockphoto.com/id/1150593135/ko/%EB%B2%A1%ED%84%B0/비타민-이미지.jpg",
                          }}
                        />
                        <S.ProductName>
                          {searchData.supplementName}
                        </S.ProductName>
                        <S.ProductIngredients>
                          {(() => {
                            const ingredientsArray = searchData.ingredients
                              .split(",")
                              .map((i: string) => i.trim());
                            const shown = ingredientsArray
                              .slice(0, 2)
                              .join(", ");
                            return shown;
                          })()}
                        </S.ProductIngredients>
                      </S.ProductCard>
                    </S.ProductContainer>

                    <S.YesOrNoContainer>
                      <S.YesOrInputButton onPress={handleConfirmSupplement}>
                        <S.YesOrInputText>예</S.YesOrInputText>
                      </S.YesOrInputButton>

                      <S.YesOrInputButton
                        onPress={() => setIsDirectInput(true)}
                      >
                        <S.YesOrInputText>
                          아니요, 직접 입력할게요
                        </S.YesOrInputText>
                      </S.YesOrInputButton>
                    </S.YesOrNoContainer>
                  </>
                )}

                {searchResult === false && (
                  <S.ResultsContainer>
                    <Image
                      source={noResults}
                      style={{ height: 100, width: 100 }}
                    />
                    <S.NoResultsText>
                      검색 결과가 없어요!{`\n`}오타가 없는지 확인해주세요.
                    </S.NoResultsText>

                    <S.ResultsButton onPress={() => setIsDirectInput(true)}>
                      <Text>직접 정보 입력할게요.</Text>
                    </S.ResultsButton>
                  </S.ResultsContainer>
                )}
              </>
            )}
          </>
        )}
      </S.SurveyContainer>
    </ScreenWrapper>
  );
};

export default AddMySupplementsView;
