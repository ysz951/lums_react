import React, { Component } from 'react';
import SaleRESTService from '../RESTService/SaleRESTService';
import { withRouter, Link } from 'react-router-dom';

class SalePage extends Component {
    state = {
        active: "true",
        purchasedDate: "2020/12/02",
        expireDate: "",
        user: 1,
        license: 2,
        error: ""
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        SaleRESTService.findSaleById(id)
            .then(res => {
                console.log(res.data);
                const sale = res.data;
                const expirationDate = (sale.expireDate || "").split("/").join("-");
                this.setState({
                    active: sale.active.toString(),
                    purchasedDate: sale.purchasedDate,
                    orgActive: sale.active.toString(),
                    expireDate: expirationDate,
                    orgExpireDate: expirationDate,
                    user: sale.user,
                    license: sale.license
                    
                })
            })
            .catch(err => {

            })
    }

    goBack = () => {
        this.props.history.push("/sale");
    }

    changeSale= (e) => {
        e.preventDefault();
        this.setState({error: ""});
        if (this.state.active !== this.state.orgActive) {
            this.changeActive().then(res => {
                this.setState({orgActive: this.state.active})
            }).catch(err => console.log(err.response.data))
        }
        if (this.state.expireDate !== "" && this.state.expireDate !== this.state.orgExpireDate) {
            
            this.changeExpirationDate().then(res => {
                this.setState({orgExpireDate: this.state.expireDate})
            }).catch(err => this.setState({error: err.response.data.error}))
        }
    }

    changeExpirationDate = () => {
        const { id } = this.props.match.params;
        const dateArr = this.state.expireDate.split("-");
        // console.log(dateArr);
        const year = dateArr[0], month = dateArr[1], date = dateArr[2];
        return SaleRESTService.changeSaleExpiration(id, year, month, date);
    }

    changeActive = () => {
        const { id } = this.props.match.params;
        return SaleRESTService.changeSaleActive(id, this.state.active);
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
                <h1>SaleId: {id}</h1>
                <form onSubmit={this.changeSale}>
                <table className="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                            <th scope="col">User</th>
                            <th scope="col">License</th>
                            <th scope="col">Active</th>
                            <th scope="col">Purchased Date</th>
                            <th scope="col">Expired Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <th scope="row">{id}</th>
                            <td>
                                {this.state.user}      
                            </td>
                            <td>
                                {this.state.license}      
                            </td>
                            <td>
                                <select className="custom-select mr-1" id="activateSelect" name="active" value={this.state.active}
                                    onChange={this.handleChange} >
                                    <option value={"false"}>False</option>
                                    <option value={"true"}>True</option>
                                </select>
                            </td> 
                            <td>
                                {this.state.purchasedDate}
                            </td>
                            <td>
                            <input placeholder="Date (YYYY-MM-DD)" name="expireDate" type="date" data-date-format="yyyy/mm/dd"
                                className="form-control" value={this.state.expireDate} onChange={this.handleChange} />
                            </td>     
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex">
                    <button onClick={this.goBack} type="button" className="btn btn-outline-info">Back </button>
                    <button className="btn btn-primary ml-2" type="submit">Save</button>
                </div>
                <p className="text-danger" >{this.state.error}</p>
                </form>
            </>
        )
    }
}

export default withRouter(SalePage);
