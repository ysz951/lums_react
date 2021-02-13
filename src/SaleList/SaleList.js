import React, { Component } from 'react';
import SaleRESTService from '../RESTService/SaleRESTService';
import { withRouter, Link } from 'react-router-dom';

class SaleList extends Component {
    state = {
        searchName: "",
        sales: [],
        orgSales: [],
        filter_sale: "All"
    }
    componentDidMount() {
        SaleRESTService.listAllSales()
            .then(res => {
                console.log(res.data);
                this.setState({
                    sales: res.data,
                    orgSales: res.data
                })
            })
            .catch(err => { })
    }

    renderSales() {
        return this.state.sales.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.user}</td>
                <td>{item.license}</td>
                <td>{item.active.toString()}</td>
                <td>{item.purchasedDate}</td>
                <td>{item.expireDate}</td>
                <td><Link className="badge badge-secondary" to={`/sale/${item.id}`}>View</Link></td>
            </tr>
        )
    }

    searchUser = (e) => {
        e.preventDefault();
        console.log(this.state.searchName);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    filter = (e) => {
        e.preventDefault();
        const {filter_sale} = this.state;
        let newList;
        switch(filter_sale) {
            case "All":
                this.setState({sales: this.state.orgSales});
                break;
            case "Active":
                newList = this.state.orgSales.filter(item => item.active);
                this.setState({sales: newList});
                break;
            case "Blocked":
                newList = this.state.orgSales.filter(item => !item.active);
                this.setState({sales: newList});
                break;
            default:
                this.setState({sales: this.state.orgSales});
                break;
        }
    }

    sortById = () => {
        const newList = this.state.sales.sort((a, b) => a.id - b.id);
        this.setState({sales: newList});
    }

    sortByPurchaseDate = () => {
        const newList = this.state.sales
            .sort((a, b) => a.purchasedDate > b.purchasedDate ? 1 : a.purchasedDate === b.purchasedDate ? 0 : -1);
        this.setState({sales: newList});
    }

    sortByExpirationDate = () => {
        const newList = this.state.sales
            .sort((a, b) => a.expireDate > b.expireDate? 1 : a.expireDate === b.expireDate ? 0 : -1);
        this.setState({sales: newList});
    }

    render() {
        return (
            <>
                <form onSubmit={this.filter} className="container">
                    <div className="form-col align-items-center justify-content-center">
                        <div className="form-group">
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect_filter" name="filter_sale"
                                value={this.state.filter_sale} onChange={this.handleChange} >
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Blocked">Blocked</option>
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
                            <th scope="col">User</th>
                            <th scope="col">License</th>
                            <th scope="col">Active</th>
                            <th scope="col"><button type="button" onClick={this.sortByPurchaseDate} 
                                className="cursor">Purchased Date</button></th>
                            <th scope="col"><button type="button" onClick={this.sortByExpirationDate} 
                                className="cursor">Expired Date</button></th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSales()}
                    </tbody>
                </table>
            </>
        )
    }
}

export default withRouter(SaleList);
