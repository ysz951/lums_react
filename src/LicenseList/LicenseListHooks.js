import {useState, useEffect, useContext} from 'react';
import LicenseRESTService from '../RESTService/LicenseRESTService';
import { Link } from 'react-router-dom';
function LicenseListHooks(props) {
    const [licenses, setLicenses] = useState([]);
    const [dol, setDol] = useState("");
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState("");
    const [filter_duration, setFilter_duration] = useState("All");
    const [role, setRole] = useState("");
    useEffect(() => {
        setRole(localStorage.getItem("role"));
        LicenseRESTService.listAllLicense()
            .then(res => {
                setLicenses(res.data);
            })
            .catch(err => {

            })
    }, [])
    const purchase = (id) => {
        LicenseRESTService.purChaseLicense(id)
            .then(res => {

            })
            .catch(err => {
                alert(err.response.data.message)
                console.log(err.response.data)
            })
    }
    const register = (e) => {
        e.preventDefault();
        const license = {
            year: dol.slice(0, 4),
            price: price,
            duration: duration
        }
        LicenseRESTService.createLicense(license)
            .then(res => LicenseRESTService.listAllLicense())
            .then(res => {
                setLicenses(res.data);
            })
            .catch(err => {
                console.log(err.response.data)
                
            })
    }

    const renderLicenses = () => {
        return licenses.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.year}</td>
                <td>{item.active.toString()}</td>
                <td>{item.price}</td>
                <td>{item.duration}</td>
                {(role === 'ROLE_ADMIN' || role === 'ROLE_SUPERUSER') && <td><Link className="badge badge-secondary" to={`/license/${item.id}`}>View</Link></td>}
                <td><button onClick={() => purchase(item.id)} className="btn btn-primary">Done</button></td>
            </tr>
        )
    }

    const filter = (e) => {
        e.preventDefault();
        if (filter_duration !== "All") {
            LicenseRESTService.listAllLicenseByDuration(filter_duration).then(res => {
                console.log(res.data);
                setLicenses(res.data);
            }).catch(err => {})
        }
        else {
            LicenseRESTService.listAllLicense().then(res => {
                    setLicenses(res.data);
                })
                .catch(err => {})
        }
    }

    const sortByYear = () => {
        const newList = licenses.sort((a, b) => a.year - b.year);
        setLicenses(newList);
    }

    const sortById = () => {
        const newList = licenses.sort((a, b) => a.id - b.id);
        setLicenses(newList);
    }

    const sortByPrice = () => {
        const newList = licenses.sort((a, b) => a.price - b.price);
        setLicenses(newList);
    }

    return (
        <>
            {(role === 'ROLE_ADMIN' || role === 'ROLE_SUPERUSER') && 
                <form onSubmit={register} className="container">
                    <div className="form-col align-items-center justify-content-center">
                        <div className="form-group">
                            <label> Date of License: </label>
                            <input placeholder="Date (YYYY-MM-DD)" name="dol" type="date"
                                className="form-control" required
                                value={dol} onChange={e => setDol(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Duration</label>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="duration"
                                value={duration} onChange={e => setDuration(e.target.value)} required>
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
                                value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            }
            <form onSubmit={filter} className="container">
                <div className="form-col align-items-center justify-content-center">
                    <div className="form-group">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect_filter">Search by Duration</label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect_filter" name="filter_duration"
                            value={filter_duration} onChange={e => setFilter_duration(e.target.value)} >
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
                        <th scope="col"><button type="button" onClick={sortById} className="cursor">#</button></th>
                        <th scope="col"><button type="button" onClick={sortByYear} className="cursor">Year</button></th>
                        <th scope="col">Active</th>
                        <th scope="col"><button type="button" onClick={sortByPrice} className="cursor">Price</button></th>
                        <th scope="col">Duration</th>
                        {(role === 'ROLE_ADMIN' || role === 'ROLE_SUPERUSER') && <th scope="col">Detail</th>}
                        <th scope="col">Purchase</th>
                    </tr>
                </thead>
                <tbody>
                    {renderLicenses()}
                </tbody>
            </table>
        </>

    )

}
export default LicenseListHooks;