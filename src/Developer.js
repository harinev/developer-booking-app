import React from "react";
import moment from "moment";

import "./Developer.css";

class Developer extends React.Component {
  handleClick = () => {
    this.props.deleteDevFunc(this.props.id);
  };

  handleBookDeveloper = () => {
    this.props.bookDeveloper(this.props.id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-sm-3">
          <p>{this.props.name}</p>
        </div>
        <div className="col-12 col-sm-3">
          <p>{this.props.skills}</p>
        </div>
        <div className="col-12 col-sm-2">
          <p>{moment(this.props.dateJoined).format("Do MMM YY")}</p>
        </div>
        <div className="col-12 col-sm-2">
          <button className="btn btn-danger" onClick={this.handleClick}>
            Delete
          </button>
        </div>
        <div className="col-12 col-sm-2">
          {this.props.available === true ? (
            <button className="btn btn-primary book-button" onClick={this.handleBookDeveloper}>Book</button>
          ) : (
            <button disabled className="btn btn-primary book-button">
              Unavailable
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Developer;
