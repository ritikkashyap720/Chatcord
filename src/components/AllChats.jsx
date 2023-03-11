import React, { useEffect, useContext, useState } from 'react'
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from "../context/ChatContext";

export const AllChats = (senduser) => {
  const { currentUser } = useContext(AuthContext);
  const [allUser, setAllUsers] = useState({});
  const [users, setUsers] = useState({});
  const [usersExist, setUsersExist] = useState(true)
  // const [animate, setAnimate] = useState(true)

  

  useEffect(() => {
    onValue(ref(db, 'users/'), (snapshot) => {
      if (snapshot.val()) {
        setAllUsers(snapshot.val())
      }
    })
  }, [])

  useEffect(() => {
    if (currentUser.uid) {
      onValue(ref(db, 'usersChat/' + currentUser.uid), (snapshot) => {
        if (snapshot.val()) {
          // console.log(snapshot.val())
          setUsers(snapshot.val())
          setUsersExist(true);
        }
        else {
          setUsersExist(false)
        }
      })
    }
    else {
      // console.log("user id not found")
    }

  }, [currentUser.uid])

  var mergedUsers = [];
  const alluserLength = Object.keys(allUser).length
  if (users) {
    for (let i = 0; i < Object.keys(users).length; i++) {
      for (let j = 0; j < alluserLength; j++) {
        if (Object.keys(users)[i] === Object.keys(allUser)[j]) {
          // mergedUsers.push(Object.assign(Object.entries(allUser)[j][1],Object.entries(users)[i][1]))
          const uid = Object.keys(users)[i];
          mergedUsers[j] = [uid, Object.assign(Object.entries(allUser)[j][1], Object.entries(users)[i][1])]

        }
      }

    }
  }

  const { dispatch } = useContext(ChatContext);
  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    senduser.userId(user)
    window.location = "#allChats";
  };

  return (
    <div className='allChats' id="allChats">
      <h3>Messages</h3>
      <div className="allChatsContainer">
        {mergedUsers?.map((user) => (
          <div className="chats" key={user[0]} onClick={() => handleSelect(user)}>
            <div className='users'>
              <div className="usersImage">
                <img src={user[1].profile_picture} alt="" />
                <div className="usersImageExpanded">
                  <img src={user[1].profile_picture} alt="" />
                </div>
              </div>

              <div className="usersDetails">
                <p className="username">{user[1].name}</p>
                <p className="message">{user[1].lastmsg}</p>
              </div>
            </div>
            <div className="msgStatus">
              <div className="time">{user[1].date}</div>
              <div className="msgNo">{user[1].time}</div>
            </div>
          </div>


        ))

        }

        {/* {animate && <div>
          <div className="chatsLoad">
            <div className='users'>
              <div className="usersImage">
              </div>

              <div className="usersDetails">
                <div className="username"></div>
                <div className="message"></div>
              </div>
            </div>
            <div className="msgStatus">
              <div className="time"></div>
              <div className="msgNo"></div>
            </div>
          </div>
          <div className="chatsLoad">
            <div className='users'>
              <div className="usersImage">
              </div>

              <div className="usersDetails">
                <div className="username"></div>
                <div className="message"></div>
              </div>
            </div>
            <div className="msgStatus">
              <div className="time"></div>
              <div className="msgNo"></div>
            </div>
          </div>
          <div className="chatsLoad">
            <div className='users'>
              <div className="usersImage">
              </div>

              <div className="usersDetails">
                <div className="username"></div>
                <div className="message"></div>
              </div>
            </div>
            <div className="msgStatus">
              <div className="time"></div>
              <div className="msgNo"></div>
            </div>
          </div>
          <div className="chatsLoad">
            <div className='users'>
              <div className="usersImage">
              </div>

              <div className="usersDetails">
                <div className="username"></div>
                <div className="message"></div>
              </div>
            </div>
            <div className="msgStatus">
              <div className="time"></div>
              <div className="msgNo"></div>
            </div>
          </div>
          <div className="chatsLoad">
            <div className='users'>
              <div className="usersImage">
              </div>

              <div className="usersDetails">
                <div className="username"></div>
                <div className="message"></div>
              </div>
            </div>
            <div className="msgStatus">
              <div className="time"></div>
              <div className="msgNo"></div>
            </div>
          </div>
          <div className="chatsLoad">
            <div className='users'>
              <div className="usersImage">
              </div>

              <div className="usersDetails">
                <div className="username"></div>
                <div className="message"></div>
              </div>
            </div>
            <div className="msgStatus">
              <div className="time"></div>
              <div className="msgNo"></div>
            </div>
          </div>


        </div>} */}



        {!usersExist && <div className='noUsers'>
          <p>Click on search to find your friends.</p>
        </div>}
      </div>
    </div>
  )
}
