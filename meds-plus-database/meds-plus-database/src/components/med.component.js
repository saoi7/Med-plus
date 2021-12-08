import React, { Component } from "react";
import MedDataService from "../services/med.service";

export default class Med extends Component {
  constructor(props) {
    super(props);
    this.onChangeMedID = this.onChangeMedID.bind(this);
    this.onChangeMedName = this.onChangeMedName.bind(this);
    this.onChangeMedDescription = this.onChangeMedDescription.bind(this);
    this.onChangeMedType = this.onChangeMedType.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateMed = this.updateMed.bind(this);
    this.deleteMed = this.deleteMed.bind(this);

    this.state = {
      currentMed: {
        key: null,
        medID: "",
        medName: "",
        medDescription: "",
        medType: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { med } = nextProps;
    if (prevState.currentMed.key !== med.key) {
      return {
        currentMed: med,
        message: ""
      };
    }

    return prevState.currentMed;
  }

  componentDidMount() {
    this.setState({
      currentMed: this.props.med,
    });
  }

  onChangeMedID(e) {
    const medID = e.target.value;

    this.setState((prevState) => ({
      currentMed: {
        ...prevState.currentMed,
        medID: medID,
      },
    }));
  }

  onChangeMedName(e) {
    const medName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMed: {
          ...prevState.currentMed,
          medName: medName,
        },
      };
    });
  }

  onChangeMedDescription(e) {
    const medDescription = e.target.value;

    this.setState((prevState) => ({
      currentMed: {
        ...prevState.currentMed,
        medDescription: medDescription,
      },
    }));
  }

  onChangeMedType(e) {
    const medType = e.target.value;

    this.setState((prevState) => ({
      currentMed: {
        ...prevState.currentMed,
        medType: medType,
      },
    }));
  }

  updatePublished(status) {
    MedDataService.update(this.state.currentMed.key, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentMed: {
            ...prevState.currentMed,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateMed() {
    const data = {
      medID: this.state.currentMed.medID,
      medName: this.state.currentMed.medName,
      medDescription: this.state.currentMed.medDescription,
      medType: this.state.currentMed.medType,
    };

    MedDataService.update(this.state.currentMed.key, data)
      .then(() => {
        this.setState({
          message: "The Medicine was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteMed() {
    MedDataService.delete(this.state.currentMed.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentMed } = this.state;

    return (
      <div>
        <h4>Medication</h4>
        {currentMed ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="medID">Medication ID</label>
                <input
                    type="int"
                    className="form-control"
                    id="medID"
                    value={currentMed.medID}
                    onChange={this.onChangeMedID}
                />
              </div>
              <div className="form-group">
                <label htmlFor="medName">Medication Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="medName"
                  value={currentMed.medName}
                  onChange={this.onChangeMedName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="medDescription">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="medDescription"
                  value={currentMed.medDescription}
                  onChange={this.onChangeMedDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="medType">Type</label>
                <input
                    type="text"
                    className="form-control"
                    id="medType"
                    value={currentMed.medType}
                    onChange={this.onChangeMedType}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMed.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentMed.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMed}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMed}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Medication...</p>
          </div>
        )}
      </div>
    );
  }
}
