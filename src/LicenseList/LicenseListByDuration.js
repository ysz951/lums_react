import React, { Component } from 'react';
import SaleRESTService from '../RESTService/SaleRESTService';
import LicenseRESTService from '../RESTService/LicenseRESTService';
import { withRouter } from 'react-router-dom';

class LicenseList extends Component {
    state = {
        licenses: [],
        dol: "",
        price: 0,
        duration: ""
    }

    componentDidMount() {
        LicenseRESTService.listAllLicense()
            .then(res => {
                this.setState({
                    licenses: res.data
                })
            })
            .catch(err => {

            })
    }

    renderLicenses() {
        return this.state.licenses.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.year}</td>
                <td>{item.price}</td>
                <td>View</td>
            </tr>
        )
    }

    register = (e) => {
        e.preventDefault();
        // console.log(this.state.dol);
        const license = {
            year: this.state.dol.slice(0, 4),
            price: this.state.price
        }
        LicenseRESTService.createLicense(license)
            .then(res => {
                LicenseRESTService.listAllLicense()
                    .then(res => {
                        this.setState({
                            licenses: res.data
                        })
                    })
                    .catch(err => {

                    })
            })
            .catch(err => {
                
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.register} className="container">
                    <div className="form-col align-items-center justify-content-center">
                        <div className="form-group">
                            <label> Date of License: </label>
                            <input placeholder="Date (YYYY-MM-DD)" name="dol" type="date"
                                className="form-control"
                                value={this.state.dol} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Duration</label>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="duration" 
                                value={this.state.duration} onChange={this.handleChange} required>
                                <option value="">Choose...</option>
                                <option value="YEARLY">Yearly</option>
                                <option value="MONTHLY">Monthly</option>
                                <option value="PERVISIT">Pervisit</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label> Price: </label>
                            <input placeholder="0.00" name="price" type="number"
                                className="form-control" step="0.01"
                                value={this.state.price} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Year</th>
                            <th scope="col">Price</th>
                            <th scope="col">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLicenses()}
                    </tbody>
                </table>
            </>

        )
    }
}

export default withRouter(LicenseList);
