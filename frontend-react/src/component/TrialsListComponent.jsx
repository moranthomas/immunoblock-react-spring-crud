import React, { Component } from 'react'
import TrialsDataService from '../service/TrialsDataService';

const INSTRUCTOR = 'in28minutes'

class TrialsListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trials: [],
            message: null
        }
        this.deleteTrialClicked = this.deleteTrialClicked.bind(this)
        this.updateTrialClicked = this.updateTrialClicked.bind(this)
        this.addTrialClicked = this.addTrialClicked.bind(this)
        this.refreshTrials = this.refreshTrials.bind(this)
    }

    componentDidMount() {
        this.refreshTrials();
    }

    refreshTrials() {
        TrialsDataService.retrieveAllTrials(INSTRUCTOR)//HARDCODED
            .then(
                response => {
                    //console.log(response);
                    this.setState({ trials: response.data })
                }
            )
    }

    deleteTrialClicked(id) {
        TrialsDataService.deleteTrial(INSTRUCTOR, id)
            .then(
                response => {
                    this.setState({ message: `Delete of trial ${id} Successful` })
                    this.refreshTrials()
                }
            )

    }

    addTrialClicked() {
        this.props.history.push(`/trials/-1`)
    }

    updateTrialClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/trials/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All Trials</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.trials.map(
                                    trial =>
                                        <tr key={trial.id}>
                                            <td>{trial.id}</td>
                                            <td>{trial.description}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTrialClicked(trial.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTrialClicked(trial.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTrialClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrialsListComponent