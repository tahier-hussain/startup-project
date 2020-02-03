import React, { Component } from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom';

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

class StartupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
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
            register_date: ''
        }
    }

    componentDidMount() {

        const requestOptions = {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        };

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
            }, () => { 
                console.log("STATE")
                console.log(this.state.description) })
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();


        const requestOptions = {
            method: 'POST',
            url: 'http://localhost:5000/api/auth/info/update',
            headers: {  'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json' },
            data: JSON.stringify(this.state)
        };

        // console.log(requestOptions)

        axios(requestOptions).then((res) => console.log(res.data))

        window.location.reload(false);

    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="description">Enter Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="description"
                        className="mb-3"
                        onChange={this.onChange}
                    />
                    <Label for="company name">Enter Company Name</Label>
                    <Input
                        type="text"
                        name="company_name"
                        id="company_name"
                        placeholder="company name"
                        className="mb-3"
                        onChange={this.onChange}
                    />
                    <Label for="website link">Website Link</Label>
                    <Input
                        type="text"
                        name="website_link"
                        id="website_link"
                        placeholder="website link"
                        className="mb-3"
                        onChange={this.onChange}
                        href = {this.state.website_link}
                    />
                    <Label for="amount invested">Enter Amount Invested</Label>
                    <Input
                        type="text"
                        name="amount_invested"
                        id="amount_invested"
                        placeholder="amount invested"
                        className="mb-3"
                        onChange={this.onChange}
                    />
                    <Label for="revenue generated">Enter Revenue Generated</Label>
                    <Input
                        type="text"
                        name="revenue_generated"
                        id="revenue_generated"
                        placeholder="revenue generated"
                        className="mb-3"
                        onChange={this.onChange}
                    />
                    <Label for="location">Enter Location</Label>
                    <Input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="location"
                        className="mb-3"
                        onChange={this.onChange}
                    />
                    <Label for="phone number">Enter Phone Number</Label>
                    <Input
                        type="text"
                        name="phone_no"
                        id="phone_no"
                        placeholder="phone no"
                        className="mb-3"
                        onChange={this.onChange}
                    />
                    <Button
                        color="dark"
                        style={{ marginTop: '2rem' }}
                        block
                    >Enter
                    </Button>
                </FormGroup>
            </Form>
        )
    }
}

export default StartupInfo