import React, { useEffect, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase"
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatIcon from '@mui/icons-material/Chat';
import { ChatContext } from "../context/ChatContext";

export const Search = (senduser) => {
    const [users, setUsers] = useState();
    const [afterSearch, setAfterSearch] = useState({})
    const { currentUser } = useContext(AuthContext)
    const [userDetails, setUsersDetails] = useState({})


    useEffect(() => {
        onValue(ref(db, 'users/' + currentUser.uid), (snapshot) => {
            if (snapshot.val()) {
                setUsersDetails(snapshot.val())
            }
        })
    }, [])


    useEffect(() => {
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setUsers(data)
        });

    }, [])
 
    function searchUser() {
        var InputUser = document.getElementById("searchUser").value;
        var filter = InputUser.toUpperCase();
        let queryUser = []
        for (let i = 0; i < Object.keys(users).length; i++) {
            if (Object.keys(users)[i] !== currentUser.uid) {
                var a = Object.values(users)[i]["name"];
                if (filter !== "") {
                    if (a.toUpperCase().indexOf(filter) > -1) {
                        queryUser.push(Object.entries(users)[i])
                    }
                }
            }
        }

        queryUser.sort(function (a, b) {
            if (a[1].name < b[1].name) {
                return -1;
            }
            if (a[1].name > b[1].name) {
                return 1;
            }
            return 0;
        });
        setAfterSearch(queryUser)


    }

    const { dispatch } = useContext(ChatContext);
    const handleSelect = async (user) => {
        dispatch({ type: "CHANGE_USER", payload: user });

        function convertTime(time) {
            let timeArr = time.split(':');
            let hours = parseInt(timeArr[0]);
            let minutes = timeArr[1];
            let amPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            if(minutes<10){
              minutes="0"+minutes;
            }
            let convertedTime = `${hours}:${minutes} ${amPm}`;
            return convertedTime;
          }

        senduser.userId(user)
        const combinedId = currentUser.uid > user[0]
            ? currentUser.uid + user[0]
            : user[0] + currentUser.uid;
        // console.log(combinedId)
        const chatRef = ref(db, 'chats/' + combinedId);
        await onValue(chatRef, (snapshot) => {
            if (snapshot.val()) {
                console.log("exist")
            }
            else {
                console.log("not exist")
                // for date
                const currentDate = new Date();
                const date = currentDate.getDate();
                const month = currentDate.getMonth();
                const year = currentDate.getFullYear();
                const minutes = currentDate.getMinutes();
                const hours = currentDate.getHours();
                const second = currentDate.getSeconds();

                let monthDateYear = date + '-' + (month + 1) + '-' + year;
                let time = hours+':'+minutes+':'+second;
                set(ref(db, 'usersChat/' + currentUser.uid + "/" + user[0]), {
                    combinedId: combinedId,
                    date: monthDateYear,
                    lastmsg: "Say hii",
                    time:convertTime(time)
                })
                set(ref(db, 'usersChat/' + user[0] + "/" + currentUser.uid), {
                    combinedId: combinedId,
                    date: monthDateYear,
                    lastmsg: "Say hii",
                    time:convertTime(time)
                })
            }
        });
    };

    return (
        <div className='search'>
            <div className="searchContainer">
                <SearchIcon style={{ fontSize: "25px" }}/><input id="searchUser" onKeyUp={searchUser} type="search" placeholder="Search for your friend"/>
            </div>
            <div className="users" id="userContainer">
                {Object.entries(afterSearch)?.map((user) =>
                (<div className="searchedUser" key={user[0][0]} >
                    <div className='user'>
                        <div className='userImageBlank'>
                            <img className='userImage' src={user[1][1].profile_picture} alt="" />
                        </div><div className="userDetails">
                            <p>{user[1][1].name}</p>
                            <p className='status'>{user[1][1].userStatus}</p>
                        </div>
                    </div>
                    <button className="addfriend" onClick={() => handleSelect(user[1])}>
                        <ChatIcon />
                    </button>
                </div>
                ))
                }
            </div>

        </div>

    )
}
