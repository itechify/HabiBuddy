import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  Row,
  Icon,
  Title,
  Text,
  View,
  Subtitle,
  Tile,
  TextInput,
  Caption
} from "@shoutem/ui";
import Swipeout from "react-native-swipeout";
import { AsyncStorage } from "react-native";

class RoutineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "checkbox-off",
      lastweight: "0"
    };

    this.hasChanged = false;

    AsyncStorage.getItem(this.props.workout).then(workoutInfo => {
      if (workoutInfo != null) {
        this.setState({
          lastweight: JSON.parse(workoutInfo).lastweight
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.hasChanged)
      AsyncStorage.setItem(this.props.workout, JSON.stringify(this.state));
  }

  onChangeWeightText = text => {
    this.setState({ lastweight: text });
    this.hasChanged = true;
  };

  _onPress = () => {
    if (this.state.status == "checkbox-off") {
      this.setState({ status: "checkbox-on" });
    } else {
      this.setState({ status: "checkbox-off" });
    }
  };

  render() {
    let swipeoutBtns = [
      {
        component: (
          <Tile style={{ flex: 1, alignItems: "center" }}>
            <Caption style={{ fontSize: 14 }}>Weight</Caption>
            <TextInput
              defaultValue={this.state.lastweight.toString()}
              onChangeText={this.onChangeWeightText}
              style={{
                fontSize: 25,
                padding: 0,
                margin: 0,
                borderWidth: 0,
                textAlign: "center"
              }}
            />
          </Tile>
        )
      }
    ];

    return (
      <Swipeout
        right={swipeoutBtns}
        autoClose={false}
        backgroundColor="transparent"
        buttonWidth={150}
      >
        <Row styleName="small" style={{ paddingVertical: 50 }}>
          <TouchableWithoutFeedback onPress={this._onPress}>
            <Icon name={this.state.status} style={{ fontSize: 30 }} />
          </TouchableWithoutFeedback>
          <View styleName="vertical">
            <Subtitle styleName="bold" style={{ fontSize: 18 }}>
              {this.props.workout}
            </Subtitle>
            <Text style={{ fontSize: 12 }}>{this.props.reps}</Text>
          </View>
        </Row>
      </Swipeout>
    );
  }
}

export default RoutineItem;
