import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Auth, API} from 'aws-amplify';
import {listProducts} from '../graphql/queries';
import ProductList from '../components/ProductList';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import TabNavi from '../components/TabNavi';
import SignIn from './SignIn';

export default function Home({updateAuthState, navigation}) {
  //   async function signOut() {
  //     try {
  //       Auth.signOut();
  //       updateAuthState('loggedOut');
  //     } catch (error) {
  //       console.log('Error signing out: ', error);
  //     }
  //   }
  const [productsList, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      const products = await API.graphql({query: listProducts});
      if (products.data.listProducts) {
        console.log('Products: \n');
        console.log(products);
        setProducts(products.data.listProducts.items);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  //   const [refreshing, setRefreshing] = React.useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView styles={styles.ProdCards}>
        {productsList && (
          <ProductList
            productList={productsList}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </SafeAreaView>
    </>
  );
}

// export default function Home({updateAuthState}) {
//   async function signOut() {
//     try {
//       await Auth.signOut();
//       updateAuthState('loggedOut');
//     } catch (error) {
//       console.log('Error signing out: ', error);
//     }
//   }
//   return (
//     <View style={styles.container}>
//       <Text> 💙 + 💛</Text>
//       <Button title="Sign Out" color="tomato" onPress={signOut} />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 20,
//   },
// });

const styles = StyleSheet.create({
  ProdCards: {
    backgroundColor: 'red',
  },
});
