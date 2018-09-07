import React, { Component } from "react";
import Payment from "payment";
import { images } from "./card-images";
import "./card.css";
import "./card-types.css";

const validate = Payment.fns;

class Card extends Component {
  static displayName = "Card";

  static defaultProps = {
    number: null,
    cvc: null,
    name: "",
    expiry: "",
    focused: null,
    namePlaceholder: "FULL NAME",
    expiryBefore: "month/year",
    expiryAfter: "valid thru",
    shinyAfterBack: "",
    type: null
  };
  state = {
    type: {
      name: "unknown",
      length: 16
    }
  };

  componentWillMount() {
    this.updateType(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateType(nextProps);
  }

  updateType = props => {
    if (!props.number) {
      return this.setState({
        type: {
          name: "unknown",
          length: 16
        }
      });
    }

    if (this.props.type || validate.cardType(props.number)) {
      const type = this.props.type;
      if (type === "amex") {
        return this.setState({
          type: {
            name: type,
            length: 15
          }
        });
      } else {
        return this.setState({
          type: {
            name: type,
            length: 16
          }
        });
      }
    }

    return this.setState({
      type: {
        name: "unknown",
        length: 16
      }
    });
  };

  number = () => {
    let str;
    let space_index;
    let space_index1;
    let space_index2;
    let amountOfSpaces;

    if (!this.props.number) {
      str = "";
    } else {
      str = this.props.number.toString();
    }

    const maxLength = this.state.type.length;

    if (str.length > maxLength) {
      str = str.slice(0, maxLength);
    }

    while (str.length < maxLength) {
      str += "*";
    }

    if (this.state.type.name === "amex") {
      space_index1 = 4;
      space_index2 = 10;

      str =
        str.substring(0, space_index1) +
        " " +
        str.substring(space_index1, space_index2) +
        " " +
        str.substring(space_index2);
    } else {
      amountOfSpaces = Math.ceil(maxLength / 4);

      for (let i = 1; i <= amountOfSpaces; i += 1) {
        space_index = i * 4 + (i - 1);
        str = str.slice(0, space_index) + " " + str.slice(space_index);
      }
    }

    return str;
  };

  name = () => {
    if (this.props.name === "") {
      return this.props.namePlaceHolder;
    }
    return this.props.name;
  };

  expiry = () => {
    if (this.props.expiry === "") {
      return "**/**";
    }

    let expiry = this.props.expiry.toString();
    let expiryMaxLength = 6; // 2 digits for month and 4 digits for year

    if (expiry.match(/\//)) {
      expiry = expiry.replace("/", "");
    }

    if (!expiry.match(/^[0-9]*$/)) {
      return "**/**";
    }

    while (expiry.length < 4) {
      expiry += "*";
    }

    expiry = expiry.slice(0, 2) + "/" + expiry.slice(2, expiryMaxLength);

    return expiry;
  };

  cvc = () => {
    if (!this.props.cvc) {
      return "***";
    }

    return this.props.cvc.toString().length <= 4
      ? this.props.cvc
      : this.props.cvc.toString().slice(0, 4);
  };

  displayClassName = base => {
    let clsNames = "react-credit-card__" + base + " react-credit-card__display";

    if (this.props.focused === base) clsNames += " react-credit-card--focused";

    return clsNames;
  };

  typeClassName = () => {
    return `react-credit-card--${
      this.props.type ? this.props.type : this.state.type.name
    }`;
  };

  getValue = name => {
    return this[name]();
  };

  render() {
    const isAmex =
      this.state.type !== undefined && this.state.type.name === "amex";

    return (
      <div className="react-credit-card__container">
        <div
          className={
            "react-credit-card " + this.typeClassName() + props.focused ===
              "cvc" && !isAmex
              ? ` react-credit-card--flipped`
              : ""
          }
        >
          <div className="react-credit-card__front">
            <div className="react-credit-card__lower">
              <div className="react-credit-card__shiny" />
              <img
                className={"react-credit-card__logo " + this.typeClassName()}
                src={
                  images[
                    this.props.type !== undefined
                      ? this.props.type
                      : this.state.type.name
                  ]
                }
              />
              {isAmex && (
                <div className={this.displayClassName("cvc_front")}>
                  {this.getValue("cvc")}
                </div>
              )}
              <div className={this.displayClassName("number")}>
                {this.getValue("number")}
              </div>
              <div className={this.displayClassName("name")}>
                {this.getValue("name")}
              </div>
              <div
                className={thisdisplayClassName("expiry")}
                data-before={this.props.expiryBefore}
                data-after={this.props.expiryAfter}
              >
                {this.getValue("expiry")}
              </div>
            </div>
          </div>

          <div className="react-credit-card__back">
            <div className="react-credit-card__bar" />
            <div className={this.displayClassName("cvc")}>
              {this.getValue("cvc")}
            </div>
            <div
              className="react-credit-card__shiny"
              data-after={this.props.shinyAfterBack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { Card };
