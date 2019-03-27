import React, { Component } from "react";
import { Button, Text, Icon, View } from "@shoutem/ui";
import Swipeout from "react-native-swipeout";

class RoutineChoiceButton extends React.Component {
  render() {
    let swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          this.props.removeRoutine(this.props.index);
        }
      }
    ];
    return (
      <Swipeout
        right={swipeoutBtns}
        autoClose={true}
        backgroundColor="transparent"
      >
        <Button
          onPress={() => this.props.onPressChooseRoutine(this.props.index)}
          style={{
            width: "100%",
            borderColor: "black",
            borderWidth: 2,
            marginVertical: 3
          }}
        >
          <Text styleName="bold" style={{ fontSize: 40, textAlign: "center" }}>
            {this.props.name}
          </Text>
        </Button>
      </Swipeout>
    );
  }
}
export default RoutineChoiceButton;
