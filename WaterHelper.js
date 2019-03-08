import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import {
  Text,
  Icon,
  Row,
  ImageBackground,
  View,
  Title,
  TouchableOpacity
} from "@shoutem/ui";

class WaterHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysCount: 0
    };

    AsyncStorage.getItem("todaysCount").then(todaysCount => {
      if (todaysCount != null) {
        this.setState({
          todaysCount: JSON.parse(todaysCount)
        });
      }
    });
  }

  onPressReduceCount = () => {
    const tC = this.state.todaysCount;
    if (tC > 0) {
      this.setState({ todaysCount: tC - 1 });
    }

    AsyncStorage.setItem("todaysCount", JSON.stringify(tC - 1));
  };

  onPressIncreaseCount = () => {
    const tC = this.state.todaysCount;
    this.setState({ todaysCount: tC + 1 });

    AsyncStorage.setItem("todaysCount", JSON.stringify(tC + 1));
  };

  render() {
    return (
      <Row style={{ flex: 1 }}>
        <View styleName="horizontal v-center">
          <View styleName="horizontal h-center" style={{ flex: 1 }}>
            <Text styleName="bold" style={{ fontSize: 30, color: "#00d8ff" }}>
              Water
            </Text>
          </View>
          <View
            styleName="horizontal v-center"
            style={{ justifyContent: "space-between", flex: 1.5 }}
          >
            <TouchableOpacity onPress={this.onPressReduceCount}>
              <Icon name="down-arrow" style={{ fontSize: 75, color: "red" }} />
            </TouchableOpacity>
            <ImageBackground
              styleName="small rounded-corners"
              source={{
                uri: "http://pixelartmaker.com/art/9a2af0b317e433b.png"
              }}
              style={{ height: 100 }}
            >
              <Title
                styleName="bold"
                style={
                  this.state.todaysCount >= 8
                    ? { fontSize: 30, paddingTop: 30, color: "green" }
                    : { fontSize: 30, paddingTop: 30, color: "darkred" }
                }
              >
                {this.state.todaysCount}
              </Title>
            </ImageBackground>
            <TouchableOpacity onPress={this.onPressIncreaseCount}>
              <Icon name="up-arrow" style={{ fontSize: 75, color: "green" }} />
            </TouchableOpacity>
          </View>
        </View>
      </Row>
    );
  }
}

export default WaterHelper;
