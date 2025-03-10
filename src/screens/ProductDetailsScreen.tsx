import React, {FC, useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../assests/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getProductDetails} from '../store/productSlice';
import {addProduct} from '../store/cartSlice';

interface ProductDetailsScreenProps {}

const ProductDetailsScreen: FC<ProductDetailsScreenProps> = props => {
  const {id: productId} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {products, productDetails} = useSelector(state => state.products);

  const {category, description, id, image, price, title} = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  function handleAddToCartPressed() {
    const itemToBeAdded = products.filter(item => item.id === id);
    dispatch(addProduct(itemToBeAdded));
  }

  return (
    <View style={styles.screenContainer}>
      {image ? <Image style={styles.imageStyle} source={image} /> : null}
      <View style={{flexDirection: 'row'}}>
        <View>
          {title ? <Text>{title}</Text> : null}
          {category ? <Text>{category}</Text> : null}
          {description ? <Text>{description}</Text> : null}
        </View>
        {price ? <Text>{price}</Text> : null}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleAddToCartPressed}>
        Add to Cart
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.COLOR_WHITE,
  },
  imageStyle: {
    height: 400,
    width: Dimensions.get('screen').width,
    resizeMode: 'contain',
  },
  buttonContainer: {
    backgroundColor: 'red',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;
