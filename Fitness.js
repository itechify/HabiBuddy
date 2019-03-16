import React, { Component } from "react";
import { AsyncStorage } from "react-native";
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
import SessionHistoryItem from "./SessionHistoryItem";
import Session from "./Session";

class Fitness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChooseModal: false,
      pastSessions: [],
      session: "NONE",
      badChoice: ""
    };
    this.renderSessionHistoryItem = this.renderSessionHistoryItem.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("pastSessions").then(pastSessions => {
      if (pastSessions != null && pastSessions != "[]") {
        this.setState({
          pastSessions: JSON.parse(pastSessions)
        });

        if (
          Date.now() - Date.parse(this.state.pastSessions[0].date) <
          86400000
        ) {
          this.setState({
            badChoice: this.state.pastSessions[0].type
          });
        }
      }
    });
  }

  updateSession = type => {
    this.setState({ session: type });
  };

  completeSession = () => {
    let ps = this.state.pastSessions.slice(0); //copy of state
    let date = new Date();

    if (ps.length != 0) {
      ps.unshift({
        type: this.state.session,
        date: date.toLocaleDateString()
      });
    } else {
      ps = new Array(1);
      ps[0] = {
        type: this.state.session,
        date: date.toLocaleDateString()
      };
    }

    AsyncStorage.setItem("pastSessions", JSON.stringify(ps));

    this.setState({ badChoice: ps[0].type });
    this.setState({ session: "NONE" });
    this.setState({ pastSessions: ps });
  };

  removeSession = index => {
    const ps = this.state.pastSessions.slice(0); //copy of state
    let removed = ps.splice(index, 1);
    this.setState({ pastSessions: ps });
    AsyncStorage.setItem("pastSessions", JSON.stringify(ps));

    if (this.state.badChoice == removed[0].type) {
      this.setState({ badChoice: "" });
    }
  };

  _onPressAddSession = () => {
    this.setState({ showChooseModal: true });
  };

  _onPressMakeChoicePush = () => {
    this.setState({ showChooseModal: false });
    this.setState({ session: "PUSH" });
  };

  _onPressMakeChoicePull = () => {
    this.setState({ showChooseModal: false });
    this.setState({ session: "PULL" });
  };

  _onPressMakeChoiceLegs = () => {
    this.setState({ showChooseModal: false });
    this.setState({ session: "LEGS" });
  };

  renderSessionHistoryItem(session, sid, index) {
    return (
      <SessionHistoryItem
        session={session}
        index={index}
        removeSession={this.removeSession}
      />
    );
  }

  renderFitnessHome() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 600 }}>
          <ListView
            data={this.state.pastSessions}
            renderRow={this.renderSessionHistoryItem}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            styleName="secondary"
            style={{ flex: 1 }}
            onPress={this._onPressAddSession}
          >
            <Text style={{ fontSize: 20 }}>New Session</Text>
          </Button>
        </View>
        <Modal
          isVisible={this.state.showChooseModal}
          onBackdropPress={() => {
            this.setState({ showChooseModal: false });
          }}
        >
          <View
            style={{
              alignItems: "center"
            }}
          >
            <Tile
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 300
              }}
            >
              <Button
                onPress={this._onPressMakeChoicePull}
                disabled={this.state.badChoice == "PULL"}
                styleName={
                  this.state.badChoice == "PULL"
                    ? "full-width muted"
                    : "full-width"
                }
              >
                <Text
                  styleName="bold"
                  style={{ fontSize: 40, paddingHorizontal: 100 }}
                >
                  PULL
                </Text>
              </Button>
              <Button
                onPress={this._onPressMakeChoicePush}
                disabled={this.state.badChoice == "PUSH"}
                styleName={
                  this.state.badChoice == "PUSH"
                    ? "full-width muted"
                    : "full-width"
                }
              >
                <Text
                  styleName="bold"
                  style={{ fontSize: 40, paddingHorizontal: 100 }}
                >
                  PUSH
                </Text>
              </Button>
              <Button
                onPress={this._onPressMakeChoiceLegs}
                disabled={this.state.badChoice == "LEGS"}
                styleName={
                  this.state.badChoice == "LEGS"
                    ? "full-width muted"
                    : "full-width"
                }
              >
                <Text
                  styleName="bold"
                  style={{ fontSize: 40, paddingHorizontal: 100 }}
                >
                  LEGS
                </Text>
              </Button>
            </Tile>
          </View>
        </Modal>
      </View>
    );
  }

  render() {
    if (this.state.session == "NONE") {
      return this.renderFitnessHome();
    } else {
      return (
        <Session
          sessionType={this.state.session}
          completeSession={this.completeSession}
        />
      );
    }
  }
}

export default Fitness;
