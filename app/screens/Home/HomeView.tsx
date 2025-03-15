import { ScreenWrapper } from "../../components";
import { useState } from "react";
import { FlatList } from "react-native";
import * as S from "./Home.style";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import pill from "../../assets/headerLogo.png";

// 임시 데이터
const SummaryData = {
  weekStart: "2025-02-18",
  takenDays: 5,
  percentage: 71,
  comment: "지난주보다 꾸준히 복용하고 있어요!",
};

const IntakeLog = ["2025-02-24", "2025-02-25", "2025-02-27"];

const HomeView = () => {
  const today = new Date();
  const [checkedSupplements, setCheckedSupplements] = useState<string[]>([]);

  // 임시 영양제 목록 데이터
  // const supplements = [
  //   { name: "비타민C 1000", category: "비타민C" },
  //   { name: "락토핏 골드", category: "유산균" },
  //   { name: "밀크씨슬 헬퍼", category: "밀크씨슬" },
  //   { name: "칼슘 앤 마그네슘 비타민D 아연", category: "칼슘" },
  // ];

  // 나의 영양제 목록 없을 경우
  const supplements: string | ArrayLike<any> | null | undefined = [];

  // 주간 캘린더 데이터 생성
  const getWeekDays = () => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const formattedDate = day.toISOString().split("T")[0];

      const isToday = day.getDate() === today.getDate();

      return {
        date: day.getDate(),
        day: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][i],
        isToday,
        isTaken: isToday
          ? checkedSupplements.length === supplements.length &&
            supplements.length > 0
          : IntakeLog.includes(formattedDate),
      };
    });
  };

  const weekDays = getWeekDays();

  const toggleCheck = (name: string) => {
    setCheckedSupplements((prev) => {
      const updated = prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name];

      console.log("Updated checkedSupplements:", updated);
      return updated;
    });
  };

  return (
    <ScreenWrapper>
      <S.CalendarContainer>
        <S.MonthText>
          {today.getFullYear()} /{" "}
          {String(today.getMonth() + 1).padStart(2, "0")}
        </S.MonthText>
        <FlatList
          data={weekDays}
          keyExtractor={(item) => item.date.toString()}
          horizontal
          renderItem={({ item }) => (
            <S.DayContainer>
              <S.DayText>{item.day}</S.DayText>
              <S.DateContainer>
                {item.isTaken && <S.BackgroundImage source={pill} />}
                <S.DateText isToday={item.isToday}>{item.date}</S.DateText>
              </S.DateContainer>
            </S.DayContainer>
          )}
        />
      </S.CalendarContainer>

      {/* 지난 주 복용률 UI */}
      <S.ProgressContainer>
        <S.ProgressTitle>지난 주 복용률</S.ProgressTitle>
        <S.ProgressBarContainer>
          <S.ProgressBarFilled width={SummaryData.percentage} />
          <S.ProgressBarRemaining width={100 - SummaryData.percentage} />
        </S.ProgressBarContainer>
        <S.MessageContainer>
          <S.MessageText>{SummaryData.comment}</S.MessageText>
        </S.MessageContainer>
      </S.ProgressContainer>
      <S.SupplementContainer>
        <S.SectionTitle>잊지 말고 꼭 챙겨 드세요!</S.SectionTitle>
      </S.SupplementContainer>

      {supplements.length > 0 ? (
        <FlatList
          data={supplements}
          keyExtractor={(item) => item.name}
          extraData={checkedSupplements}
          renderItem={({ item }) => (
            <S.SupplementItem key={item.name}>
              <FontAwesome
                name={
                  checkedSupplements.includes(item.name)
                    ? "check-square"
                    : "square-o"
                }
                size={25}
                color="#a5d6a7"
                onPress={() => toggleCheck(item.name)}
              />
              <S.SupplementText>{item.name}</S.SupplementText>
              <S.CategoryTag>
                <S.CategoryText>{item.category}</S.CategoryText>
              </S.CategoryTag>
            </S.SupplementItem>
          )}
        />
      ) : (
        <S.EmptySupplementContainer>
          <Fontisto name="pills" size={75} color="#a5d6a7" />
          <S.EmptySupplementText>
            현재 복용 중인 영양제가 없어요.{"\n"}필요한 영양제를 추천받아보세요!
          </S.EmptySupplementText>
        </S.EmptySupplementContainer>
      )}
    </ScreenWrapper>
  );
};
export default HomeView;
