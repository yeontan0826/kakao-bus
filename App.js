import { useEffect, useState } from 'react';
import {
  RefreshControl,
  SectionList,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styled from 'styled-components/native';
import dayjs from 'dayjs';

import {
  busStop,
  getBusNumColorByType,
  getRemainedTimeText,
  getSeatStatusText,
  getSections,
} from './src/data';
import { useTheme } from './src/hooks/useTheme';
import { COLOR } from './src/color';
import BusInfo from './src/busInfo';
import Margin from './src/margin';
import BookmarkButton from './src/bookmarkButton';

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

const ArrowButton = ({ iconName }) => (
  <TouchableOpacity style={{ padding: 10 }}>
    <SimpleLineIcons name={iconName} size={20} color={COLOR.WHITE} />
  </TouchableOpacity>
);

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

  const { isDark, toggleIsDark, NEWCOLOR } = useTheme();

  const onPressBusStopBookmark = () => {
    // api를 활용하여 북마크 변경
  };

  const ListHeaderComponent = () => (
    <ListHeaderContainer edges={['top']}>
      {/* 정류소 번호, 이름, 방향 */}
      <BusStopId NEWCOLOR={NEWCOLOR}>{busStop.id}</BusStopId>
      <Margin height={4} />
      <BusStopName NEWCOLOR={NEWCOLOR}>{busStop.name}</BusStopName>
      <Margin height={4} />
      <BusStopText>{busStop.directionDescription}</BusStopText>
      <Margin height={20} />
      {/* 북마크 */}
      <HeaderBookmarkButton
        NEWCOLOR={NEWCOLOR}
        size={busStopBookmarkSize}
        isBookmarked={busStop.isBookmarked}
        onPress={onPressBusStopBookmark}
      />
      <Margin height={16} />
      <Switch value={isDark} onValueChange={toggleIsDark} />
    </ListHeaderContainer>
  );

  const ListFooterComponent = () => <Margin height={30} />;

  const renderSectionHeader = ({ section: { title } }) => {
    return (
      <SectionHeader NEWCOLOR={NEWCOLOR}>
        <Text style={{ color: NEWCOLOR.GRAY_4_GRAY_1, fontSize: 12 }}>
          {title}
        </Text>
      </SectionHeader>
    );
  };

  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);
    /**
     * Start
     */
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    // if (bus.num === 2000) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: '도착 정보 없음',
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */
    return (
      <BusInfo
        NEWCOLOR={NEWCOLOR}
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    );
  };

  const ItemSeparatorComponent = () => <ItemSeparator NEWCOLOR={NEWCOLOR} />;

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setNow(dayjs());
      setRefreshing(false);

      // setTimeout(() => {
      //   setNow(dayjs());
      //   setRefreshing(false);
      // }, 3000);
    }
  }, [refreshing]);

  /**
   * 1초의 인터벌을 생성하여 자동으로 타이머 실행
   */
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newNow = dayjs();
  //     setNow(newNow);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <SafeAreaProvider>
      <Container NEWCOLOR={NEWCOLOR}>
        {/* 뒤로가기, 홈 아이콘 */}
        <View>
          <SafeAreaContainer edges={['top']}>
            <ArrowButton iconName={'arrow-left'} />
            <ArrowButton iconName={'home'} />
          </SafeAreaContainer>
          <HeaderBackdrop />
        </View>

        <SectionList
          style={{ flex: 1 }}
          sections={sections}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Container>
    </SafeAreaProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.NEWCOLOR.WHITE_BLACK};
`;

const SafeAreaContainer = styled(SafeAreaView)`
  flex-direction: row;
  justify-content: space-between;
`;

const ListHeaderContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  padding-bottom: 18px;
  background-color: ${COLOR.GRAY_3};
`;

const BusStopId = styled.Text`
  font-size: 13px;
  color: ${(props) => props.NEWCOLOR.WHITE_BLACK};
`;

const BusStopName = styled.Text`
  font-size: 20px;
  color: ${(props) => props.NEWCOLOR.WHITE_BLACK};
`;

const BusStopText = styled.Text`
  font-size: 14px;
  color: ${COLOR.GRAY_1};
`;

const HeaderBookmarkButton = styled(BookmarkButton)`
  border-width: 0.3px;
  border-color: ${(props) => props.NEWCOLOR.GRAY_1_GRAY_4};
  border-radius: ${((busStopBookmarkSize + busStopBookmarkPadding) * 2) / 2}px;
  padding: ${busStopBookmarkPadding}px;
`;

const SectionHeader = styled.View`
  padding: 3px 0 3px 13px;
  background-color: ${(props) => props.NEWCOLOR.GRAY_1_GRAY_4};
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  border-top-color: ${(props) => props.NEWCOLOR.GRAY_2_GRAY_3};
  border-bottom-color: ${(props) => props.NEWCOLOR.GRAY_2_GRAY_3};
`;

const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.NEWCOLOR.GRAY_1_GRAY_4};
`;

const HeaderBackdrop = styled.View`
  position: absolute;
  width: 100%;
  height: 500px;
  background-color: ${COLOR.GRAY_3};
  z-index: -1;
`;
