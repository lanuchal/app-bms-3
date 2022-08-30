import React, { useEffect, useState, useMemo, useContext } from 'react';
import Signin from './components/Signin';
import Menu from './components/Menu';
import Loadpage from './components/Loadpage'
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './constants/Context';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function MyStack() {

  return (
    <Stack.Navigator
      initialRouteName="signIns"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#339933",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="signIn"
        component={Signin}
        options={{ title: "Signin", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [userId, setUserId] = useState("");

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (preState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...preState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...preState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...preState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "HOME":
        return {
          ...preState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = useMemo(() => ({
    signIn: async (userName, inputUserName, passWord, inputPassWord, id) => {
      console.log("username = " + userName + "/" + inputUserName);
      console.log("password = " + passWord + "/" + inputPassWord);

      let userToken;
      userToken = null;
      if (userName == inputUserName ) {
        try {
          userToken = String(id);
          console.log("login");
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({ type: "LOGIN", id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },
    home: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "HOME" });
    },
    setUserID: (input) => {
      setUserId(input);
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        
        setUserId(userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIVE_TOKEN", token: userToken });
    }, 500);
  }, []);

  if (loginState.isLoading) {
    return (
      <Loadpage />
    );
  }
  console.log("userToken => " + loginState.userToken);
  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken != null ? (
        <Menu userId={userId} />
      ) : (
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
}

export default App;
