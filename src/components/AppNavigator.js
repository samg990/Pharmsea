import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddProductScreen from './src/screens/add-products-screen';
import App from '../../App';
import {Button} from 'react-native-elements';

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    // <AppStack.Navigator>
    //   <AppStack.Screen name="Home">
    //     {screenProps => (
    //       <Home {...screenProps} updateAuthState={props.updateAuthState} />
    //     )}
    //   </AppStack.Screen>
    // </AppStack.Navigator>

    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          title: 'PharmaSea',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerRight: props => (
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddProduct')}>
                <Icon name={'plus'} size={20} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  Auth.signOut()
                    .then(() => {
                      props.updateAuthState('loggedOut');
                    })
                    .catch(err => {
                      console.log('err: ', err);
                    })
                }>
                <Icon name="sign-out" size={25} color="#000000" />
              </TouchableOpacity>
            </View>
          ),

          // headerLeft: () => (
          //   <View style={styles.logOutBtn}>
          //     <Button
          //       icon={<Icon name="Menu" size={25} color="#000000" />}
          //       onPress={() => navigation.openDrawer()}
          //       type="clear"
          //     />
          //   </View>
          // ),
        })}
      />

      <AppStack.Screen
        name="AddProduct"
        buttonStyle={styles.addButton}
        component={AddProductScreen}
        options={{
          title: 'Add Product',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
