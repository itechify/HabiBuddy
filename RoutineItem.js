import React, { Component } from "react";
import {
  Row,
  Icon,
  Title,
  Text,
  View,
  TouchableOpacity,
  Subtitle
} from "@shoutem/ui";

class RoutineItem extends React.Component {
  state = {
    status: "checkbox-off"
  };

  _onPress = () => {
    if (this.state.status == "checkbox-off") {
      this.setState({ status: "checkbox-on" });
    } else {
      this.setState({ status: "checkbox-off" });
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Row styleName="small" style={{ paddingVertical: 50 }}>
          <Icon name={this.state.status} />
          <View styleName="vertical">
            <Subtitle styleName="bold" style={{ fontSize: 18 }}>
              {this.props.workout}
            </Subtitle>
            <Text style={{ fontSize: 12 }}>{this.props.reps}</Text>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
}

export default RoutineItem;
