import React, { Component } from "react";
import MedDataService from "../services/med.service";

export default class AddMed extends Component {
  constructor(props) {
    super(props);
    this.onChangeMedID = this.onChangeMedID.bind(this);
    this.onChangeMedName = this.onChangeMedName.bind(this);
    this.onChangeMedDescription = this.onChangeMedDescription.bind(this);
    this.onChangeMedType = this.onChangeMedType.bind(this);
    this.saveMed = this.saveMed.bind(this);
    this.newMed = this.newMed.bind(this);

    this.state = {
      medID: "",
      medName: "",
      medDescription: "",
      medType: "",
      published: false,

      submitted: false,
    };
  }

  onChangeMedID(e) {
    this.setState({
      medID: e.target.value,
    });
  }

  onChangeMedName(e) {
    this.setState({
      medName: e.target.value,
    });
  }

  onChangeMedDescription(e) {
    this.setState({
      medDescription: e.target.value,
    });
  }

  onChangeMedType(e) {
    this.setState({
      medType: e.target.value,
    });
  }

  saveMed() {
    let data = {
      medID: this.state.medID,
      medName: this.state.medName,
      medDescription: this.state.medDescription,
      medType: this.state.medType,
      published: false
    };

    MedDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newMed() {
    this.setState({
      medID: "",
      medName: "",
      medDescription: "",
      medType: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMed}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="medName">Medication ID</label>
              <input
                  type="int"
                  className="form-control"
                  id="medID"
                  required
                  value={this.state.medID}
                  onChange={this.onChangeMedID}
                  name="medID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="medName">Medication Name</label>
              <input
                type="text"
                className="form-control"
                id="medName"
                required
                value={this.state.medName}
                onChange={this.onChangeMedName}
                name="medName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="medDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="medDescription"
                required
                value={this.state.medDescription}
                onChange={this.onChangeMedDescription}
                name="medDescription"
              />
            </div>
            <div className="form-group">
              <label htmlFor="medType">Type</label>
              <input
                  type="text"
                  className="form-control"
                  id="medType"
                  required
                  value={this.state.medType}
                  onChange={this.onChangeMedType}
                  name="medType"
              />
            </div>

            <button onClick={this.saveMed} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
