import React, { Component } from "react";
import { ScrollView } from "react-native";
import { View, Subtitle, Text, TextInput, Button } from "@shoutem/ui";

class ExercisesViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newExerciseName: "",
      newExerciseReps: ""
    };
  }

  render() {
    return (
      <View>
        <ScrollView
          style={{
            borderWidth: 2,
            height: "60%",
            marginHorizontal: 10
          }}
        >
          {Object.keys(this.props.exercises).map((key, index) => (
            <View
              key={index}
              styleName="vertical"
              style={{
                margin: 5
              }}
            >
              <Subtitle styleName="bold" style={{ fontSize: 18 }}>
                {this.props.exercises[key].workout}
              </Subtitle>
              <Text style={{ fontSize: 12 }}>
                {this.props.exercises[key].reps}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            borderWidth: 2,
            marginHorizontal: 10,
            height: "30%",
            marginTop: 10,
            justifyContent: "center"
          }}
        >
          <TextInput
            placeholder="EXERCISE NAME"
            style={{
              fontSize: 25,
              padding: 0,
              textAlign: "center"
            }}
            onChangeText={text => this.setState({ newExerciseName: text })}
            value={this.state.newExerciseName}
          />
          <TextInput
            placeholder="REPS"
            style={{
              fontSize: 20,
              padding: 0,
              textAlign: "center"
            }}
            onChangeText={text => this.setState({ newExerciseReps: text })}
            value={this.state.newExerciseReps}
          />
          <Button
            styleName="secondary"
            style={{ marginHorizontal: 20 }}
            onPress={() => {
              if (this.state.newExerciseName != "") {
                this.props.addNewExercise(
                  new Date().valueOf(),
                  this.state.newExerciseName,
                  this.state.newExerciseReps
                );
              }
              this.setState({ newExerciseName: "", newExerciseReps: "" });
            }}
          >
            <Text>+</Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default ExercisesViewer;
