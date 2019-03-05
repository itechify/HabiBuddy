import React, { Component } from "react";
import {
  ListView,
  Row,
  Icon,
  Title,
  Subtitle,
  Text,
  View,
  Button
} from "@shoutem/ui";

class Fitness extends React.Component {
  renderSessionRowItem(session) {
    return (
      <Row styleName="small">
        <Icon name="rsvp" />
        <View styleName="vertical">
          <Subtitle>{session.title}</Subtitle>
          <Text numberOfLines={1}>{session.date}</Text>
        </View>
        <Icon styleName="disclosure" name="right-arrow" />
      </Row>
    );
  }

  render() {
    const sessions = [
      {
        title: "Gaspar Brasserie",
        date: "185 Sutter St, San Francisco, CA 94109"
      },
      {
        title: "Chalk Point Kitchen",
        date: "527 Broome St, New York, NY 10013"
      },
      {
        title: "Gaspar Brasserie",
        date: "185 Sutter St, San Francisco, CA 94109"
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 600 }}>
          <ListView data={sessions} renderRow={this.renderSessionRowItem} />
        </View>
        <View style={{ flex: 1 }}>
          <Button styleName="secondary" style={{ flex: 1 }}>
            <Text>New Session</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Fitness;
