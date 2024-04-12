import React, {useState} from 'react';
import {Image, ListRenderItem} from 'react-native';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ImagesAssets } from '../../../Constants';
import { ListRenderItemInfo } from 'react-native';

interface Props {
  images: string[];
}

const ImageSliderWithDots: React.FC<Props> = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  const renderItem = (image: ListRenderItemInfo<string>) => (
    <View style={styles.image}>
      <Image
        source={{uri: image.item}}
        defaultSource={ImagesAssets.placeholderImage}
      />
    </View>
  );

  const renderDot = (index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.dot, index === activeIndex && styles.activeDot]}
      onPress={() => handleSlideChange(index)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index.toString()}`}
        onScroll={({nativeEvent}) => {
          const slideWidth = Dimensions.get('window').width;
          const currentIndex = Math.ceil(
            nativeEvent.contentOffset.x / slideWidth,
          );
          setActiveIndex(currentIndex);
        }}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => renderDot(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400
  },
  image: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  dotsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});

export default ImageSliderWithDots;
