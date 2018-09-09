import React, { Component } from "react";
import { Card } from "./card/card";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card
          cvc={333}
          number={4585950018944867}
          expiry="12/20"
          name={"Jasen pan"}
          focused={"name"}
        />
      </div>
    );
  }
}

export default App;
