import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { RegisterPage } from '../RegisterPage/RegisterPage';
import StartupHomePage from '../StartupHomePage/StartupHomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../AppNavbar/AppNavbar';
import StakeholdersList from '../StakeholdersList/StakeholdersList';
import MentorsList from '../MentorsList/MentorsList';
import StartupsList from '../StartupsList/StartupsList';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div>
                    <AppNavbar />
                    <div className="container mt-3">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/startup-info" component={StartupHomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <PrivateRoute path="/stakeholders-list" component={StakeholdersList}/>
                            <PrivateRoute path="/mentors-list" component={MentorsList}/>
                            <PrivateRoute path="/startups-list" component={StartupsList}/>
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    console.log("State");
    console.log(state);
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };