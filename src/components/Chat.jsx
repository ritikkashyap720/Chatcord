import React, { useContext, useState } from 'react'
import { Message } from './Message'
import { Userinfo } from './Userinfo'
import { Input } from './Input'
import { ChatContext } from "../context/ChatContext";
import { useEffect } from 'react';
import { SelectChat } from './SelectChat';


export const Chat = (props) => {
  const [userExist, setUserExist] = useState(false)
  const [userEmpty, setUserEmpty] = useState(false)
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const user = Object.entries(data);
    if (user[0][1].length === 0) {
      setUserEmpty(true)
      setUserExist(false)
    }
    else {
      setUserEmpty(false)
      setUserExist(true)
    }

  })

  useEffect(() => {
    if (props.userId) {
      if (window.innerWidth <= 850) {
        const chat = document.getElementById("chat");
        chat.style.display = "block";
      }
    }
  }, [props.userId])
  
  const takeClick = (data) => {
    props.display(data)
  
  }



  return (
    <div className='chat' id="chat">
      {userExist && <Userinfo display={takeClick} />}
      {userExist && <Message userId={props.userId} />}
      {userExist && <Input />}
      {userEmpty && <SelectChat />}
    </div>
  )
}
