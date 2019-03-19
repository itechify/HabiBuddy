import React, { Component } from "react";
import { View, ListView, Button, Text } from "@shoutem/ui";
import SessionHistoryItem from "./SessionHistoryItem";

class SessionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.renderSessionHistoryItem = this.renderSessionHistoryItem.bind(this);
  }

  renderSessionHistoryItem(session, sid, index) {
    return (
      <SessionHistoryItem
        session={session}
        index={index}
        removeSession={this.props.removeSession}
      />
    );
  }

  render() {
    return (
      <View style={{ height: 600 }}>
        <ListView
          data={this.props.pastSessions}
          renderRow={this.renderSessionHistoryItem}
        />
      </View>
    );
  }
}
export default SessionHistory;
