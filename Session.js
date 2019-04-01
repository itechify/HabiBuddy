import React, { Component } from "react";
import { ScrollView } from "react-native";
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
import Exercise from "./Exercise";

class Session extends React.Component {
  renderRoutine() {
    return (
      <ScrollView>
        {this.props.routine.items.map((id, i) => {
          if (this.props.exercises[id] != null) {
            return (
              <Exercise
                workout={this.props.exercises[id].workout}
                reps={this.props.exercises[id].reps}
                lastWeight={this.props.exercises[id].lastWeight}
                key={i}
                id={id}
                updateExerciseLastWeight={this.props.updateExerciseLastWeight}
              />
            );
          }
        })}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderRoutine()}
        <View
          styleName="vertical"
          style={{
            height: 100,
            justifyContent: "center",
            alignItems: "center"
          }}
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
