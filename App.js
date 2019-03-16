import React, { Component } from "react";
import { StatusBar, AsyncStorage, Dimensions } from "react-native";
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
  Tile,
  Row
} from "@shoutem/ui";
import Fitness from "./Fitness";
import WaterHelper from "./WaterHelper";
import Reactotron, { asyncStorage } from "reactotron-react-native";
import MoodTracker from "./MoodTracker";

Reactotron.configure({ host: "192.168.1.79", port: 9090 })
  .useReactNative()
  .use(asyncStorage())
  .connect();
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
    let width = Dimensions.get("window").width;

    switch (this.state.currPage) {
      case "Fitness":
        return <Fitness />;
      default:
        return (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
              paddingVertical: 10
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ currPage: "Fitness" })}
              style={{
                height: 160,
                width: width * 0.87,
                borderWidth: 2,
                backgroundColor: "blue"
              }}
            >
              <Row>
                <Text styleName="bold" style={{ fontSize: 40 }}>
                  FITNESS
                </Text>
                <Icon styleName="disclosure" name="right-arrow" />
              </Row>
            </TouchableOpacity>
            <MoodTracker />
            <WaterHelper />
          </View>
        );
    }
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <View
        styleName="vertical"
        style={{
          flex: 1,
          justifyContent: "flex-start"
        }}
      >
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
