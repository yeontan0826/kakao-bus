import styled from 'styled-components/native';
import { COLOR } from './color';

const NextBusInfo = ({
  hasInfo, // remainedTimeText="도착 정보 없음" -> true
  remainedTimeText, // 8분 0초, 곧 도착, 도착 정보 없음
  numOfRemainedStops,
  seatStatusText, // 1석, 어유, 보통
  NEWCOLOR,
}) => {
  if (!hasInfo) {
    return <NoInfoText NEWCOLOR={NEWCOLOR}>도착 정보 없음</NoInfoText>;
  }
  return (
    <Container>
      <RemainedTimeText NEWCOLOR={NEWCOLOR}>
        {remainedTimeText}
      </RemainedTimeText>
      <InfoBox NEWCOLOR={NEWCOLOR}>
        <NumOfRemainedStopsText NEWCOLOR={NEWCOLOR}>
          {numOfRemainedStops}번째전
        </NumOfRemainedStopsText>
        <SeatStatusText>{seatStatusText}</SeatStatusText>
      </InfoBox>
    </Container>
  );
};

export default NextBusInfo;

const NoInfoText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.NEWCOLOR.GRAY_2_GRAY_3};
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RemainedTimeText = styled.Text`
  margin-right: 10px;
  font-size: 12px;
  color: ${(props) => props.NEWCOLOR.BLACK_WHITE};
`;

const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 2px;
  border-width: 0.5px;
  border-color: ${(props) => props.NEWCOLOR.GRAY_1_GRAY_4};
  border-radius: 3px;
`;

const NumOfRemainedStopsText = styled.Text`
  margin-right: 3px;
  font-size: 12px;
  color: ${(props) => props.NEWCOLOR.GRAY_3_GRAY_2};
`;

const SeatStatusText = styled.Text`
  font-size: 12px;
  color: ${COLOR.CORAL};
`;
