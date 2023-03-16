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
import Container from "~components/Container";

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
  const dateString = useRef<any>();
  const currentIdChoose = useRef<number>(0);
  const [dataCalendar, setDataCalendar] = useState<any>({});
  const [dataList, setDataList] = useState<any>([]);
  const inputTitle = useRef<string>("");
  const dataStorage = useRef<any>({});

  const loadCalendar = async () => {
    const jsonString = await AsyncStorage.getItem("demo-app");
    const jsonObject = jsonString ? JSON.parse(jsonString) : "";
    if (jsonObject) {
      dataStorage.current = jsonObject;
      setDataCalendar(jsonObject);
    }
    console.log(jsonObject);
    // Object.assign(this, jsonObject);
  };
  const saveCalendar = () => {
    const dataTemp: any = { ...dataCalendar };
    dataTemp[`${dateString.current}`] = {
      ...dataCalendar[`${dateString.current}`],
      dots: [
        ...dataCalendar[`${dateString.current}`].dots,
        { color: listItemChoose.filter((item) => item.isCheck)[0].color },
      ],
      title: dataCalendar[`${dateString.current}`].title
        ? [...dataCalendar[`${dateString.current}`].title, inputTitle.current]
        : [inputTitle.current],
    };
    console.log("dataTemp", dataTemp);
    inputTitle.current = "";
    setDataCalendar(dataTemp);
    setIsVisible(false);
    dataStorage.current[dateString.current] = {
      ...dataTemp[dateString.current],
    };
    saveToLocalStorage(dataStorage.current);

    handleDataList(dataTemp, dateString.current);
  };

  const saveToLocalStorage = async (data: any) => {
    const dataTemp = { ...data };
    dataTemp[dateString.current].selected = false;
    const dataJson = JSON.stringify(dataTemp);
    await AsyncStorage.setItem("demo-app", dataJson);
  };

  const onDayPress = (date: DateData) => {
    dateString.current = date.dateString;
    const dataTemp: any = {};
    if (isEmpty(dataCalendar)) {
      dataTemp[`${date.dateString}`] = {
        dots: [],
        selected: true,
        selectedColor: "red",
      };
    } else {
      for (const property in dataCalendar) {
        if (dataCalendar[property].dots.length > 0) {
          dataTemp[`${property}`] = {
            ...dataCalendar[`${property}`],
            dots: dataCalendar[property].dots,
            selected: property === date.dateString,
            selectedColor: "red",
          };
        }
      }
      if (isEmpty(dataCalendar[`${date.dateString}`])) {
        dataTemp[`${date.dateString}`] = {
          dots: [],
          selected: true,
          selectedColor: "red",
        };
      }
      handleDataList(dataTemp, date.dateString);
    }
    setDataCalendar(dataTemp);
  };

  const handleDataList = (data: any, date: any) => {
    const dataListTemp = [];
    for (let i = 0; i < data[`${date}`].dots.length; i++) {
      const element = data[`${date}`].dots[i];
      dataListTemp.push({
        title: data[`${date}`].title[i],
        status: element.color,
      });
    }
    setDataList(dataListTemp);
  };

  const handleButtonFilter = (color: string) => {
    let dataTemp: any = {};

    if (color === "black") {
      dataTemp = { ...dataStorage.current };
    } else {
      for (const property in dataStorage.current) {
        for (let i = 0; i < dataStorage.current[property].dots.length; i++) {
          const element = dataStorage.current[property].dots[i];
          if (element.color === color) {
            dataTemp[`${property}`] = {
              dots: [{ color: element.color }],
              title: [dataStorage.current[property].title[i]],
            };
          }
        }
      }
    }

    console.log("dataTemp filter", dataTemp);
    setDataCalendar(dataTemp);
    dataList.length > 0 && setDataList([]);
  };

  useEffect(() => {
    loadCalendar();
  }, []);

  return (
    <Container>
      <View style={styles.containerRow}>
        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.btn}>
          <Text style={styles.txtBtn}>Create Event</Text>
        </TouchableOpacity>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {listNameSort.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleButtonFilter(item.color)}
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
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          keyExtractor={(_, index) => `${index}`}
          ItemSeparatorComponent={() => (
            <View style={{ height: 0.5, backgroundColor: "gray" }} />
          )}
          data={dataList}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 5,
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: item.status,
                  }}
                />
                <Text style={{ fontSize: 18, marginLeft: 10 }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
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
                      setItemChoose(
                        listItemChoose.map((item) => {
                          return { ...item, isCheck: item.id === i.id };
                        })
                      );
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
                onChangeText={(text) => (inputTitle.current = text)}
                style={styles.txtInput}
                placeholder="Please Input Text"
              />
            </View>
          </View>
        }
      />
    </Container>
  );
};
export default CalendarScreen;
