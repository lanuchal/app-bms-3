import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import Brix from "./brix/Brix";
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import RNPickerSelect from "react-native-picker-select";
import Temp from "./temp/Temp";
import Loadpage from "./Loadpage";
import Gauge_temp from "./gauge_temp/Gauge_temp";
import Gauge_brix from "./gauge_brix/Gauge_brix";

const windowWidth = Dimensions.get("window").width;

const Links = ({ navigation, route }) => {
  const { itemId ,maxs } = route.params;
  const [isLoading_log, setIsLoading_log] = useState(navigation ? true : false);
  const [dateRange, setDateRange] = useState({
    startDate: moment(),
    endDate: moment(),
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading_log(true);
      setTime_select("5m");
      setDateRange({
        startDate: moment(),
        endDate: moment(),
      });
      setTimeout(() => {
        setIsLoading_log(false);
      }, 200);
    });
    return unsubscribe;
  }, [navigation]);

  const [displayedDate, setDisplayedDate] = useState(moment());

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    // // console.log("time ", d);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
  }

  const onChangeDate = (dates) => {
    setDateRange((dateRange) => ({
      ...dateRange,
      ...dates,
    }));
    dates.displayedDate ? setDisplayedDate(dates.displayedDate) : undefined;
    var start = convertDate(dates.start);
  };

  const [time_select, setTime_select] = useState("5m");

  const time_data = [
    { label: "5m", value: "5m" },
    { label: "10m", value: "10m" },
    { label: "30m", value: "30m" },
    { label: "1h", value: "1h" },
    { label: "6h", value: "6h" },
    { label: "1d", value: "1d" },
    { label: "7d", value: "7d" },
  ];

  const onchangeTime = (value) => {
    setTime_select(value);
  };

  if (isLoading_log) {
    return <Loadpage />;
  }
  return (
    <View style={styles.box}>
      <DateRangePicker
        onChange={(e) => onChangeDate(e)}
        endDate={dateRange.endDate}
        startDate={dateRange.startDate}
        displayedDate={displayedDate}
        range
      >
        <View style={styles.btn_time}>
          <Text style={{ fontSize: 16, color: "#000" }}>date</Text>
        </View>
      </DateRangePicker>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#448fff",
          width: "48%",
          borderRadius: 6,
          height: 50,
          top: 5,
          right: 10,
        }}
      >
        <RNPickerSelect
          placeholder={{ label: "select time", value: "5m" }}
          value={time_select}
          onValueChange={(value) => onchangeTime(value)}
          items={time_data}
        />
      </View>
      <ScrollView>
        <Brix date={dateRange} time_select={time_select} itemId={itemId} maxs={maxs}/>
        <Temp date={dateRange} time_select={time_select} itemId={itemId} maxs={maxs}/>

        <Gauge_brix
          date={dateRange}
          time_select={time_select}
          itemId={itemId}
        />
        <Gauge_temp
          date={dateRange}
          time_select={time_select}
          itemId={itemId}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: "#e6e6e6",
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btn_time: {
    zIndex: 10,
    right: 0,
    width: "48%",
    backgroundColor: "#448fff",
    height: 50,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default Links;
