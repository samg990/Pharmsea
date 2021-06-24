import React from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl} from 'react-native';

import ProductCard from './ProductCard';

const ProductList = ({productList, refreshing, onRefresh}) => {
  return (
    <View style={styles.productsView}>
      {productList && (
        <FlatList
          style={styles.productList}
          contentContainerStyle={{margin: 2}}
          horizontal={false}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={item => item.id}
          data={productList}
          renderItem={({item}) => {
            return (
              <ProductCard
                productName={item.name}
                productImage={item.image}
                productOwner={item.userName}
                productPrice={item.price}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 15,
  },
  productText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  productsView: {
    paddingTop: 0,
    paddingBottom: 55,
    margin: 20,
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    flexDirection: 'row',

    padding: 0,
    marginBottom: 20,
  },
});
export default ProductList;
