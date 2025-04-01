import { useState } from "react";
import { Text, Image, View } from "react-native";
import * as S from "./Survey.style";
import noResults from "../../../assets/noResults.png";
import SupplementInput from "./SupplementInput";

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

  //임시 db
  const supplementDB = [
    {
      supplementName: "밀크씨슬 헬퍼",
      ingredients:
        "비타민 B2, 비타민 B1염산염, 비타민 B6 염산염, 산화아연, 비타민 C, 밀크씨슬추출물분말, 스테아린산마그네슘, 이산화규소, 벌꿀분말, 덱스트린, 타우린, 해조혼합분말, 혼합유당, 건조효모, 결정셀룰로스, 과일채소혼합분말, 히드록시프로필메틸셀룰로스, 치커리뿌리추출물분말, 니코틴산아미드, 황산망간, 아미노산혼합제제, 헛개나무열매추출분말, 곡물혼합분말, 표고버섯추출물분말, 엽산, 비타민B12혼합제제분말",
      imgUrl:
        "https://via.placeholder.com/100x100.png?text=%EB%B0%80%ED%81%AC%EC%94%A8%EC%8A%AC",
    },
    {
      supplementName: "임팩타민",
      ingredients: "비타민B군, 아연, 셀레늄",
      imgUrl:
        "https://via.placeholder.com/100x100.png?text=%EC%9E%84%ED%8C%A9%ED%83%80%EB%B0%8C",
    },
  ];

  const checkSupplementInDB = (name: string) => {
    return (
      supplementDB.find((supplement) => supplement.supplementName === name) ||
      null
    );
  };

  const handleSearch = () => {
    if (!supplementName.trim()) return;
    const result = checkSupplementInDB(supplementName.trim());
    setSearchResult(result);
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
