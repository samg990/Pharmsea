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
import {Button} from 'react-native-elements';
import config from './src/aws-exports';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ConfirmSignUp from './src/screens/ConfirmSignUp';
import Home from './src/screens/Home';
import DrawerMenu from './src/components/DrawerMenu';
Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};
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
                      // navigation.navigate('SignIn');
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
        name="SignIn"
        component={SignIn}
        options={{
          title: 'SignIn',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
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
const Initializing = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  useEffect(() => {
    checkAuthState();
  }, []);
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('✅ User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('❌ User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  addButton: {
    marginRight: 20,
  },
  logOutBtn: {
    marginLeft: 10,
  },
});

export default App;
