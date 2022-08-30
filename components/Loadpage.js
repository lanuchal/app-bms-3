
import React, { useState, useContext } from "react";
import { View, Text,ActivityIndicator } from "react-native";

const Loadpage = ()=>{
  return(
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 10, color: '#448fff' }}>
          loading
        </Text>
        <ActivityIndicator size="large" color="#448fff" />
      </View>
  )
}
export default Loadpage;