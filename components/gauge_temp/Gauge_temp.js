import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import axios from "axios";
import { api_main } from "../../constants/Api_main";
import { api_path } from "../../constants/Api_path";

import Speedometer from "react-native-speedometer-chart";
const windowWidth = Dimensions.get("window").width;

var end_data;
var start_data;
var time_;

const Gauge_temp = ({ date, time_select, itemId }) => {
  const [temp, setTemp] = useState(0);
  const [rangColor_temp, setRangeColor_temp] = useState(0);
  const [temp_min, setTemp_min] = useState(0);
  const [temp_avg, setTemp_avg] = useState(0);
  const [temp_max, setTemp_max] = useState(0);
  const [rangColor, setRangeColor] = useState();
  const [data_result_temp, setData_result_temp] = useState();

  const get_tem = async (api, id, start, end) => {
    let endpoints1 = api + api_path.temp + id + "/" + start + "/" + end;
    let endpoints2 = api + api_path.tempmin + id + "/" + start + "/" + end;
    let endpoints3 = api + api_path.tempavg + id + "/" + start + "/" + end;
    let endpoints4 = api + api_path.tempmax + id + "/" + start + "/" + end;

    const request1 = axios.get(endpoints1);
    const request2 = axios.get(endpoints2);
    const request3 = axios.get(endpoints3);
    const request4 = axios.get(endpoints4);

    axios
      .all([request1, request2, request3, request4])
      .then(
        axios.spread((...responses) => {
          if (responses[0].data.data[0]) {
            const responseOne = responses[0].data.data[0].value;
            const responseTwo = responses[1].data.data[0].value;
            const responesThree = responses[2].data.data[0].value;
            const responesFore = responses[3].data.data[0].value;
            setTemp(responseOne);
            setTemp_min(responseTwo);
            setTemp_avg(responesThree);
            setTemp_max(responesFore);
            // console.log("responseOne", responseOne);
            // console.log("responseTwo", responseTwo);
            // console.log("responesThree", responesThree);
            // console.log("responesFore", responesFore);
            var x = 0;

            var y = " ";
            if (responseOne >= 7.2) {
              x = responseOne - 7.1;
            } else if (responseOne < 7.2) {
              x = 0;
            } else if (responseOne > 8) {
              x = 0.8;
            }
            var a = " ";
            var y = " ";
            if (responseOne >= 7.2 && responseOne < 7.4) {
              a = "#f3f72f";
              y = "LOW";
            } else if (responseOne >= 7.4 && responseOne < 7.8) {
              a = "#00b928";
              y = "OK";
            } else if (responseOne >= 7.8 && responseOne <= 8) {
              a = "#c71d1d";
              y = "HIGH";
            } else {
              a = "#c71d1d";
              y = "-";
            }
            setRangeColor(a);
            setRangeColor_temp(x);
            setData_result_temp(y);
            // 7.2 - 8.0;
          }

          // console.log(rangColor_temp);
        })
      )
      .catch((errors) => {
        // react on errors.
        console.error(errors);
      });
  };

  function convertDate2(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    // // console.log("time ", d);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }

  if (date.endDate && time_select) {
    const dateStart = JSON.stringify(date.startDate);
    const dateEnd = JSON.stringify(date.endDate);
    const resultdateStart = dateStart.slice(1, dateStart.length - 1);
    const resultdateEnd = dateEnd.slice(1, dateEnd.length - 1);
    // // console.log("bbb");
    const c_start = convertDate2(date.startDate);
    const c_end = convertDate2(date.endDate);

    const resultdateEndB = dateEnd.slice(1, dateEnd.length - 3);
    const resultdateStartB = dateStart.slice(1, dateStart.length - 3);
    if (
      end_data != resultdateEndB ||
      start_data != resultdateStartB ||
      time_ != time_select
    ) {
      end_data = resultdateEndB;
      start_data = resultdateStartB;
      time_ = time_select;
      if (c_start == c_end) {
        var date = new Date(c_end);
        date.setDate(date.getDate() + 1);
        const new_date = JSON.stringify(date);
        const new_date_ = new_date.slice(1, new_date.length - 1);
        get_tem(
          api_main.main_brix,
          itemId,
          resultdateStart,
          new_date_,
          // time_select
        );
      } else {
        get_tem(
          api_main.main_brix,
          itemId,
          resultdateStart,
          resultdateEnd,
          // time_select
        );
      }

      // get_tem(api_main.main_brix, itemId, resultdateStart, resultdateEnd);
    }
  }

  // console.log("gauge temp");
  return (
    <View style={styles.box}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 5,
          paddingLeft: 10,
          width: "100%",
        }}
      >
        Temp (°C)
      </Text>

      <Speedometer
        value={rangColor_temp}
        totalValue={0.8}
        size={windowWidth - 70}
        showIndicator
        outerColor="#e6e6e6"
        internalColor={rangColor}
        indicatorColor="#fff"
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginTop: 5,
        }}
      >
        Temp : {temp.toFixed(2)} °C ( {data_result_temp} )
      </Text>
      <View style={styles.box2}>
        <View style={styles.box_avg}>
          <View style={styles.txt_min}>
            <Text>MIN.</Text>
          </View>
          <Text style={styles.text_}>{temp_min.toFixed(2)} %</Text>
        </View>
        <View style={styles.box_avg}>
          <View style={styles.txt_avg}>
            <Text>AVG.</Text>
          </View>
          <Text style={styles.text_}>{temp_avg.toFixed(2)} %</Text>
        </View>
        <View style={styles.box_avg}>
          <View style={styles.txt_max}>
            <Text>MAX.</Text>
          </View>
          <Text style={styles.text_}>{temp_max.toFixed(2)} %</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  box2: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  box_avg: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  txt_min: {
    height: 50,
    width: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f72f",
    borderRadius: 50,
    marginRight: 10,
  },
  txt_avg: {
    height: 50,
    width: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00b928",
    borderRadius: 50,
    marginRight: 10,
  },
  txt_max: {
    height: 50,
    width: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c71d1d",
    borderRadius: 50,
    marginRight: 10,
  },
  text_: {
    fontSize: 18,
  },
});
export default Gauge_temp;
