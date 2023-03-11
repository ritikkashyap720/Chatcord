import React, { useEffect, useContext, useState } from 'react'
import { ref, onValue } from "firebase/database";
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from "../context/ChatContext";

export const Message = (props) => {
  const { currentUser } = useContext(AuthContext)
  const [combinedId, setCombinedId] = useState();
  const [userImage , setuserImage ] = useState();
  const [modifiedChats, setModifiedChats] = useState([])


  const [chatUserImage, setchatUserImage] = useState()
  const { data } = useContext(ChatContext);

  useEffect(() => {
      // setUser(Object.entries(data));
      setchatUserImage(data.user[1].profile_picture)
     
  }, [data])

  
  useEffect(() => {

    onValue(ref(db, 'users/' + currentUser.uid), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setuserImage(data.profile_picture);
      }
    });


    
    if (props.userId) {
      const user = Object.entries(props.userId);
      if (user.length !== "") {
        const mergedId = currentUser.uid > user[0][1]
          ? currentUser.uid + user[0][1]
          : user[0][1] + currentUser.uid;
        setCombinedId(mergedId);
        // console.log(mergedId)
      }
      setModifiedChats(null);
    }
    // console.log(modifiedChats);
  }, [combinedId == null, props.userId])

  // after getting combined id
  useEffect(() => {
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
    
    
   
    const getChats = async () => {
      await onValue(ref(db, 'chats/' + combinedId), (snapshot) => {
        if (snapshot.val()) {
          var chatArray = Object.entries(snapshot.val())
          let newArray = []
          for (let i = 0; i < chatArray.length; i++) {
            let newChat = {}
            // console.log(chatArray[i][0]);
            if (chatArray[i][1].sender === currentUser.uid) {
              newChat = {
                message: chatArray[i][1].message,
                sender: "sendMsg",
                time: chatArray[i][1].time,
                img:userImage
              }
              
            }
            else {
              newChat = {
                message: chatArray[i][1].message,
                sender: "msg",
                time: chatArray[i][1].time,
                img: chatUserImage
              }
            }

            newArray[i] = [chatArray[i][0], newChat];
          }
          setModifiedChats(newArray)
        }
        else {
          setModifiedChats(null)
        }
      })
    }
    getChats();
  }, [combinedId, modifiedChats == null, props.userId])

  useEffect(() => {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  }, [modifiedChats])


  return (
    <div className='message' id="messageContainer">
      {modifiedChats && modifiedChats.map((chat) =>
        (<div key={chat[0]} className={chat[1].sender}>
          <div className='msgd'>
          <p className='msgText'>{chat[1].message}</p>
          <span className='msgTime'>{chat[1].time}</span>
          </div>
          </div>
        )
      )}
    </div>
  )
}
