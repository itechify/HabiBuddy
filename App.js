import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Font, AppLoading } from "expo";
import {
  View,
  Title,
  NavigationBar,
  Icon,
  Heading,
  Button,
  Text
} from "@shoutem/ui";
console.disableYellowBox = true;

class App extends React.Component {
  state = {
    fontsAreLoaded: false,
    exp: 0
  };

  _onPressExpUp = () => {
    fetch("https://habitica.com/api/v3/user?userFields=stats.exp", {
      method: "GET",
      headers: {
        "x-api-user": "cc68f182-9b83-436d-b92c-f6d9830211ed",
        "x-api-key": ""
      }
    })
      .then(results => {
        return results.json();
      })
      .then(data => {
        fetch("https://habitica.com/api/v3/user", {
          method: "PUT",
          headers: {
            "x-api-user": "cc68f182-9b83-436d-b92c-f6d9830211ed",
            "x-api-key": "",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "stats.exp": data.data.stats.exp + 1 })
        });
        this.setState({ exp: data.data.stats.exp + 1 });
      });
  };

  _resetExpDebug = () => {
    fetch("https://habitica.com/api/v3/user", {
      method: "PUT",
      headers: {
        "x-api-user": "cc68f182-9b83-436d-b92c-f6d9830211ed",
        "x-api-key": "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "stats.exp": 0 })
    });
    this.setState({ exp: 0 });
  };

  async componentWillMount() {
    fetch("https://habitica.com/api/v3/user?userFields=stats.exp", {
      method: "GET",
      headers: {
        "x-api-user": "cc68f182-9b83-436d-b92c-f6d9830211ed",
        "x-api-key": ""
      }
    })
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ exp: data.data.stats.exp });
      });

    await Font.loadAsync({
      "Rubik-Black": require("./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
      "Rubik-BlackItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
      "Rubik-Bold": require("./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
      "Rubik-BoldItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
      "Rubik-Italic": require("./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
      "Rubik-Light": require("./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
      "Rubik-LightItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
      "Rubik-Medium": require("./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
      "Rubik-MediumItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
      "Rubik-Regular": require("./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <View
        styleName="fill-parent vertical v-center"
        style={{ alignItems: "center" }}
      >
        <StatusBar hidden={true} />
        <NavigationBar
          leftComponent={<Icon name="sidebar" />}
          centerComponent={<Title style={{ fontSize: 20 }}>HabiBuddy</Title>}
        />
        <Heading style={{ paddingBottom: 20, color: "gold" }}>
          EXP: {this.state.exp}
        </Heading>
        <Button
          onPress={this._onPressExpUp}
          styleName="secondary"
          style={{ width: 100 }}
        >
          <Text>Add EXP</Text>
        </Button>
        <Button
          onPress={this._resetExpDebug}
          styleName="secondary"
          style={{ width: 200, top: 50 }}
        >
          <Text>Reset EXP</Text>
        </Button>
      </View>
    );
  }
}

export default App;
