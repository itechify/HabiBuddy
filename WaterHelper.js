import React, { Component } from "react";
import {
  AsyncStorage,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import {
  Text,
  Icon,
  Row,
  ImageBackground,
  View,
  Title,
  TouchableOpacity,
  Subtitle,
  Tile,
  Caption
} from "@shoutem/ui";

class WaterHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hydrationData: {
        todaysCount: 0,
        today: new Date().toLocaleDateString()
      },
      showInfo: false
    };

    AsyncStorage.getItem("hydrationData").then(hydrationData => {
      if (hydrationData != null) {
        if (
          JSON.parse(hydrationData).today == new Date().toLocaleDateString()
        ) {
          this.setState({
            hydrationData: JSON.parse(hydrationData)
          });
        }
      }
    });
  }

  onPressReduceCount = () => {
    let hD = { ...this.state.hydrationData };
    if (hD.todaysCount > 0) {
      hD.todaysCount--;
      this.setState({ hydrationData: hD });
      AsyncStorage.setItem("hydrationData", JSON.stringify(hD));
    }
  };

  onPressIncreaseCount = () => {
    let hD = { ...this.state.hydrationData };
    hD.todaysCount++;
    this.setState({ hydrationData: hD });

    AsyncStorage.setItem("hydrationData", JSON.stringify(hD));
  };

  render() {
    let width = Dimensions.get("window").width;

    return (
      <Tile
        style={{
          height: 160,
          width: width * 0.87,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          styleName="horizontal v-center"
          style={{
            justifyContent: "space-between",
            paddingBottom: 4
          }}
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
            <TouchableWithoutFeedback
              onPress={() =>
                this.state.showInfo
                  ? this.setState({ showInfo: false })
                  : this.setState({ showInfo: true })
              }
            >
              <Title
                styleName="bold"
                style={
                  this.state.hydrationData.todaysCount >= 8
                    ? { fontSize: 30, paddingTop: 30, color: "green" }
                    : { fontSize: 30, paddingTop: 30, color: "darkred" }
                }
              >
                {this.state.hydrationData.todaysCount}
              </Title>
            </TouchableWithoutFeedback>
          </ImageBackground>
          <TouchableOpacity onPress={this.onPressIncreaseCount}>
            <Icon name="up-arrow" style={{ fontSize: 75, color: "green" }} />
          </TouchableOpacity>
        </View>
        {this.state.showInfo && (
          <View style={{ opacity: 0.33 }} styleName="horizontal">
            <Caption
              style={
                8 - this.state.hydrationData.todaysCount > 0
                  ? { fontSize: 15, paddingBottom: 1, color: "darkred" }
                  : { fontSize: 15, paddingBottom: 1, color: "green" }
              }
              styleName="bold"
            >
              {Math.max(8 - this.state.hydrationData.todaysCount, 0)}
            </Caption>
            <Caption style={{ fontSize: 13, paddingLeft: 5 }}>
              more cups of water to reach daily goal!
            </Caption>
          </View>
        )}
      </Tile>
    );
  }
}

export default WaterHelper;
