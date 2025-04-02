import { useState } from "react";
import { Text, Image, View } from "react-native";
import * as S from "./Survey.style";
import noResults from "../../../assets/noResults.png";
import SupplementInput from "./SupplementInput";
import apiSR from "../../../api/apiSR";

const SupplementSearch = ({
  setIsConfirmed,
  confirmedSupplements,
  setConfirmedSupplements,
  isSearching,
  setIsSearching,
}: any) => {
  const [supplementName, setSupplementName] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<null | {
    supplementName: string;
    ingredients: string;
    imgUrl: string;
  }>(null);
  const [supplementInput, setSupplementInput] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!supplementName.trim()) return;

    try {
      const response = await apiSR.post("/api/v1/supplements/search", {
        supplementName: supplementName.trim(),
      });
  
      if (response.data?.data) {
        setSearchResult(response.data.data);
      } else {
        setSearchResult(null);
      }
    } catch (error: any) {
      console.log("영양제 검색 실패:", error.response?.data || error.message);

      const errorCode = error.response?.data?.errorCode;

      if (errorCode === "NOT_FOUND_SUPPLEMENT") {
        setSearchResult(null);
      } else {
        console.log("검색 오류");
      }
    }

    setHasSearched(true);
  };

  const handleConfirmSupplement = () => {
    if (!searchResult) return;

    const selectedSupplement = {
      supplementName: searchResult.supplementName,
      ingredients: searchResult.ingredients,
    };

    console.log("복용 중인 영양제로 저장:", selectedSupplement);

    setConfirmedSupplements((prev: any[]) => [
      ...prev,
      {
        supplementName: searchResult.supplementName,
        ingredients: searchResult.ingredients,
      },
    ]);
    setIsConfirmed(true);
    setSupplementName("");
    setSearchResult(null);
    setHasSearched(false);
    setIsSearching(false);
  };

  return (
    <>
      {confirmedSupplements.length > 0 && (
        <View>
          {confirmedSupplements.map((supplement: any, id: number) => (
            <View key={id}>
              <S.ConfirmedSupplement>
                <Text>{supplement.supplementName}</Text>
              </S.ConfirmedSupplement>
            </View>
          ))}
        </View>
      )}

      {confirmedSupplements.length > 0 && !isSearching && (
        <S.AddContainer>
          <S.ResultsButton
            onPress={() => {
              setIsSearching(true);
            }}
          >
            <Text>영양제 추가하기</Text>
          </S.ResultsButton>
        </S.AddContainer>
      )}

      {supplementInput ? (
        <SupplementInput
          supplementName={supplementName}
          setIsConfirmed={setIsConfirmed}
          setIsSearching={setIsSearching}
          setSupplementName={setSupplementName}
          setSupplementInput={setSupplementInput}
          setConfirmedSupplements={setConfirmedSupplements}
        />
      ) : (
        isSearching && (
          <>
            <S.SearchInputContainer>
              <S.SearchInput
                placeholder="제품명을 입력해주세요!"
                value={supplementName}
                onChangeText={setSupplementName}
              />
              <S.ConfirmButton onPress={handleSearch}>
                <S.ConfirmButtonText>확인</S.ConfirmButtonText>
              </S.ConfirmButton>
            </S.SearchInputContainer>

            {searchResult && (
              <>
                <S.ProductContainer>
                  <Text>아래 영양제가 맞나요?</Text>
                  <S.ProductCard>
                    <S.ProductImage source={{ uri: searchResult.imgUrl }} />
                    <S.ProductName>{searchResult.supplementName}</S.ProductName>
                    <S.ProductIngredients>
                      {(() => {
                        const ingredientsArray = searchResult.ingredients
                          .split(",")
                          .map((i) => i.trim());
                        const shown = ingredientsArray.slice(0, 2).join(", ");
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
                    onPress={() => {
                      setSearchResult(null);
                      setSupplementInput(true);
                    }}
                  >
                    <S.YesOrInputText>
                      아니요, 직접 정보 입력할게요.
                    </S.YesOrInputText>
                  </S.YesOrInputButton>
                </S.YesOrNoContainer>
              </>
            )}

            {hasSearched && searchResult === null && (
              <S.ResultsContainer>
                <Image
                  source={noResults}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
                <S.NoResultsText>
                  검색 결과가 없어요!{`\n`}오타가 없는지 확인해주세요.
                </S.NoResultsText>
                <S.ResultsButton
                  onPress={() => {
                    setSearchResult(null);
                    setHasSearched(false);
                    setSupplementInput(true);
                  }}
                >
                  <Text>직접 정보 입력할게요.</Text>
                </S.ResultsButton>
              </S.ResultsContainer>
            )}
          </>
        )
      )}
    </>
  );
};

export default SupplementSearch;
