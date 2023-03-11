import React, { useContext, useEffect } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ChatContext } from "../context/ChatContext";
import { useState } from 'react';
import { set, ref as ref_database, onValue } from "firebase/database";
import { db } from "../firebase"
export const Userinfo = (sendClick) => {
    const [user, setUser] = useState()
    const { data } = useContext(ChatContext);

    useEffect(() => {
        onValue(ref_database(db, 'users/' + data.user[0]), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUser(data);
            }
        });
    }, [data])

    const handleClick = () => {
        sendClick.display("true");

    }

    window.onhashchange = function () {
        handleClick()
        window.location = "#allChats";
    }
    return (
        <div>
            {/* {user?.map((user) => (
                <div className='userInfo' key={user[1][0]}>
                    <div className='user'>
                        <div className="backButton" onClick={handleClick}>
                            <ArrowBackIosNewIcon />
                        </div>
                        <div className="userImage">
                            <img src={user[1][1].profile_picture} alt="" />
                            <div className="usersImageExpanded">
                                <img src={user[1][1].profile_picture} alt="" />
                            </div>
                        </div>
                        <div className="userDetails">
                            <p className="chatUsername">{user[1][1].name}</p>
                            <p className="chatStatus">{user[1][1].status}</p>  
                        </div>
                    </div>
                    <div className="userInfoOption">
                        <button ><PermIdentityIcon style={{ fontSize: "30px" }} /></button>
                        <div className="UserInfoOptions">
                            <div className='userDetailsCard'>
                                <img src={user[1][1].profile_picture} />
                                <div className="nameStatus">
                                    <p className='name'> {user[1][1].name}</p>
                                    <p className='status'>{user[1][1].userStatus}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ))} */}


            {user && <div className='userInfo'>
                <div className='user'>
                    <div className="backButton" onClick={handleClick}>
                        <ArrowBackIosNewIcon />
                    </div>
                    <div className="userImage">
                        <img src={user.profile_picture} alt="" />
                        <div className="usersImageExpanded">
                            <img src={user.profile_picture} alt="" />
                        </div>
                    </div>
                    <div className="userDetails">
                        <p className="chatUsername">{user.name}</p>
                        <p className="chatStatus">{user.status}</p>
                    </div>
                </div>
                <div className="userInfoOption">
                    <button ><PermIdentityIcon style={{ fontSize: "30px" }} /></button>
                    <div className="UserInfoOptions">
                        <div className='userDetailsCard'>
                            <img src={user.profile_picture} />
                            <div className="nameStatus">
                                <p className='name'> {user.name}</p>
                                <p className='status'>{user.userStatus}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
