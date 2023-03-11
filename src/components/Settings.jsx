import React, { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"
import LogoutIcon from '@mui/icons-material/Logout';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Settings = (modeTheme) => {

  const [theme, setTheme] = useState();
  const inputDark = useRef(null);
  const inputLight = useRef(null);
  const navigate = useNavigate();

  function changeTheme(theme) {
    localStorage.setItem("Theme", theme);
    modeTheme.mode(theme);
  }
  useEffect(() => {
    function checkTheme() {
      setTheme(localStorage.getItem("Theme"));
      const lightMode = document.getElementById("Light")
      const darkMode = document.getElementById("Dark")
      if (theme === 'dark') {
        darkMode.checked = true;
        lightMode.checked = false;
      }
      else {
        darkMode.checked = false;
        lightMode.checked = true;
      }
    }

    checkTheme()
  })


  function logout() {
    signOut(auth).then(() => {
      navigate("/login")
    })
  }
  return (
    <div className='settings'>
      <div className="settingsContainer">
        <div className="theme">
          Theme
          <div className="themes">
            <p><WbSunnyIcon /> Light mode <input type="radio" name="theme" id="Light" ref={inputLight} onClick={() => changeTheme('light')} defaultChecked /></p>
            <p><DarkModeIcon /> Dark mode <input type="radio" name="theme" id="Dark" ref={inputDark} onClick={() => changeTheme('dark')} /></p>
          </div>
          <div className="logout">
            Logout
            <button onClick={logout}><LogoutIcon style={{ fontSize: "18px" }} /> Logout</button>
            <p>Logout from this device 😢</p>
          </div>
          <div class="links">
            <p style={{margin: "10px 0"}}>Created By <span style={{color:"#6539d2",margin:"0 0 0 5px"}}> Ritik Kashyap</span></p>
            <p>View more projects <a href="https://github.com/ritikkashyap720"><GitHubIcon/></a></p>
            <p>Have a conversation with me
              <a href="https://www.instagram.com/ritikkashyap340/"><InstagramIcon /></a>
              <a href="https://www.linkedin.com/in/ritik-kashyap-141534246/"><LinkedInIcon/></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
