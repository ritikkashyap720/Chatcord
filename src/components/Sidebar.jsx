import React, { useEffect, useState } from 'react'
import { AllChats } from './AllChats'
import { Profile } from './Profile'
import { Search } from './Search'
import { Settings } from './Settings'
import logo from '../images/logo.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const Sidebar = (props) => {
    const [profile, setProfile] = useState();
    const [search, setSearch] = useState();
    const [settings, setSettings] = useState();
    const [chats, setChats] = useState(true);


    function showSearch() {
        setProfile(false)
        setChats(false)
        setSettings(false)
        setSearch(true)
    }

    function showProfile() {
        setProfile(true)
        setSettings(false)
        setChats(false)
        setSearch(false)
    }

    function showSettings() {
        setProfile(false)
        setChats(false)
        setSearch(false)
        setSettings(true)
    }

    function back() {
        setSettings(false);
        setProfile(false);
        setChats(true)
        setSearch(false)
    }

    const takeTheme = (data) => {
        props.mode(data);
    }


    const takeUser = (data) => {
        props.userId(data)
    }


    return (
        <div className='sidebar' id="sidebar">
            <div className='navbar'>
                <div className="appName">
                    <img className="logo" src={logo} alt="logo" />
                    <h3>Chatcord</h3>
                </div>
                <div style={{ display: "flex" }}>
                    <button onClick={showSearch} className='search-pop'><SearchIcon style={{ fontSize: "30px" }} /></button>
                    <div className='moreOption'>
                        <button ><MoreVertIcon style={{ fontSize: "30px" }} /></button>
                        <div className="moreOptions">
                            <div onClick={showProfile} className="button"><AccountCircleIcon style={{ fontSize: "30px" }} /><button>Your Profile</button></div>
                            <div onClick={showSettings} className="button"><SettingsIcon style={{ fontSize: "30px" }} /><button>Setting</button></div>
                        </div>
                    </div>
                </div>
            </div>

            {search && <div className="back"> <span onClick={back}><ArrowBackIosNewIcon /></span><h3>Search</h3></div>}
            {search && <Search userId={takeUser} />}
            {profile && <div className="back"> <span onClick={back}><ArrowBackIosNewIcon /></span><h3>Your profile</h3></div>}
            {profile && <Profile />}
            {settings && <div className="back"> <span onClick={back}><ArrowBackIosNewIcon /></span><h3>Settings</h3></div>}
            {settings && <Settings mode={takeTheme} />}
            {chats && <AllChats userId={takeUser} />}
        </div>


    )
}

