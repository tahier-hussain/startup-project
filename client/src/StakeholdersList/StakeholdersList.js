import React, { Component } from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'
import StartupInfo from '../StartupInfo/StartupInfo'
import Manager from '../Manager/Manager'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

class StakeholdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user_id: '',
            modal: false
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/api/managers/stakeholders-list').then(res => {
            console.log(res);

            this.setState({
                users: res.data
            }, () => { console.log(this.state.users) })
        })
    }

    toggle = (id) => {
        this.setState({
            user_id: id,
            modal: !this.state.modal
        });
    };


    render() {
        return (
            <div>
                <div className="mb-3 mt-5 container">
                    <h2 className="mb-3">Stakeholders</h2>
                    {this.state.users.map(user =>
                        <div className="box mb-2">
                            <p className="mr-3">
                                Name: {user.name}
                            </p>
                            <p className="mr-3 font-weight-light">
                                Email: {user.email}
                            </p>
                            <p className="mr-3 font-weight-light">
                                Role: {user.role}
                            </p>
                            <p>
                                <button onClick={() => this.toggle(user._id)} className="btn btn-primary mr-3" href="#">
                                    More Details
                                </button>
                                <Modal
                                    isOpen={this.state.modal && this.state.user_id === user._id}
                                    toggle={this.toggle}
                                >
                                    {this.state.user_id == user._id ?
                                        <div>
                                            <ModalHeader toggle={this.toggle}>
                                                {user.role} information
                                    </ModalHeader>
                                            <ModalBody>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="description">Description</Label>
                                                        <p>{user.description}</p>
                                                        <Label for="description">Company Name</Label>
                                                        <p>{user.company_name}</p>
                                                        <Label for="description">Amount Invested</Label>
                                                        <p>{user.amount_invested}</p>
                                                        <Label for="description">Revenue Generated</Label>
                                                        <p>{user.revenue_generated}</p>
                                                        <Label for="location">Location</Label>
                                                        <p>{user.location}</p>
                                                        <Label for="location">Phone Number</Label>
                                                        <p>{user.phone_no}</p>
                                                        <Button
                                                            color="dark"
                                                            style={{ marginTop: '2rem' }}
                                                            block
                                                        >Request for a deal
                                            </Button>
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                        </div> : ""
                                    }
                                </Modal>
                            </p>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }
}

export default StakeholdersList