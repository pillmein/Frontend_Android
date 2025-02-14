import * as S from "./Supplements.style";

interface SupplementProps {
  image: string | null;
  name: string;
  ingredients: string;
  amount: string;
  effects: string;
  precautions: string;
}

function Supplements({
  image,
  name,
  ingredients,
  amount,
  effects,
  precautions,
}: SupplementProps) {
  return (
    <S.Container>
      <S.SupplementCard>
        <S.Title>{name}</S.Title>
        <S.Content>
          <S.Image
            source={{
              uri:
                image ||
                "https://www.gachinet.co.kr/assets/images/common/thumb_no_img.png",
            }}
          />
          <S.Info>
            <S.Tag>
              {ingredients} {amount}
            </S.Tag>
            <S.Description>효과: {effects}</S.Description>
            <S.Description>주의사항: {precautions}</S.Description>
          </S.Info>
        </S.Content>
      </S.SupplementCard>
    </S.Container>
  );
}

export default Supplements;
