import React, { Component } from "react";
import { Row, Icon, Title, Text, View, Subtitle } from "@shoutem/ui";
import Swipeout from "react-native-swipeout";

class SessionHistoryItem extends React.Component {
  render() {
    let swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          this.props.removeSession(this.props.index);
        }
      }
    ];

    return (
      <Swipeout
        right={swipeoutBtns}
        autoClose={true}
        backgroundColor="transparent"
      >
        <Row styleName="small">
          <Icon name="rsvp" />
          <View styleName="vertical">
            <Subtitle>{this.props.session.type}</Subtitle>
            <Text numberOfLines={1}>{this.props.session.date}</Text>
          </View>
        </Row>
      </Swipeout>
    );
  }
}
export default SessionHistoryItem;
