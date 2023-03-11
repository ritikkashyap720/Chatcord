import React from 'react'
import logo from '../images/chatcord Logo.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"

export const Navbar = () => {
    const navigate = useNavigate();
    function showProfile(){
        this.props.parentCallback(true);
    }
    function logout() {
        signOut(auth).then(() => {
            navigate("/login")
        })
    }
    return (
        <div className='navbar'>
            <div className="appName">
                <img className="logo" src={logo} alt="logo" />
                <h3>Chatcord</h3>
            </div>

            <div style={{ display: "flex" }}>

                <button className='search-pop'><SearchIcon style={{ fontSize: "30px" }} /></button>
                <div className='moreOption'>
                    <button ><MoreVertIcon style={{ fontSize: "30px" }} /></button>
                    <div className="moreOptions">
                        <div onClick={showProfile} className="button"><AccountCircleIcon style={{ fontSize: "30px" }} /><button>Your Profile</button></div>
                        <div onClick={showSettings} className="button"><SettingsIcon style={{ fontSize: "30px" }} /><button>Setting</button></div>
                        <div className="button" onClick={logout}><LogoutIcon style={{ fontSize: "30px" }} /><button>Logout</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
