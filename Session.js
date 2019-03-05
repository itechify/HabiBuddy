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
    if (this.props.sessionType == 1) {
      return this.renderPullRoutine();
    } else if (this.props.sessionType == 2) {
      return this.renderPushRoutine();
    } else {
      return this.renderLegsRoutine();
    }
  }

  renderPullRoutine() {
    return (
      <View styleName="vertical">
        <RoutineItem workout="Dumbbell Rows" reps="4x5, 1x5+" />
        <RoutineItem workout="Pulldowns" reps="3x8-12" />
        <RoutineItem
          workout="Seated Cable/Chest Supported Rows"
          reps="3x8-12"
        />
        <RoutineItem workout="Face Pulls" reps="5x15-20" />
        <RoutineItem workout="Hammer Curls" reps="4x8-12" />
        <RoutineItem workout="Dumbbell Curls" reps="4x8-12" />
      </View>
    );
  }

  renderPushRoutine() {
    return (
      <View styleName="vertical">
        <RoutineItem
          workout="Single-Armed Dumbbell Bench Press"
          reps="4x5, 1x5+"
        />
        <RoutineItem workout="Overhead Dumbbell Press" reps="3x8-12" />
        <RoutineItem workout="Incline Dumbbell Press" reps="3x8-12" />
        <RoutineItem
          workout="Triceps Pushdowns SS Lateral Raises"
          reps="3x8-12 / 3x15-20"
        />
        <RoutineItem
          workout="Overhead Triceps Extensions SS 3x15-20 Lateral Raises"
          reps="3x8-12 / 3x15-20"
        />
      </View>
    );
  }

  renderLegsRoutine() {
    return (
      <View styleName="vertical">
        <RoutineItem workout="Squat (Dumbbell)" reps="2x5, 1x5+" />
        <RoutineItem workout="Romanian Deadlift (Dumbbell)" reps="3x8-12" />
        <RoutineItem workout="Leg Press" reps="3x8-12" />
        <RoutineItem workout="Leg Curls" reps="3x8-12" />
        <RoutineItem workout="Calf Raises" reps="5x8-12" />
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
