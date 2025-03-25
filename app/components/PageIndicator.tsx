import styled from "styled-components/native";

interface SurveyItem {
  id: number;
  category: string;
  question: string;
  description: string;
  options: string[];
}

interface Props {
  currentIndex: number;
  surveyData: SurveyItem[];
}

const PageIndicator = ({ currentIndex, surveyData }: Props) => {
  if (currentIndex >= surveyData.length) return null;

  const currentSurvey = surveyData[currentIndex];
  const currentCategory = currentSurvey.category;

  const categorySurveyList = surveyData.filter(
    (item) => item.category === currentCategory
  );
  const categoryTotal = categorySurveyList.length;

  const categoryIndex = categorySurveyList.findIndex(
    (item) => item.id === currentSurvey.id
  );

  return (
    <Container>
      {categoryIndex + 1} / {categoryTotal}
    </Container>
  );
};

export default PageIndicator;

const Container = styled.Text`
  font-size: 16px;
  color: gray;
`;
