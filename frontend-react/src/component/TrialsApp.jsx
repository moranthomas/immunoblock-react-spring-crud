import React, { Component } from 'react';
import TrialsListComponent from './TrialsListComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TrialComponent from './TrialComponent';

class TrialsApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Repository of Clinical Trials</h1>
                    <Switch>
                        <Route path="/" exact component={TrialsListComponent} />
                        <Route path="/trials" exact component={TrialsListComponent} />
                        <Route path="/trials/:id" component={TrialComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default TrialsApp