import React, { Component } from "react";
import { Button, Text, Icon } from "@shoutem/ui";

class RoutineChoiceButton extends React.Component {
  render() {
    return (
      <Button onPress={() => this.props.onPressChooseRoutine(this.props.index)}>
        <Text styleName="bold" style={{ fontSize: 40, paddingHorizontal: 20 }}>
          {this.props.name}
        </Text>
      </Button>
    );
  }
}
export default RoutineChoiceButton;
