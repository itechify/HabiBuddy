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
  Tile
} from "@shoutem/ui";
import Modal from "react-native-modal";

class Fitness extends React.Component {
  state = {
    showChooseModal: false
  };

  _onPressAddSession = () => {
    this.setState({ showChooseModal: true });
  };

  _onPressMakeChoicePush = () => {
    this.setState({ showChooseModal: false });
    this.props.updateSession(1);
  };

  _onPressMakeChoicePull = () => {
    this.setState({ showChooseModal: false });
    this.props.updateSession(2);
  };

  _onPressMakeChoiceLegs = () => {
    this.setState({ showChooseModal: false });
    this.props.updateSession(3);
  };

  renderSessionRowItem(session) {
    return (
      <Row styleName="small">
        <Icon name="rsvp" />
        <View styleName="vertical">
          <Subtitle>{session.type}</Subtitle>
          <Text numberOfLines={1}>{session.date}</Text>
        </View>
      </Row>
    );
  }

  render() {
    const pastSessions = [
      {
        type: "Gaspar Brasserie",
        date: "185 Sutter St, San Francisco, CA 94109"
      },
      {
        type: "Chalk Point Kitchen",
        date: "527 Broome St, New York, NY 10013"
      },
      {
        type: "Gaspar Brasserie",
        date: "185 Sutter St, San Francisco, CA 94109"
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 600 }}>
          <ListView data={pastSessions} renderRow={this.renderSessionRowItem} />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            styleName="secondary"
            style={{ flex: 1 }}
            onPress={this._onPressAddSession}
          >
            <Text>New Session</Text>
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
                onPress={this._onPressMakeChoicePush}
                styleName="full-width"
              >
                <Text
                  styleName="bold"
                  style={{ fontSize: 40, paddingHorizontal: 100 }}
                >
                  PUSH
                </Text>
              </Button>
              <Button
                onPress={this._onPressMakeChoicePull}
                styleName="full-width"
              >
                <Text
                  styleName="bold"
                  style={{ fontSize: 40, paddingHorizontal: 100 }}
                >
                  PULL
                </Text>
              </Button>
              <Button
                onPress={this._onPressMakeChoiceLegs}
                styleName="full-width"
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
}

export default Fitness;
