import { useState, useEffect } from 'react';
import SaleRESTService from '../RESTService/SaleRESTService';
import { Link } from 'react-router-dom';

function SaleListHooks() {
    // searchName: "",
    //     sales: [],
    //     orgSales: [],
    //     filter_sale: "All"
    const role = localStorage.getItem('role');
    const [sales, setSales] = useState([]);
    const [orgSales, setOrgSales] = useState([]);
    const [filter_sale, setFilter_sale] = useState("All");
    useEffect(() => {
        SaleRESTService.listAllSales()
            .then(res => {
                console.log(res.data);
                setSales(res.data);
                setOrgSales(res.data);
            })
            .catch(err => { })
    }, [])

    const renderSales = () => {
        return sales.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.user}</td>
                <td>{item.license}</td>
                <td>{item.active.toString()}</td>
                <td>{item.purchasedDate}</td>
                <td>{item.expireDate}</td>
                {role in ['Role_SUPERUSER' , 'Role_ADMIN'] && <td><Link className="badge badge-secondary" to={`/sale/${item.id}`}>View</Link></td>}
            </tr>
        )
    }

    const filter = (e) => {
        e.preventDefault();
        let newList;
        switch(filter_sale) {
            case "All":
                setSales(orgSales);
                break;
            case "Active":
                newList = orgSales.filter(item => item.active);
                setSales(newList);
                break;
            case "Blocked":
                newList = orgSales.filter(item => !item.active);
                setSales(newList);
                break;
            default:
                setSales(orgSales);
                break;
        }
    }

    const sortById = () => {
        setSales([...sales].sort((a, b) => a.id - b.id))
    }

    const sortByPurchaseDate = () => {
        setSales([...sales].sort((a, b) => a.purchasedDate > b.purchasedDate ? 1 : a.purchasedDate === b.purchasedDate ? 0 : -1));
    }

    const sortByExpirationDate = () => {
        setSales([...sales].sort((a, b) => a.expireDate > b.expireDate? 1 : a.expireDate === b.expireDate ? 0 : -1));
    }

    return (
        <>
            <form onSubmit={filter} className="container">
                <div className="form-col align-items-center justify-content-center">
                    <div className="form-group">
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect_filter" name="filter_sale"
                            value={filter_sale} onChange={e => setFilter_sale(e.target.value)} >
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
                        <th scope="col"><button type="button" onClick={sortById} className="cursor">#</button></th>
                        <th scope="col">User</th>
                        <th scope="col">License</th>
                        <th scope="col">Active</th>
                        <th scope="col"><button type="button" onClick={sortByPurchaseDate} 
                            className="cursor">Purchased Date</button></th>
                        <th scope="col"><button type="button" onClick={sortByExpirationDate} 
                            className="cursor">Expired Date</button></th>
                        {role in ['Role_SUPERUSER' , 'Role_ADMIN'] && <th scope="col">View</th>}
                    </tr>
                </thead>
                <tbody>
                    {renderSales()}
                </tbody>
            </table>
        </>
    )
}

export default SaleListHooks;