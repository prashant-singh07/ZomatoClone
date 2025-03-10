import React, {FC, useCallback, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../assests/theme';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../store/productSlice';
import ProductCard from './ProductCard';
import {useNavigation} from '@react-navigation/native';

interface ProductsScreenProps {}

const ProductsScreen: FC<ProductsScreenProps> = props => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.products);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleCardPress = useCallback((id?: number | undefined) => {
    console.log('id');
    const routeParam = {id};
    navigation.navigate('ProductDetailsScreen', routeParam);
  }, []);

  function renderCard({item, index}) {
    const {category, description, id, image, price, title} = item;
    return (
      <ProductCard
        category={category}
        id={id}
        description={description}
        title={title}
        image={image}
        price={price}
        onPress={handleCardPress}
      />
    );
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.id?.toString()}
        renderItem={renderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.COLOR_WHITE,
  },
});

export default ProductsScreen;
