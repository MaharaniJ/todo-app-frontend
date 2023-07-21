import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast'


function EditProfile() {
  const [user,setUser] = useState({
    name:'',
    email:''
  })

  useEffect(() =>{
    // eslint-disable-next-line no-unused-expressions
    (
      async ()=>{
try {
  const {data} = await axios.get(`api/users/userinfo`)
  setUser(data);
} catch (error) {
  console.error(error)
}
      }
    )
  })

  const updateUserInfo = (e)=>{
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const updateProfile = async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.put(`/api/users/user`,user)  
      toast.success('Profile updated successfully')
      setUser(res.data)
    }
    catch(err){
       console.error(err)
    }
  }
  return (
    <div>
      <Link className='=backBtn' to='/'>
        <BsArrowLeftShort />Home</Link>
        <div>
          <h1>Edit Profile</h1>
          <form className='editForm'>
            <label htmlFor='name'>Full Name:
            <input
            name='name'
            type='text'
            placeholder='Full Name'
            required
            value={user.name}
            onChange={updateUserInfo}
            ></input>
            </label>
            <button type='submit'>Save</button>
          </form>
        </div>
        </div>
  )
}

export default EditProfile