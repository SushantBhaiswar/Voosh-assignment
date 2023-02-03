import "./header.css"
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export default function Header() {
    let token = localStorage.getItem("userdatatoken");

    const history = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout = async () => {
        axios.post("http://localhost:3001/logout")
            .then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem("userdatatoken")
                    history("/");
                }
            }).catch((err) => {
                console.log(err);
                if (err.response.data.status === 401 || !err) {
                    history("*");
                }
            })
    }
    return (
        <>
            <header >
                <nav>
                    <h1>VOOSH</h1>
                    <div className="avatar">
                        <Avatar style={{ background: "blue" }} onClick={handleClick} />

                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            token ? (
                                <>
                                    {/* <MenuItem onClick={() => {
                                        const goDash = () => {
                                            history("/dash")
                                        }
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem> */}
                                    <MenuItem onClick={() => {
                                        Logout()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        (() => { toast.error("Login to see Profile Page !") })()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }
                    </Menu>

                </nav>
            </header>
            <ToastContainer position="top-right" />
        </>
    )
}
