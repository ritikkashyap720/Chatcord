import React, { useContext, useEffect, useState } from 'react'
import { set, ref as ref_database, onValue } from "firebase/database";
import { db, storage } from "../firebase";
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import EditIcon from '@mui/icons-material/Edit';
import { uploadBytesResumable, ref as ref_storage, getDownloadURL } from "firebase/storage"
import { AuthContext } from '../context/AuthContext';


export const Profile = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fill, setFill] = useState(false);
  const { currentUser } = useContext(AuthContext)
  const storageRef = ref_storage(storage, `${currentUser.uid}`);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = document.getElementById("userName").value
    const Image = document.getElementById("Image").files[0]
    const status = document.getElementById("status").value
    setErr(false)
    setLoading(false)
    setFill(false)

    if (user !== "") {
      if (status !== "") {
        if (Image !== undefined) {
          if (!fill) {
            try {
              setLoading(true);
              await uploadBytesResumable(storageRef, Image).then(() => {
                getDownloadURL(storageRef).then(async (url) => {
                  console.log(url)
                  await set(ref_database(db, 'users/' + currentUser.uid), {
                    name: user,
                    userStatus: status,
                    profile_picture: url,
                    status: "Active"
                  });
                  setLoading(false)
                  setErr(false)
                  setFill(false)
                })
              })

            } catch (error) {
              setErr(true);
              setLoading(false);
            }
          }

        }
        else {
          setFill(true)
        }
      }
      else {
        setFill(true)
      }

    }
    else {
      setFill(true);
    }
  }
  useEffect(() => {

    onValue(ref_database(db, 'users/' + currentUser.uid), (snapshot) => {
      const data = snapshot.val();
      if (data) {

        const user = document.getElementById("userName")
        const userImage = document.getElementById("userImage")
        const status = document.getElementById("status")
        user.value = data.name;
        status.value = data.userStatus
        userImage.src = data.profile_picture
      }
    });
  })


  return (
    <div className='profile'>
      <div className="profileContainer">
        <div className="profileImage">
          <img id="userImage" src="" alt="" />
          <input style={{ display: "none" }} id="Image" type="file" accept="image/png, image/gif, image/jpeg" />
          <label htmlFor="Image"><EditIcon /></label>
        </div>
        <div className='input'><PersonIcon style={{ fontSize: "30px" }} /><input type="text" id="userName" /></div>
        <div className='input'><AutoAwesomeMosaicIcon style={{ fontSize: "30px" }} /><input type="text" id="status" /></div>
        <div className="error">
          {loading && <span>Uploading and compressing the image please wait...</span>}
          {err && <span>Something went wrong</span>}
          {fill && <span>Please fill all details</span>}
        </div>
        <button onClick={handleSubmit}>Update Profile</button>
      </div>
    </div>
  )
}
