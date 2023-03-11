import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { set, ref} from "firebase/database";
import { db} from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from "../context/ChatContext";
import { useContext} from 'react';

export const Input = () => {
    const { currentUser } = useContext(AuthContext)
    var { data } = useContext(ChatContext);
    var user = Object.entries(data);
    var combinedId = currentUser.uid > user[0][1][0]
        ? currentUser.uid + user[0][1][0]
        : user[0][1][0] + currentUser.uid;

    const handlesubmit = async (e) => {
        e.preventDefault()
        const message = e.target[0].value;

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

        if (message.trim() !== '') {
            // console.log(combinedId)
            const currentDate = new Date();
            const date = currentDate.getDate();
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            const minutes = currentDate.getMinutes();
            const hours = currentDate.getHours();
            const second = currentDate.getSeconds();
            const timestamp = new Date().getTime();
            // console.log(timestamp);

            let monthDateYear = date + '-' + (month + 1) + '-' + year;
            let time = hours + ':' + minutes + ':' + second;
            try {
                set(ref(db, 'chats/' + combinedId + "/" + timestamp), {
                    time: convertTime(time),
                    sender: currentUser.uid,
                    message: message
                })

                set(ref(db, 'usersChat/' + currentUser.uid + "/" + user[0][1][0]), {
                    combinedId: combinedId,
                    date: monthDateYear,
                    lastmsg: message,
                    time: convertTime(time)
                })

                set(ref(db, 'usersChat/' + user[0][1][0] + "/" + currentUser.uid), {
                    combinedId: combinedId,
                    date: monthDateYear,
                    lastmsg: message,
                    time: convertTime(time)
                })

                e.target[0].value = ''
                document.getElementById("inputMsg").focus()
            }
            catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className='input'>
            <form autoComplete="off" onSubmit={handlesubmit} id="messageForm" className="inputContainer">
                <input type="search" aria-autocomplete="both" aria-haspopup="false" id="inputMsg" placeholder='Type a message' autoComplete="off"/>
                <button type='submit' id="sendMessage"><SendIcon style={{ fontSize: "25px" }} /></button>
            </form>
        </div>
    )
}
