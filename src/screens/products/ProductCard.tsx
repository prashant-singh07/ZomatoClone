import React, {FC, memo, useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../assests/theme';

interface ProductCardProps {
  id?: number | undefined;
  title?: string | undefined;
  price?: number | undefined;
  description?: string | undefined;
  category?: string | undefined;
  image?: string | undefined;
  onPress?: (id: number | undefined) => void;
}

const ProductCard: FC<ProductCardProps> = props => {
  const {category, description, id, image, price, title, onPress} = props;
  useEffect(() => {
    //make the server call to get data
  }, []);

  function handleCardPress() {
    onPress?.(id);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.cardContainer}
      onPress={handleCardPress}>
      {image ? <Image style={styles.imageStyle} source={image} /> : null}
      <View style={{flexDirection: 'row'}}>
        <View>
          {title ? <Text>{title}</Text> : null}
          {category ? <Text>{category}</Text> : null}
          {description ? <Text>{description}</Text> : null}
        </View>
        {price ? <Text>{price}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.COLOR_WHITE,
    borderRadius: 20,
  },
  imageStyle: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
});

export default memo(ProductCard);
