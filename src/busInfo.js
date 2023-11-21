import { View } from 'react-native';
import styled from 'styled-components/native';

import { COLOR } from './color';
import NextBusInfo from './nextBusInfo';
import BookmarkButton from './bookmarkButton';
import AlarmButton from './alarmButton';

const BusInfo = ({
  isBookmarked,
  onPressBookmark,
  num,
  directionDescription,
  numColor,
  processedNextBusInfos,
  NEWCOLOR,
}) => {
  return (
    <Container NEWCOLOR={NEWCOLOR}>
      <LeftContainer>
        {/* 북마크 */}
        <BookmarkButton
          NEWCOLOR={NEWCOLOR}
          size={20}
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
          style={{ paddingHorizontal: 10 }}
        />
        {/* 버스번호, 방향 */}
        <View style={{ flex: 1 }}>
          <BusNum numColor={numColor}>{num}</BusNum>
          <BusDirectionDescription>
            {directionDescription} 방향
          </BusDirectionDescription>
        </View>
      </LeftContainer>
      <RightContainer>
        {/* m분 s초 / n번째 전 / 여유 */}
        <View style={{ flex: 1 }}>
          {processedNextBusInfos.map((info, index) => (
            <NextBusInfo
              NEWCOLOR={NEWCOLOR}
              key={`next-bus-info-${index}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
        {/* 알람 아이콘 */}
        <AlarmButton
          NEWCOLOR={NEWCOLOR}
          onPress={() => {}}
          style={{ paddingHorizontal: 14 }}
        />
      </RightContainer>
    </Container>
  );
};

export default BusInfo;

const Container = styled.View`
  flex-direction: row;
  height: 75px;
  background-color: ${(props) => props.NEWCOLOR.WHITE_BLACK};
`;

const LeftContainer = styled.View`
  flex: 0.85;
  flex-direction: row;
  align-items: center;
`;

const BusNum = styled.Text`
  font-size: 20px;
  color: ${(props) => props.numColor};
`;

const BusDirectionDescription = styled.Text`
  margin-right: 5px;
  font-size: 13px;
  color: ${COLOR.GRAY_3};
`;

const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
