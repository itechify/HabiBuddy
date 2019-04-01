import React, { Component } from "react";
import { ScrollView } from "react-native";
import { View, Subtitle, Text, TextInput, Button } from "@shoutem/ui";
import Swipeout from "react-native-swipeout";

class ExercisesViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: "",
      reps: "",
      editKey: null
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
            <Swipeout
              key={index}
              right={[
                {
                  text: "Edit",
                  backgroundColor: "blue",
                  underlayColor: "rgba(0, 0, 0, 1, 0.6)",
                  onPress: () => {
                    this.setState({
                      workout: this.props.exercises[key].workout,
                      reps: this.props.exercises[key].reps,
                      editKey: key
                    });
                  }
                },
                {
                  text: "Delete",
                  backgroundColor: "red",
                  underlayColor: "rgba(0, 0, 0, 1, 0.6)",
                  onPress: () => {
                    this.props.deleteExercise(key);
                    if (this.state.editKey == key) {
                      this.setState({
                        workout: "",
                        reps: "",
                        editKey: null
                      });
                    }
                  }
                }
              ]}
              autoClose={true}
              backgroundColor="transparent"
            >
              <View
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
            </Swipeout>
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
            multiline
            style={{
              fontSize: 25,
              padding: 0,
              textAlign: "center",
              flex: 1
            }}
            onChangeText={text => this.setState({ workout: text })}
            value={this.state.workout}
          />
          <TextInput
            placeholder="REPS"
            style={{
              fontSize: 20,
              padding: 0,
              textAlign: "center",
              flex: 0.6
            }}
            onChangeText={text => this.setState({ reps: text })}
            value={this.state.reps}
          />
          <Button
            styleName="secondary"
            style={{ marginBottom: 20, marginHorizontal: 20, flex: 0.6 }}
            onPress={() => {
              if (this.state.workout != "") {
                if (this.state.editKey == null) {
                  this.props.addNewExercise(
                    new Date().valueOf(),
                    this.state.workout,
                    this.state.reps
                  );
                } else {
                  this.props.editExercise(
                    this.state.editKey,
                    this.state.workout,
                    this.state.reps
                  );
                }
              }
              this.setState({ workout: "", reps: "", editKey: null });
            }}
          >
            {this.state.editKey ? (
              <Text style={{ fontSize: 20 }}>Confirm Edit</Text>
            ) : (
              <Text style={{ fontSize: 20 }}>+</Text>
            )}
          </Button>
        </View>
      </View>
    );
  }
}
export default ExercisesViewer;
