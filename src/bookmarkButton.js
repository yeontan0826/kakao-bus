import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLOR } from './color';

const useBookmark = (initialIsBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const toggleIsBookmarked = () => setIsBookmarked((prev) => !prev);

  return {
    isBookmarked,
    toggleIsBookmarked,
  };
};

const BookmarkButton = ({
  size,
  isBookmarked: isBookmarkedProp,
  onPress,
  style,
  NEWCOLOR,
}) => {
  const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        toggleIsBookmarked();
        onPress();
      }}
    >
      <Ionicons
        name="star"
        size={size}
        color={isBookmarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4}
      />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
