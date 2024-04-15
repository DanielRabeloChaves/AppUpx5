import React from 'react'
import { Dimensions, Text, View, Image, StyleSheet  } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { imagesCarouselHome } from '../util/objects'
import { font } from '../theme';

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;

function CustomCarousel() {
    return (
        <View style={{marginVertical: 10}}>
            <Carousel
                style={styles.carousel}
                pagingEnabled={true}
                enableSnap={true}
                loop={true}
                autoPlay={true}
                autoPlayReverse={false}
                width={280}
                mode="stack"
                data={imagesCarouselHome}
                scrollAnimationDuration={3000}
                renderItem={({ item, index }) => (
                  <View style={styles.container}>
                      <View>
                        <Image style={styles.image} source={item.image} />
                        <View style={styles.body}><Text style={styles.title}>{item.title}</Text></View>
                      </View>
                      <View style={styles.body}><Text style={styles.text}>{item.text}</Text></View>
                  </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    height: "100%",
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 5,
    elevation: 5,
  },
  carousel: {
    height: 310,
    width: PAGE_WIDTH,
    paddingVertical: 3,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 5,
  },
  text: {
    fontFamily: font.fontFamily,
    fontSize: 12,
    marginBottom: 10
  },
  title: {
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 16,
  }
})

export default CustomCarousel;