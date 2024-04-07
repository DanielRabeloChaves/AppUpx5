import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function CustomCarousel({ data }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef(null);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          const nextSlide = (activeSlide + 1) % data.length;
          carouselRef.current.snapToItem(nextSlide);
          setActiveSlide(nextSlide);
        }
      }, 5000);
  
      return () => clearInterval(interval);
    }, [activeSlide, data.length]);
  
    const renderImageItem = ({ item }) => {
      return (
        <View>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.imageText}>{item.text}</Text>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderImageItem}
          sliderWidth={300}
          itemWidth={300}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <View style={styles.navigateImages}>
          <TouchableOpacity style={styles.arrowButton} onPress={() => {
            if (carouselRef.current) {
              const prevSlide = (activeSlide - 1 + data.length) % data.length;
              carouselRef.current.snapToItem(prevSlide);
              setActiveSlide(prevSlide);
            }
          }}>
            <Text style={styles.arrowText}>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.pagination}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeSlide ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity style={[styles.arrowButton]} onPress={() => {
            if (carouselRef.current) {
              const nextSlide = (activeSlide + 1) % data.length;
              carouselRef.current.snapToItem(nextSlide);
              setActiveSlide(nextSlide);
            }
          }}>
            <Text style={styles.arrowText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  navigateImages: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 5,
    backgroundColor: "red"
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: '#5B5E61',
  },
  activeDot: {
    backgroundColor: '#3D61B6',
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 1,
  },
  arrowText: {
    color: '#5B5E61',
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageText: {
    marginVertical: 20,
    textAlign: 'center'
  }
});
