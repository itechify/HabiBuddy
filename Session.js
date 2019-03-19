import React, { Component } from "react";
import {
  ListView,
  Row,
  Icon,
  Title,
  Subtitle,
  Text,
  View,
  Button,
  Tile,
  TouchableOpacity
} from "@shoutem/ui";
import Modal from "react-native-modal";
import RoutineItem from "./RoutineItem";

class Session extends React.Component {
  renderRoutine() {
    return (
      <View styleName="vertical">
        {this.props.routine.items.map((id, i) => (
          <RoutineItem
            workout={this.props.routineItems[id].workout}
            reps={this.props.routineItems[id].reps}
            lastWeight={this.props.routineItems[id].lastWeight}
            key={i}
          />
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderRoutine()}
        <View
          styleName="vertical"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            style={{
              borderColor: "black",
              paddingHorizontal: 20
            }}
            onPress={this.props.completeSession}
          >
            <Text style={{ fontSize: 20 }}>Complete Session</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Session;
