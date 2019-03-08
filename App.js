import React, { Component } from "react";
import { StatusBar, AsyncStorage } from "react-native";
import { Font, AppLoading } from "expo";
import {
  View,
  Title,
  NavigationBar,
  Icon,
  Heading,
  Button,
  Text,
  TouchableOpacity,
  Tile
} from "@shoutem/ui";
import Fitness from "./Fitness";
import WaterHelper from "./WaterHelper";
console.disableYellowBox = true;

class App extends React.Component {
  state = {
    fontsAreLoaded: false,
    currPage: "HabiBuddy"
  };

  _onPressExpUp = () => {
    fetch("https://habitica.com/api/v3/user?userFields=stats.exp", {
      method: "GET",
      headers: {
        "x-api-user": "cc68f182-9b83-436d-b92c-f6d9830211ed",
        "x-api-key": "7c5fc0e7-99a3-4163-8ba7-d91448e76124"
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
            "x-api-key": "7c5fc0e7-99a3-4163-8ba7-d91448e76124",
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
        "x-api-key": "7c5fc0e7-99a3-4163-8ba7-d91448e76124",
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
        "x-api-key": "7c5fc0e7-99a3-4163-8ba7-d91448e76124"
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

  renderPage() {
    switch (this.state.currPage) {
      case "Fitness":
        return <Fitness />;
      default:
        return (
          <Tile
            style={{
              alignItems: "center",
              flex: 1
            }}
          >
            <Button
              onPress={() => this.setState({ currPage: "Fitness" })}
              style={{
                flex: 4
              }}
              styleName="full-width secondary"
            >
              <Text styleName="bold" style={{ fontSize: 40 }}>
                FITNESS
              </Text>
            </Button>
            <WaterHelper />
          </Tile>
        );
    }
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <NavigationBar
          leftComponent={
            <TouchableOpacity
              onPress={() => this.setState({ currPage: "HabiBuddy" })}
            >
              <Icon name="home" style={{ paddingLeft: 10 }} />
            </TouchableOpacity>
          }
          centerComponent={
            <Title style={{ fontSize: 20 }} styleName="bold">
              {this.state.currPage}
            </Title>
          }
          styleName="inline"
        />
        {this.renderPage()}
      </View>
    );
  }
}

export default App;
