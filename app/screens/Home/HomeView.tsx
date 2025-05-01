import { ScreenWrapper } from "../../components";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import * as S from "./Home.style";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import pill from "../../assets/headerLogo.png";
import apiSR from "../../api/apiSR";
import { useMemo } from "react";

const HomeView = () => {
  const today = new Date();
  const [checkedSupplements, setCheckedSupplements] = useState<string[]>([]);
  const [supplements, setSupplements] = useState<
    { id: number; supplementName: string; ingredients: string }[]
  >([]);
  const [summary, setSummary] = useState({
    weekStart: "",
    takenDays: 0,
    percentage: 0,
    comment: "",
  });
  const [intakeLog, setIntakeLog] = useState<string[]>([]);

  useEffect(() => {
    fetchSupplements();
    fetchSummary();
    fetchIntakeLog();
  }, []);

  const fetchSupplements = async () => {
    try {
      const response = await apiSR.get("/api/v1/supplements/mylist");
      const data = response.data.data;
      setSupplements(data);
    } catch (error: any) {
      console.log(
        "복용 중인 영양제 목록 조회 실패:",
        error.response?.data || error.message
      );
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await apiSR.get("/api/v1/intakes/summary");
      const data = response.data.data;
      setSummary(data);
    } catch (error: any) {
      console.log(
        "복용률 요약 조회 실패:",
        error.response?.data || error.message
      );
    }
  };

  const fetchIntakeLog = async () => {
    try {
      const response = await apiSR.get("/api/v1/intakes/log/week");
      setIntakeLog(response.data.data.intakeDates || []);
      console.log(
        "이번주 복용 기록 조회 성공: ",
        response.data.data.intakeDates
      );
    } catch (error: any) {
      console.log(
        "이번주 복용 기록 조회 실패:",
        error.response?.data || error.message
      );
      setIntakeLog([]);
    }
  };

  // 오늘 날짜 문자열 YYYY-MM-DD
  const getTodayString = (): string => {
    return new Date().toISOString().split("T")[0];
  };

  // 주간 캘린더 데이터 생성
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - startOfWeek.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const formattedDate = day.toISOString().split("T")[0]; // "YYYY-MM-DD"
      const isToday = day.toDateString() === today.toDateString();

      return {
        date: day.getDate(),
        day: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][day.getDay()],
        isToday,
        isTaken: intakeLog.includes(formattedDate),
      };
    });
  }, [intakeLog, today]);

  const toggleCheck = async (name: string) => {
    const wasAllChecked = checkedSupplements.length === supplements.length;
    const updatedChecked = checkedSupplements.includes(name)
      ? checkedSupplements.filter((item) => item !== name)
      : [...checkedSupplements, name];

    setCheckedSupplements(updatedChecked);

    const isAllCheckedNow = updatedChecked.length === supplements.length;
    const todayString = getTodayString();

    try {
      if (!wasAllChecked && isAllCheckedNow) {
        // 체크 수가 전체와 같아진 순간 → POST
        await apiSR.post("/api/v1/intakes/log", {
          intakeDate: todayString,
        });
        console.log("복용 기록 저장 성공");
        await fetchIntakeLog();
      } else if (wasAllChecked && !isAllCheckedNow) {
        // 전체 체크였는데 빠짐 → DELETE
        await apiSR.delete("/api/v1/intakes/log", {
          data: { intakeDate: todayString },
        });
        console.log("복용 기록 삭제 성공");
        await fetchIntakeLog();
      }
    } catch (error: any) {
      console.log(
        "복용 기록 반영 실패:",
        error.response?.data || error.message
      );
    }
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
          <S.ProgressBarFilled width={summary.percentage} />
          <S.ProgressBarRemaining width={100 - summary.percentage} />
        </S.ProgressBarContainer>
        <S.MessageContainer>
          <S.MessageText>{summary.comment}</S.MessageText>
        </S.MessageContainer>
      </S.ProgressContainer>
      <S.SupplementContainer>
        <S.SectionTitle>🌟 잊지 말고 꼭 챙겨 드세요!</S.SectionTitle>
      </S.SupplementContainer>

      {supplements.length > 0 ? (
        <FlatList
          data={supplements}
          keyExtractor={(item) => item.id.toString()}
          extraData={checkedSupplements}
          renderItem={({ item }) => (
            <S.SupplementItem key={item.id}>
              <FontAwesome
                name={
                  checkedSupplements.includes(item.supplementName)
                    ? "check-square"
                    : "square-o"
                }
                size={25}
                color="#a5d6a7"
                onPress={() => toggleCheck(item.supplementName)}
              />
              <S.SupplementText>{item.supplementName}</S.SupplementText>
              <S.CategoryTag>
                <S.CategoryText>
                  {item.ingredients
                    .split(",")
                    .slice(0, 2)
                    .map((i) => i.trim())
                    .join(", ")}
                </S.CategoryText>
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
