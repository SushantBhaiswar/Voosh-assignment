import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./dashboard.css"
import { SERVER_URI } from "./config/keys"
axios.defaults.withCredentials = true;

export default function Dashboard() {

    const [sub_total, setSub_total] = useState(0)
    const [orderdata, setOrderata] = useState([])
    const [total, setTotal] = useState(0)
    const location = useLocation()
    const getdata = async () => {
        await axios.get(`${SERVER_URI}/get-order/${location.state.userdetails._id}`, {
            withCredentials: true,
        })
            .then((res) => {
               
                if (res.status === 200) {
                    setOrderata(res.data.finduser)
                    setTotal(res.data.total)
                }
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getdata()
    }, [])
    const submit = () => {
        
        axios.post(`${SERVER_URI}/add-order`, {
            sub_total
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Order added successfully !")
                window.location.reload()
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div className="main-box">
                <div className='left-box'>
                    <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                    <h5 >Enter Sub-total</h5>
                    <input type="number" name='subtotal' value={sub_total} onChange={(e) => {
                        setSub_total(e.target.value)
                    }} />
                    <button onClick={submit}>ADD ORDER</button>
                </div>

                <div className='right-box'>
                    <h1 >User Details</h1>
                    <div className="box-containt">
                        <h3 >User Name : {location.state.userdetails.fname} </h3>
                        <h3>Phone Number : {location.state.userdetails.phone} </h3>
                        <h3>Total : {total} </h3>
                    </div>
                </div>
            </div>
            {console.log(orderdata)}
            <div className="order-box">
                <h1>Order-Details</h1>
                {
                    orderdata.map((elm) => {
                        return (<>
                            <div className="order-data" key={orderdata._id}>
                                <h3>Sub-Total : {elm.sub_total}</h3>
                                <h3>Order-Date: {elm.createdAt}</h3>
                            </div>
                        </>)
                    })
                }
            </div>
        </>

    )
}
