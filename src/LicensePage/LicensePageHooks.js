import {useState, useEffect} from 'react';
import LicenseRESTService from '../RESTService/LicenseRESTService';
import { useHistory, useParams } from 'react-router-dom';

function LicensePageHooks () {
    const [year, setYear] = useState("");
    const [price, setPrice] = useState(0);
    const [orgPrice, setOrgPrice] = useState(0);
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState("");
    const [orgActive, setOrgActive] = useState("");
    const { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        LicenseRESTService.getLicenseById(id)
            .then(res => {
                const license = res.data;
                setYear(license.year);
                setPrice(license.price);
                setOrgPrice(license.price);
                setDuration(license.duration);
                setActive(license.active.toString());
                setOrgActive(license.active.toString());
            })
            .catch(err => {

            })
    }, [])
    const goBack = () => {
        history.push("/license");
    }

    const changeLicnse = (e) => {
        e.preventDefault();
        if (price !== orgPrice) {
            changePrice().then(res => {
                setOrgPrice(price);
                // this.setState({orgPrice: this.state.price})
            }).catch(err => console.log(err.response.data))
        }
        if (active !== orgActive) {
            changeActive().then(res => {
                setOrgActive(active);
                // this.setState({orgActive: this.state.active})
            }).catch(err => console.log(err.response.data))
        }
    }

    const changePrice = () => {
     
        return LicenseRESTService.setLicensePrice(id, price);
    }

    const changeActive = () => {

        return LicenseRESTService.changeLicenseActive(id, active);
    }
    return (
        <>

            <h1>License Id: {id}</h1>
            <form onSubmit={changeLicnse}>
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
                            {year}      
                        </td>
                        <td>
                            <select className="custom-select mr-1" id="activateSelect" name="active" value={active}
                                onChange={e => setActive(e.target.value)} >
                                <option value={"false"}>False</option>
                                <option value={"true"}>True</option>
                            </select>
                        </td> 
                        <td>
                            <input placeholder="0.00" name="price" type="number"
                                className="form-control" step="0.01" min="0"
                                value={price} onChange={e => setPrice(e.target.value)} />
                        </td>
                        <td>
                            {duration}
                        </td>     
                        <td>
                            View
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="d-flex">
                <button onClick={goBack} type="button" className="btn btn-outline-info">Back </button>
                <button className="btn btn-primary ml-2" type="submit">Save</button>
            </div>
            </form>
        </>
    )
}

export default LicensePageHooks;