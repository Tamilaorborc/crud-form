'use client'
import React, { useEffect, useState } from 'react'
import { db } from './firebase-config'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'


export default function FirebaseFirestore(){
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [id,setId] =useState('')
    

    const [show,setShow] =useState(false)
    


    const [val,setVal] =useState([])
    


    
    const value = collection(db,"MemberData")


    useEffect(()=>{
        const getData= async()=>{
          const dbVal = await getDocs(value)
          setVal(dbVal.docs.map(doc=>({...doc.data(),id:doc.id})))
        }
        getData()
    })

    const handleCreate =async()=>{
        await addDoc(value,{Name:name,Email:email,Password:password})
        setName("")
        setEmail("")
        setPassword("")
        alert("Data added to db")
    }


    const handleDelete =async(id)=>{
       const deleteVal =  doc(db,"MemberData",id)
       await deleteDoc(deleteVal)
    }

    const handleEdit =async(id,Name,Email,Password)=>{
        setName(Name)
        setEmail(Email)
        setPassword(Password)
        setId(id)
        setShow(true)
    }

    const handleUpdate =async()=>{
        const updateData = doc(db,"MemberData",id)
        await updateDoc(updateData,{Name:name,Email:email,Password:password})
        setShow(false)
        setName("")
        setEmail("")
        setPassword("")
    }

    return(

        <div className='container   text-center'>
                
        <label >
          Name :
          </label>
          <input type="text" id="name" value={name}
           onChange={(e) => setName(e.target.value)} />
      <br></br>
      
      
        <label >
          Email :
          </label>
          <input type="email" id="email"   value={email} 
          onChange={(e) => setEmail(e.target.value)} />
       <br></br>

      
        <label >  
          Password :
          </label>
          <input type="text" id="password" value={password}
           onChange={(e) => setPassword(e.target.value)}  />
      <br></br>
           {!show?<button onClick={handleCreate}className='bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>Create</button>:
           <button onClick={handleUpdate} className='bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>Update </button>}
           
         
           <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
                 <th>Delete</th>
                
                </tr>
                
           {
            val.map(MemberData=>
              
              <tr key={MemberData.id}>
                <td>{MemberData.Name}</td>
                <td>{MemberData.Email}</td>
                
                <td> <button onClick={()=>handleEdit(MemberData.id,MemberData.Name,MemberData.Email,MemberData.Password)} className='bg-yellow-400 hover-bg-blue-600 text-white font-bold py-1 px-2 rounded-lg'>Edit</button></td>
                <td><button onClick={()=>handleDelete(MemberData.id)} className='bg-red-400 hover-bg-blue-600 text-white py-1 px-2 rounded-lg' >Delete</button></td>
                </tr>
                
              
           
            )
           }
           </tbody>
           </table>
           </div>
       
    )
}
