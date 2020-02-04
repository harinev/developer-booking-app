import React from "react";
import uuid from "uuid/v4";
import axios from "axios";
import DeveloperCount from "./DeveloperCount";
import Header from "./Header";
import Developer from "./Developer";
import AddDeveloper from "./AddDeveloper";

import "./App.css";

// Only class components can have state
// State must live in the parent of any components that need to access it
class App extends React.Component {
  state = {
    developers: []
  };

  // Lifecycle method
  componentDidMount() {
    // Fetch the developers making a GET request
    axios.get("https://4z2i5gh407.execute-api.eu-west-1.amazonaws.com/dev/developers")
      .then((response) => {
        const developers = response.data.developers;
        this.setState({
          developers: developers
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ONE RULE
  // Any function that updates state MUST live in the same component as the state
  addNewDeveloper = (name, skills, date) => {
    const newDeveloper = {
      name: name,
      skills: skills,
      available: true,
      date_joined: date
    };

    axios.post("https://4z2i5gh407.execute-api.eu-west-1.amazonaws.com/dev/developers", newDeveloper)
      .then((response) => {
        const newDev = response.data;
        const copyOfDevs = this.state.developers.slice();
        copyOfDevs.push(newDev);

        this.setState({
          developers: copyOfDevs
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteDeveloper = id => {
    axios.delete(`https://4z2i5gh407.execute-api.eu-west-1.amazonaws.com/dev/developers/${id}`)
      .then(() => {
        const filteredDevs = this.state.developers.filter(dev => {
          if (dev.id === id) return false;
          else return true;
        });

        this.setState({
          developers: filteredDevs
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  bookDeveloper = id => {
    // Mark the given developer as booked (available=false)
    axios.put(`https://4z2i5gh407.execute-api.eu-west-1.amazonaws.com/dev/developers/${id}`, {
      available: false
    })
      .then(() => {
        const updatedDevelopers = this.state.developers.map(dev => {
          if (dev.id === id) {
            dev.available = false;
          }

          return dev;
        });

        this.setState({
          developers: updatedDevelopers
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const availableDevelopers = this.state.developers.filter(developer => {
      return developer.available === true;
    });

    const unavailableDevelopers = this.state.developers.filter(developer => {
      return developer.available === false;
    });

    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddDeveloper addNewDevFunc={this.addNewDeveloper} />
          <DeveloperCount count={availableDevelopers.length} />
          <h2>Available right now:</h2>
          {availableDevelopers.map(developer => {
            return (
              <Developer
                key={developer.id}
                available={developer.available}
                name={developer.name}
                skills={developer.skills}
                dateJoined={developer.date_joined}
                deleteDevFunc={this.deleteDeveloper}
                bookDeveloper={this.bookDeveloper}
                id={developer.id}
              />
            );
          })}
          <h2>Currently working very hard:</h2>
          {unavailableDevelopers.map(developer => {
            return (
              <Developer
                key={developer.id}
                available={developer.available}
                name={developer.name}
                skills={developer.skills}
                dateJoined={developer.date_joined}
                deleteDevFunc={this.deleteDeveloper}
                id={developer.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
