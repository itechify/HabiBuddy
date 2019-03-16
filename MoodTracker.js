import React, { Component } from "react";
import { AsyncStorage, Dimensions } from "react-native";
import { Row, Title, Text, View, Subtitle, Tile } from "@shoutem/ui";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class MoodTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: null,
      moodHistory: null
    };

    AsyncStorage.getItem("moodData").then(moodData => {
      if (moodData != null) {
        let mH = JSON.parse(moodData).moodHistory;
        if (mH.length != 0) {
          if (mH[mH.length - 1].date != new Date().toLocaleDateString()) {
            this.setState({
              moodHistory: JSON.parse(moodData).moodHistory
            });
          } else {
            this.setState({
              chosen: JSON.parse(moodData).chosen,
              moodHistory: JSON.parse(moodData).moodHistory
            });
          }
        }
      }
    });
  }

  updateMood = mood => {
    let mH = null;
    if (this.state.moodHistory == null) {
      mH = new Array();
    } else {
      mH = this.state.moodHistory.slice(0);
    }
    let todayHist = {
      date: new Date().toLocaleDateString(),
      mood: mood
    };
    if (
      mH.length != 0 &&
      mH[mH.length - 1].date == new Date().toLocaleDateString()
    ) {
      mH.splice(mH.length - 1, 1, todayHist);
    } else {
      mH.push(todayHist);
    }
    this.setState({ chosen: mood, moodHistory: mH });
  };

  componentWillUnmount() {
    AsyncStorage.setItem("moodData", JSON.stringify(this.state));
  }

  render() {
    let width = Dimensions.get("window").width;

    return (
      <Tile
        style={{
          height: 170,
          width: width * 0.87,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Title style={{ textAlignVertical: "center" }}>Today's Mood</Title>
        <View style={{ height: 110 }}>
          <Row>
            <Icon
              name="emoticon-dead"
              size={this.state.chosen == 1 ? 80 : 60}
              color="#e06f6f"
              onPress={() => this.updateMood(1)}
            />
            <Icon
              name="emoticon-sad"
              size={this.state.chosen == 2 ? 80 : 60}
              color="#ffca65"
              onPress={() => this.updateMood(2)}
            />
            <Icon
              name="emoticon-neutral"
              size={this.state.chosen == 3 ? 80 : 60}
              color="#FFEB8E"
              onPress={() => this.updateMood(3)}
            />
            <Icon
              name="emoticon-happy"
              size={this.state.chosen == 4 ? 80 : 60}
              color="#b0db8c"
              onPress={() => this.updateMood(4)}
            />
            <Icon
              name="emoticon-excited"
              size={this.state.chosen == 5 ? 80 : 60}
              color="#BCF1B4"
              onPress={() => this.updateMood(5)}
            />
          </Row>
        </View>
      </Tile>
    );
  }
}
export default MoodTracker;
