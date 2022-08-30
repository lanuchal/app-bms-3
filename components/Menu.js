import {
  View,
  Text,
  Alert,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { Button } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Links from "./Links";
import { AuthContext } from "../constants/Context";

import Icon from "react-native-vector-icons/FontAwesome";

const product = [
  {
    id: "1",
    name: "EST COLA LESS SUGAR \n7.5%",
    names: "EST COLA LESS SUGAR 7.5%",
    max: 10,
  },
  {
    id: "2",
    name: "EST Cola \n9.5%",
    names: "EST Cola 9.5%",
    max: 10,
  },
  {
    id: "3",
    name: "EST PLAY KAMIKAZE \n7.5%",
    names: "EST PLAY KAMIKAZE 7.5%",
    max: 10,
  },
  {
    id: "4",
    name: "EST PLAY PINK BOMB \n7.5%",
    names: "EST PLAY PINK BOMB 7.5%",
    max: 10,
  },
  {
    id: "5",
    name: "EST PLAY ORANGE \n(LS) 7.5%",
    names: "EST PLAY ORANGE (LS) 7.5%",
    max: 10,
  },
  {
    id: "6",
    name: "EST PLAY ORANGER \n(HFS) 7.5%",
    names: "EST PLAY ORANGER (HFS) 7.5%",
    max: 10,
  },
  {
    id: "7",
    name: "EST PLAY STRAWBERRY \n(LS) 7.5%",
    names: "EST PLAY STRAWBERRY (LS) 7.5%",
    max: 10,
  },
  {
    id: "8",
    name: "EST PLAY STRAWBERRY \n(HFS) 7.5%",
    names: "EST PLAY STRAWBERRY (HFS) 7.5%",
    max: 10,
  },
  {
    id: "9",
    name: "EST PLAY LEMON LIME \n(LS) 7.5%",
    names: "EST PLAY LEMON LIME (LS) 7.5%",
    max: 10,
  },
  {
    id: "10",
    name: "EST PLAY LEMON LIME \n(HFS) 7.5%",
    names: "EST PLAY LEMON LIME (HFS) 7.5%",
    max: 10,
  },
  {
    id: "11",
    name: "EST PLAY CREAM SODA \n7.5%",
    names: "EST PLAY CREAM SODA 7.5%",
    max: 10,
  },
  {
    id: "12",
    name: "EST PLAY CRAPE BERRY \n5.5%",
    names: "EST PLAY CRAPE BERRY 5.5%",
    max: 10,
  },
  {
    id: "13",
    name: "EST PLAY Salry LYCHEE \n5.5%",
    names: "EST PLAY Salry LYCHEE 5.5%",
    max: 10,
  },
  { id: "14", name: "PRODUCT \n14", names: "PRODUCT 14", max: 10 },
  { id: "15", name: "PRODUCT \n15", names: "PRODUCT 15", max: 10 },
];

const Drawer = createDrawerNavigator();

const Menu = () => {
  const { signOut } = useContext(AuthContext);
  const signOut_func = () => {
    Alert.alert("ออกจากระบบ", "ยืนยันออกจากระบบ", [
      { text: "ยืนยัน", onPress: () => signOut() },
      { text: "ยกเลิก" },
    ]);
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#215199",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 16,
          },
        }}
      >
        {product.map((index, key) => {
          return (
            <Drawer.Screen
              key={key}
              name={index.names}
              component={Links}
              initialParams={{ itemId: index.id, state_load: true , maxs: index.max}}
              options={{
                headerRight: () => (
                  <Button
                    type="clear"
                    disabledStyle={{
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                    disabledTitleStyle={{ color: "#fff" }}
                    linearGradientProps={null}
                    icon={<Icon name="sign-out" size={22} color="#fff" />}
                    iconContainerStyle={{ background: "#fff" }}
                    loadingProps={{ animating: true }}
                    loadingStyle={{}}
                    onPress={() => signOut_func()}
                    title=" "
                    titleStyle={{ marginHorizontal: 1 }}
                  />
                ),
              }}
            />
          );
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Menu;
