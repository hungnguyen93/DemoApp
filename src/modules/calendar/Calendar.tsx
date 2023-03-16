import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { Calendar, DateData } from "react-native-calendars";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ModalNotion from "~components/modal/ModalNotion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import isEmpty from "lodash.isempty";

const listNameSort = [
  { title: "Started", id: 1, color: "green" },
  { title: "In Progress", id: 2, color: "yellow" },
  { title: "Finished", id: 3, color: "blue" },
  { title: "Canceled", id: 4, color: "red" },
  { title: "All", id: 5, color: "black" },
];

const CalendarScreen = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [listItemChoose, setItemChoose] = useState<any[]>([...listNameSort]);
  // const [dateString, setDateString] = useState<string>("");
  const dateString = useRef<string>();
  const currentIdChoose = useRef<number>(0);
  const vacation = { key: "vacation", color: "blue" };
  const massage = { key: "massage", color: "red" };
  const workout = { key: "workout", color: "green" };
  const [dataCalendar, setDataCalendar] = useState<any>({});
  const [inputText, setInputText] = useState<string>("");

  const loadCalendar = async () => {
    const jsonString = await AsyncStorage.getItem("demo-app");
    const jsonObject = jsonString ? JSON.parse(jsonString) : "";
    setDataCalendar([jsonObject]);
    console.log(jsonObject);
    // Object.assign(this, jsonObject);
  };
  const saveCalendar = () => {
    console.log(dataCalendar);
    const dataTemp: any = { ...dataCalendar };
    console.log("1", (dataTemp[`${dateString.current}`] = { a: 1 }));
    console.log("2", ...dataCalendar[`${dateString.current}`].dots);
    // console.log('3',listItemChoose.filter((item) => item.isCheck)[0].color )

    dataTemp[`${dateString.current}`] = {
      dots: [
        ...dataCalendar[`${dateString.current}`].dots,
        { color: listItemChoose.filter((item) => item.isCheck)[0].color },
      ],
    };
    setDataCalendar(dataTemp);
    setIsVisible(false);
    // let jsonString = "";
    // jsonString = JSON.stringify(data); //value
    // await AsyncStorage.setItem("demo-app", jsonString);
  };

  const onDayPress = (date: DateData) => {
    dateString.current = date.dateString;
    const dataTemp: any = {};
    if (isEmpty(dataCalendar[date.dateString])) {
      dataTemp[`${date.dateString}`] = {
        dots: [],
        selected: true,
        selectedColor: "red",
      };
    } else {
      dataTemp[`${date.dateString}`] = {
        dots: dataCalendar[date.dateString].dots,
        selected: true,
        selectedColor: "red",
      };
    }
    setDataCalendar(dataTemp);
  };

  const handleFilter = (id: number) => {};

  useEffect(() => {
    // loadCalendar();
  }, []);

  return (
    <View>
      <View style={styles.containerRow}>
        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.btn}>
          <Text style={styles.txtBtn}>Create Event</Text>
        </TouchableOpacity>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {listNameSort.map((item, index) => (
            <TouchableOpacity
              // onPress={}
              key={index}
              style={[styles.btn, { backgroundColor: item.color }]}
            >
              <Text style={[styles.txtBtn, { color: "#E0E0E0" }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Calendar
        markingType={"multi-dot"}
        markedDates={dataCalendar}
        onDayPress={(value) => onDayPress(value)}
      />
      <ModalNotion
        onPressCancel={() => {
          setIsVisible(false);
        }}
        onPressOk={saveCalendar}
        title={"Set Calendar"}
        isVisible={isVisible}
        children={
          <View style={{ marginVertical: 30 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txtPopup}>Status: </Text>
              {listItemChoose.map((i, index) => {
                if (index === listItemChoose.length - 1) return null;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      currentIdChoose.current = i.id;
                      setItemChoose((preState) => {
                        const newArr = [...preState];
                        newArr.forEach((item, i) => {
                          if (item !== i) {
                            item.isCheck = false;
                          }
                        });
                        newArr[index].isCheck = true;
                        return newArr;
                      });
                    }}
                    style={[
                      i?.isCheck == true
                        ? styles.tcb_Choose_border
                        : styles.tcb_Choose,
                      { backgroundColor: i.color },
                    ]}
                  />
                );
              })}
            </View>
            <Text style={styles.txtPopup}>DateTime: {dateString.current} </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.txtPopup}>Title: </Text>
              <TextInput
                onChangeText={setInputText}
                style={styles.txtInput}
                placeholder="Please Input Text"
              />
            </View>
          </View>
        }
      />
    </View>
  );
};
export default CalendarScreen;
