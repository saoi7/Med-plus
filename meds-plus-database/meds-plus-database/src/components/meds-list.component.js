import React, { Component } from "react";
import MedDataService from "../services/med.service";

import Med from "./med.component";

export default class MedsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMed = this.setActiveMed.bind(this);
    this.removeAllMeds = this.removeAllMeds.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      meds: [],
      currentMeds: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    MedDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    MedDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let meds = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      meds.push({
        key: key,
        medID: data.medID,
        medName: data.medName,
        medDescription: data.medDescription,
        medType: data.medType,
        published: data.published,
      });
    });

    this.setState({
      meds: meds,
    });
  }

  refreshList() {
    this.setState({
      currentMed: null,
      currentIndex: -1,
    });
  }

  setActiveMed(med, index) {
    this.setState({
      currentMed: med,
      currentIndex: index,
    });
  }

  removeAllMeds() {
    MedDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { meds, currentMed, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Medication List</h4>

          <ul className="list-group">
            {meds &&
              meds.map((med, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMed(med, index)}
                  key={index}
                >
                  {med.medName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMeds}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMed ? (
            <Med
              med={currentMed}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Medication...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
