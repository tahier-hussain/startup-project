import React, { Component } from 'react'
import axios from 'axios'
import './StartupHomePage.css'
import { Link, Route, Switch } from 'react-router-dom'
import StartupInfo from '../StartupInfo/StartupInfo'
import Manager from '../Manager/Manager'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    button,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

class StartupHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            role: '',
            company_name: '',
            website_link: '',
            status: '',
            location: '',
            phone_no: '',
            description: '',
            company_started_date: '',
            amount_invested: '',
            revenue_generated: '',
            offer: '',
            major_people: [],
            certification: [],
            endorsement: [],
            register_date: '',
            modal: false
        }
    }

    componentDidMount() {

        const requestOptions = {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        };

        console.log(requestOptions.headers);

        axios.get('http://localhost:5000/api/auth/info/one', requestOptions).then(res => {
            console.log(res);
            // console.log(res.data.name)

            this.setState({
                id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                password: res.data.password,
                role: res.data.role,
                company_name: res.data.company_name,
                website_link: res.data.website_link,
                status: res.data.status,
                location: res.data.location,
                phone_no: res.data.phone_no,
                description: res.data.description,
                company_started_date: res.data.company_started_date,
                amount_invested: res.data.amount_invested,
                revenue_generated: res.data.revenue_generated,
                offer: res.data.offer,
                major_people: res.data.major_people,
                certification: res.data.certification,
                endorsement: res.data.endorsement,
                register_date: res.data.register_date
            }, () => { console.log(this.state) })
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };


    render() {
        return (
            <div>
                {this.state.role == 'startup' ?
                    <div>
                        <div className="mb-3 mt-5">
                            <h2>Welcome {this.state.name}</h2>
                        </div>
                        <button onClick={this.toggle} value="enter information" className="btn btn-primary mb-3" href="#">
                            Edit Information
                            </button>
                        {this.state.role === 'startup' ?
                        <a>
                        <Link to ="/stakeholders-list">
                        <button className="btn btn-success mb-3 ml-3" href="#">
                            Find Stakeholders
                        </button>
                        </Link>
                        <Link to ="/mentors-list">
                        <button className="btn btn-secondary mb-3 ml-3" href="#">
                            Find Mentors
                        </button>
                        </Link>
                        </a> :
                        <Link to = "/startups-list">
                        <button className="btn btn-success mb-3 ml-3" href="#">
                            Find Startups
                        </button>
                        </Link>
                        }
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                        >
                            <ModalHeader toggle={this.toggle}>
                                Startup Information
                                </ModalHeader>
                            <ModalBody>
                                <StartupInfo />
                            </ModalBody>
                        </Modal>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> About </h4>
                            {this.state.description ?
                                <p className="mb-4 font-weight-normal">{this.state.description}</p> :
                                "No Description"
                            }
                            <p className="font-weight-light">{this.state.role} account</p>
                            {this.state.company_name ?
                                <p className="mb-1 font-weight-light">company name: {this.state.company_name}</p> :
                                ""
                            }
                            {this.state.website_link ?
                                <p className="mb-1 font-weight-light">website link: {this.state.website_link}</p> :
                                ""
                            }
                            {this.state.location ?
                                <p className="mb-1 font-weight-light">location: {this.state.location}</p> :
                                ""
                            }
                            {this.state.phone_no ?
                                <p className="mb-1 font-weight-light">phone no: {this.state.phone_no}</p> :
                                ""
                            }
                            {this.state.email ?
                                <p className="mb-3 font-weight-light">email: {this.state.email}</p> :
                                ""
                            }
                            {this.state.amount_invested ?
                                <p className="mb-1 font-weight-light">amount invested: {this.state.amount_invested}</p> :
                                ""
                            }
                            {this.state.revenue_generated ?
                                <p className="mb-2 font-weight-light">revenue generated: {this.state.revenue_generated}</p> :
                                ""
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Certification </h4>
                            {this.state.certification != '' ?
                                <p>{this.state.certification}</p> :
                                <p className="font-weight-light">No Certificates</p>
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Major people of the company </h4>
                            {this.state.major_people != '' ?
                                <p>{this.state.major_people}</p> :
                                <p className="font-weight-light">No major person</p>
                            }
                        </div>
                        <div className="container box mb-5">
                            <h4 className="mb-4"> Endorsement </h4>
                            {this.state.endorsement != '' ?
                                <p>{this.state.endorsement}</p> :
                                <p className="font-weight-light">No endorsement</p>
                            }
                        </div>


                    </div>
                    : ""}
                {this.state.role == 'stakeholder' ?
                    <div>
                        <div className="mb-3 mt-5">
                            <h2>Welcome {this.state.name}</h2>
                        </div>
                        <button onClick={this.toggle} value="enter information" className="btn btn-primary mb-3" href="#">
                            Edit Information
                                        </button>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                        >
                            <ModalHeader toggle={this.toggle}>
                                Startup Information
                                            </ModalHeader>
                            <ModalBody>
                                <StartupInfo />
                            </ModalBody>
                        </Modal>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> About </h4>
                            {this.state.description ?
                                <p className="mb-4 font-weight-normal">{this.state.description}</p> :
                                "No Description"
                            }
                            <p className="font-weight-light">{this.state.role} account</p>
                            {this.state.location ?
                                <p className="mb-1 font-weight-light">location: {this.state.location}</p> :
                                ""
                            }
                            {this.state.phone_no ?
                                <p className="mb-1 font-weight-light">phone no: {this.state.phone_no}</p> :
                                ""
                            }
                            {this.state.email ?
                                <p className="mb-3 font-weight-light">email: {this.state.email}</p> :
                                ""
                            }
                            {this.state.amount_invested ?
                                <p className="mb-1 font-weight-light">amount invested: {this.state.amount_invested}</p> :
                                ""
                            }
                            {this.state.revenue_generated ?
                                <p className="mb-2 font-weight-light">revenue generated: {this.state.revenue_generated}</p> :
                                ""
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Certification </h4>
                            {this.state.certification != '' ?
                                <p>{this.state.certification}</p> :
                                <p className="font-weight-light">No Certificates</p>
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Major people of the company </h4>
                            {this.state.major_people != '' ?
                                <p>{this.state.major_people}</p> :
                                <p className="font-weight-light">No major person</p>
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Endorsement </h4>
                            {this.state.endorsement != '' ?
                                <p>{this.state.endorsement}</p> :
                                <p className="font-weight-light">No endorsement</p>
                            }
                        </div>


                    </div> : ""
                }
                {this.state.role == 'mentor' ?
                    <div>
                        <div className="mb-3 mt-5">
                            <h2>Welcome {this.state.name}</h2>
                        </div>
                        <button onClick={this.toggle} value="enter information" className="btn btn-primary mb-3" href="#">
                            Edit Information
                                                        </button>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                        >
                            <ModalHeader toggle={this.toggle}>
                                Startup Information
                                                            </ModalHeader>
                            <ModalBody>
                                <StartupInfo />
                            </ModalBody>
                        </Modal>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> About </h4>
                            {this.state.description ?
                                <p className="mb-4 font-weight-normal">{this.state.description}</p> :
                                "No Description"
                            }
                            <p className="font-weight-light">{this.state.role} account</p>
                            {this.state.location ?
                                <p className="mb-1 font-weight-light">location: {this.state.location}</p> :
                                ""
                            }
                            {this.state.phone_no ?
                                <p className="mb-1 font-weight-light">phone no: {this.state.phone_no}</p> :
                                ""
                            }
                            {this.state.email ?
                                <p className="mb-3 font-weight-light">email: {this.state.email}</p> :
                                ""
                            }
                            {this.state.amount_invested ?
                                <p className="mb-1 font-weight-light">amount invested: {this.state.amount_invested}</p> :
                                ""
                            }
                            {this.state.revenue_generated ?
                                <p className="mb-2 font-weight-light">revenue generated: {this.state.revenue_generated}</p> :
                                ""
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Certification </h4>
                            {this.state.certification != '' ?
                                <p>{this.state.certification}</p> :
                                <p className="font-weight-light">No Certificates</p>
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Major people of the company </h4>
                            {this.state.major_people != '' ?
                                <p>{this.state.major_people}</p> :
                                <p className="font-weight-light">No major person</p>
                            }
                        </div>
                        <div className="container box mb-3">
                            <h4 className="mb-4"> Endorsement </h4>
                            {this.state.endorsement != '' ?
                                <p>{this.state.endorsement}</p> :
                                <p className="font-weight-light">No endorsement</p>
                            }
                        </div>


                    </div> : ""
                }
                {this.state.role == 'manager' ?
                    <Manager /> : ""
                }
            </div>
        )
    }
}

export default StartupHomePage