import React, { Component } from "react";
import { AsyncStorage, ScrollView } from "react-native";
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
import SessionHistory from "./SessionHistory";
import Session from "./Session";
import RoutineChoiceButton from "./RoutineChoiceButton";
import RoutineCreator from "./RoutineCreator";

/*
      fitnessData: {
        pastSessions: [],
        routineItems: new Map([
          [1, { workout: "Dumbbell Rows", reps: "4x5, 1x5+", lastWeight: 0 }],
          [2, { workout: "Pulldowns", reps: "3x8-12", lastWeight: 0 }],
          [
            3,
            {
              workout: "Seated Cable/Chest Supported Rows",
              reps: "3x8-12",
              lastWeight: 0
            }
          ],
          [4, { workout: "Face Pulls", reps: "5x15-20", lastWeight: 0 }],
          [5, { workout: "Hammer Curls", reps: "4x8-12", lastWeight: 0 }],
          [6, { workout: "Dumbbell Curls", reps: "4x8-12", lastWeight: 0 }]
        ]),
        routines: [{ name: "PULL", routine: [1, 2, 3, 4, 5, 6] }]
      }

*/

class Fitness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChooseModal: false,
      currSession: -1, // index for routines array | -1 = no current session
      isCreatingRoutine: false,
      pastSessions: [],
      routineItems: {
        1: { workout: "Dumbbell Rows", reps: "4x5, 1x5+", lastWeight: 0 },
        2: { workout: "Pulldowns", reps: "3x8-12", lastWeight: 0 },
        3: {
          workout: "Seated Cable/Chest Supported Rows",
          reps: "3x8-12",
          lastWeight: 0
        },
        4: { workout: "Face Pulls", reps: "5x15-20", lastWeight: 0 },
        5: { workout: "Hammer Curls", reps: "4x8-12", lastWeight: 0 },
        6: { workout: "Dumbbell Curls", reps: "4x8-12", lastWeight: 0 },
        7: {
          workout: "Single-Armed Dumbbell Bench Press",
          reps: "4x5, 1x5+",
          lastWeight: 0
        },
        8: {
          workout: "Overhead Dumbbell Press",
          reps: "3x8-12",
          lastWeight: 0
        },
        9: { workout: "Incline Dumbbell Press", reps: "3x8-12", lastWeight: 0 },
        10: {
          workout: "Triceps Pushdowns SS Lateral Raises",
          reps: "3x8-12 / 3x15-20",
          lastWeight: 0
        },
        11: {
          workout: "Overhead Triceps Extensions SS Lateral Raises",
          reps: "3x8-12 / 3x15-20",
          lastWeight: 0
        },
        12: { workout: "Squat (Dumbbell)", reps: "2x5, 1x5+", lastWeight: 0 },
        13: {
          workout: "Romanian Deadlift (Dumbbell)",
          reps: "3x8-12",
          lastWeight: 0
        },
        14: {
          workout: "Leg Press",
          reps: "3x8-12",
          lastWeight: 0
        },
        15: { workout: "Leg Curls", reps: "3x8-12", lastWeight: 0 },
        16: { workout: "Calf Raises", reps: "5x8-12", lastWeight: 0 }
      },
      routines: [
        { name: "PULL", items: [1, 2, 3, 4, 5, 6] },
        { name: "PUSH", items: [7, 8, 9, 10, 11] },
        { name: "LEGS", items: [12, 13, 14, 15, 16] }
      ]
    };

    //load fitnessData from storage (pastSessions, routineItems, routines)
    AsyncStorage.getItem("fitnessData").then(fitnessData => {
      if (fitnessData != null) {
        let fD = JSON.parse(fitnessData);

        this.setState({
          pastSessions: fD.pastSessions,
          routineItems: fD.routineItems,
          routines: fD.routines
        });
      }
    });
  }

  componentWillUnmount() {
    //save fitnessData to asyncStorage
    let fitnessData = {
      pastSessions: this.state.pastSessions,
      routineItems: this.state.routineItems,
      routines: this.state.routines
    };
    AsyncStorage.setItem("fitnessData", JSON.stringify(fitnessData));
  }

  updateSession = type => {
    this.setState({ session: type });
  };

  completeSession = () => {
    let ps = this.state.pastSessions.slice(0); //copy of state
    let date = new Date();

    if (ps.length != 0) {
      ps.unshift({
        type: this.state.routines[this.state.currSession].name,
        date: date.toLocaleDateString()
      });
    } else {
      ps = new Array(1);
      ps[0] = {
        type: this.state.routines[this.state.currSession].name,
        date: date.toLocaleDateString()
      };
    }

    this.setState({ currSession: -1 });
    this.setState({ pastSessions: ps });
  };

  removeSession = index => {
    const ps = this.state.pastSessions.slice(0); //copy of state
    let removed = ps.splice(index, 1);
    this.setState({ pastSessions: ps });
  };

  onPressChooseRoutine = routineIndex => {
    this.setState({ showChooseModal: false });
    this.setState({ currSession: routineIndex });
  };

  addRoutine = routine => {
    let r = this.state.routines.splice(0);
    r.push(routine);
    this.setState({ routines: r, isCreatingRoutine: false });
  };

  renderFitnessHome() {
    return (
      <View style={{ flex: 1 }}>
        <SessionHistory
          pastSessions={this.state.pastSessions}
          removeSession={this.removeSession}
        />
        <View style={{ flex: 1 }}>
          <Button
            styleName="secondary"
            style={{ flex: 1 }}
            onPress={() => this.setState({ showChooseModal: true })}
          >
            <Text style={{ fontSize: 20 }}>New Session</Text>
          </Button>
        </View>
        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={this.state.showChooseModal}
          onBackdropPress={() => {
            this.setState({ showChooseModal: false });
          }}
          style={{ paddingVertical: 100 }} // makes it so modal is click-offable if lots of routines
        >
          <Tile
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ScrollView>
              {this.state.routines.map((routine, index) => (
                <RoutineChoiceButton
                  key={index}
                  index={index}
                  name={routine.name}
                  onPressChooseRoutine={this.onPressChooseRoutine}
                />
              ))}
              <Button
                onPress={() =>
                  this.setState({
                    isCreatingRoutine: true,
                    showChooseModal: false
                  })
                }
                style={{ paddingTop: 15, paddingBottom: 10 }}
              >
                <Icon
                  name="plus-button"
                  style={{
                    fontSize: 36,
                    backgroundColor: "black",
                    color: "white",
                    borderWidth: 1,
                    borderRadius: 2
                  }}
                />
              </Button>
            </ScrollView>
          </Tile>
        </Modal>
      </View>
    );
  }

  render() {
    if (this.state.currSession == -1) {
      if (this.state.isCreatingRoutine) {
        return (
          <RoutineCreator
            routineItems={this.state.routineItems}
            addRoutine={this.addRoutine}
          />
        );
      } else {
        return this.renderFitnessHome();
      }
    } else {
      return (
        <Session
          routine={this.state.routines[this.state.currSession]}
          routineItems={this.state.routineItems}
          completeSession={this.completeSession}
        />
      );
    }
  }
}

export default Fitness;
