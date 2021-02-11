import React, { Component } from 'react';
import LicenseRESTService from '../RESTService/LicenseRESTService';
import { withRouter, Link } from 'react-router-dom';

class LicensePage extends Component {
    state = {
        year: "",
        price: 0,
        duration: "",
        active:""
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        LicenseRESTService.getLicenseById(id)
            .then(res => {
                const license = res.data;
                this.setState({
                    year: license.year,
                    price: license.price,
                    orgPrice: license.price,
                    duration: license.duration,
                    active: license.active.toString(),
                    orgActive: license.active.toString()
                })
            })
            .catch(err => {

            })
    }

    goBack = () => {
        this.props.history.push("/license");
    }

    changeLicnse = (e) => {
        e.preventDefault();
        if (this.state.price !== this.state.orgPrice) {
            this.changePrice().then(res => {
                this.setState({orgPrice: this.state.price})
            }).catch(err => console.log(err.response.data))
        }
        if (this.state.active !== this.state.orgActive) {
            this.changeActive().then(res => {
                this.setState({orgActive: this.state.active})
            }).catch(err => console.log(err.response.data))
        }
    }

    changePrice = () => {
        const { id } = this.props.match.params;
        return LicenseRESTService.setLicensePrice(id, this.state.price);
    }

    changeActive = () => {
        const { id } = this.props.match.params;
        return LicenseRESTService.changeLicenseActive(id, this.state.active);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    render() {
        const { id } = this.props.match.params;

        return (
            <>

                <h1>License Id: {id}</h1>
                <form onSubmit={this.changeLicnse}>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Year</th>
                            <th scope="col">Active</th>
                            <th scope="col">Price</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Log</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <th scope="row">{id}</th>
                            <td>
                                {this.state.year}      
                            </td>
                            <td>
                                <select className="custom-select mr-1" id="activateSelect" name="active" value={this.state.active}
                                    onChange={this.handleChange} >
                                    <option value={"false"}>False</option>
                                    <option value={"true"}>True</option>
                                </select>
                            </td> 
                            <td>
                                <input placeholder="0.00" name="price" type="number"
                                    className="form-control" step="0.01" min="0"
                                    value={this.state.price} onChange={this.handleChange} />
                            </td>
                            <td>
                                {this.state.duration}
                            </td>     
                            <td>
                                View
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex">
                    <button onClick={this.goBack} type="button" className="btn btn-outline-info">Back </button>
                    <button className="btn btn-primary ml-2" type="submit">Save</button>
                </div>
                </form>
            </>
        )
    }
}

export default withRouter(LicensePage);
