import { useState, useEffect } from 'react';
import SaleRESTService from '../RESTService/SaleRESTService';
import { useHistory, useParams } from 'react-router-dom';

function SalePageHooks() {
    const { id } = useParams();
    const history = useHistory();
    const [state, setState] = useState({
        active: "true",
        purchasedDate: "2020/12/02",
        orgActive: " true",
        expireDate: "",
        orgExpireDate: "",
        user: 1,
        license: 2,
        error: null
    })

    useEffect(() => {
        SaleRESTService.findSaleById(id)
            .then(res => {
                console.log(res.data);
                const sale = res.data;
                const expirationDate = (sale.expireDate || "").split("/").join("-");
                console.log(expirationDate)
                setState({
                    ...state, 
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
    }, [])

    const goBack = () => {
        history.push("/sale");
    }

    const changeSale= (e) => {
        e.preventDefault();
        setState({...state, error: null});
        if (state.active !== state.orgActive) {
            changeActive().then(res => {
                
                setState({...state, orgActive: state.active})
            }).catch(err => console.log(err.response.data))
        }
        if (state.expireDate !== "" && state.expireDate !== state.orgExpireDate) {
            
            changeExpirationDate().then(res => {
                setState({...state, orgExpireDate: state.expireDate})
            }).catch(err => setState({...state, error: err.response.data.error}))
        }
    }

    const changeExpirationDate = () => {
        const dateArr = state.expireDate.split("-");
        // console.log(dateArr);
        const year = dateArr[0], month = dateArr[1], date = dateArr[2];
        return SaleRESTService.changeSaleExpiration(id, year, month, date);
    }

    const changeActive = () => {
        return SaleRESTService.changeSaleActive(id, state.active);
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        
    }
    return (
        <>
            <h1>SaleId: {id}</h1>
            <form onSubmit={changeSale}>
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
                            {state.user}      
                        </td>
                        <td>
                            {state.license}      
                        </td>
                        <td>
                            <select className="custom-select mr-1" id="activateSelect" name="active" value={state.active}
                                onChange={handleChange} >
                                <option value={"false"}>False</option>
                                <option value={"true"}>True</option>
                            </select>
                        </td> 
                        <td>
                            {state.purchasedDate}
                        </td>
                        <td>
                        <input placeholder="Date (YYYY-MM-DD)" name="expireDate" type="date" data-date-format="yyyy/mm/dd"
                            className="form-control" value={state.expireDate} onChange={handleChange} />
                        </td>     
                    </tr>
                </tbody>
            </table>
            <div className="d-flex">
                <button onClick={goBack} type="button" className="btn btn-outline-info">Back </button>
                <button className="btn btn-primary ml-2" type="submit">Save</button>
            </div>
            {state.error && <p className="text-danger" >{state.error}</p>}
            </form>
        </>
    )
}

export default SalePageHooks;