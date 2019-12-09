import React from "react";

class AddDeveloper extends React.Component {
  state = {
    developerName: "",
    skills: [],
    dateJoined: "2019-12-09"
  };

  updateDeveloperName = event => {
    console.log(event.target.value);
    this.setState({
      developerName: event.target.value
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <input
            type="text"
            onChange={this.updateDeveloperName}
            value={this.state.developerName}
            className="form-control"
            placeholder="Enter name"
          />
        </div>
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter skills"
          />
        </div>
        <div className="col-3">
          <input type="date" className="form-control" />
        </div>
        <div className="col-2">
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
    );
  }
}

export default AddDeveloper;
