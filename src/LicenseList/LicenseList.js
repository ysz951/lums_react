import React, { Component } from 'react';
import SaleRESTService from '../RESTService/SaleRESTService';
import LicenseRESTService from '../RESTService/LicenseRESTService';
import { withRouter, Link } from 'react-router-dom';

class LicenseList extends Component {
    state = {
        licenses: [],
        dol: "",
        price: 0,
        duration: "",
        filter_duration: "All"
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
                <td>{item.active.toString()}</td>
                <td>{item.price}</td>
                <td>{item.duration}</td>
                <td><Link className="badge badge-secondary" to={`/license/${item.id}`}>View</Link></td>
            </tr>
        )
    }

    filter = (e) => {
        e.preventDefault();
        if (this.state.filter_duration !== "All") {
            LicenseRESTService.listAllLicenseByDuration(this.state.filter_duration).then(res => {
                this.setState({
                    licenses: res.data
                })
            }).catch(err => {})
        }
        else {
            LicenseRESTService.listAllLicense().then(res => {
                    this.setState({
                        licenses: res.data
                    })
                })
                .catch(err => {})
        }
    }

    register = (e) => {
        e.preventDefault();
        // console.log(this.state.dol);
        const license = {
            year: this.state.dol.slice(0, 4),
            price: this.state.price,
            duration: this.state.duration
        }
        LicenseRESTService.createLicense(license)
            .then(res => LicenseRESTService.listAllLicense())
            .then(res => {
                this.setState({
                    licenses: res.data
                })
            })
            .catch(err => {
                console.log(err.response.data.price)
            })
            .catch(err => {})
    }

    sortByYear = () => {
        const newList = this.state.licenses.sort((a, b) => a.year - b.year);
        this.setState({licenses: newList});
    }

    sortById = () => {
        const newList = this.state.licenses.sort((a, b) => a.id - b.id);
        this.setState({licenses: newList});
    }

    sortByPrice = () => {
        const newList = this.state.licenses.sort((a, b) => a.price - b.price);
        this.setState({licenses: newList});
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
                                className="form-control" required
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
                                className="form-control" step="0.01" min="0"
                                value={this.state.price} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <form onSubmit={this.filter} className="container">
                    <div className="form-col align-items-center justify-content-center">
                        <div className="form-group">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect_filter">Search by Duration</label>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect_filter" name="filter_duration"
                                value={this.state.filter_duration} onChange={this.handleChange} >
                                <option value="All">All</option>
                                <option value="YEARLY">Yearly</option>
                                <option value="MONTHLY">Monthly</option>
                                <option value="PERVISIT">Pervisit</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Filter</button>
                        </div>
                    </div>
                </form>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"><button type="button" onClick={this.sortById} className="cursor">#</button></th>
                            <th scope="col"><button type="button" onClick={this.sortByYear} className="cursor">Year</button></th>
                            <th scope="col">Active</th>
                            <th scope="col"><button type="button" onClick={this.sortByPrice} className="cursor">Price</button></th>
                            <th scope="col">Duration</th>
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
