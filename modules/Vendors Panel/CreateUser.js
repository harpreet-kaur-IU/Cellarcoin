import React, { useRef, useState } from 'react'

const CreateUser = () => {
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPass,setConfirmPass] = useState('')
  const[url,setUrl] = useState('')
  const fileRef = useRef(null)

  const nameHandler = (e) =>{
    setName(e.target.value)
  }
  const emailHandler = (e) =>{
    setEmail(e.target.value)
  }
  const passwordHandler = (e) =>{
    setPassword(e.target.value)
  }
  const confirmPasswordHandler = (e) =>{
    setConfirmPass(e.target.value)
  }

  const urlHandler = (e)=>{
    var formdata = new FormData();
    formdata.append("image",e.target.files[0]);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}uploadImage`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className='col-4'>
      <h1>CreateUser</h1>
      <input type="text" className='col-12 mt-8' value={name} onChange={nameHandler}></input>
      <input type="email" className='col-12 mt-8' value={email} onChange={emailHandler}></input>
      <input type="password" className='col-12 mt-8' value={password} onChange={passwordHandler}></input>
      <input type="password" className='col-12 mt-8' value={confirmPass} onChange={confirmPasswordHandler}></input>
      <input 
        type="file" 
        className='col-12 mt-8' 
        ref={fileRef}
        onChange={urlHandler}
        multiple={false}
      >
      </input>
    </div>
  )
}

export default CreateUser