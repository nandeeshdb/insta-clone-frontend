"use client"
import React, { EventHandler, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'

function Signin() {
    const [input,setInput] = useState({
        email:"",
        password:""
    })
    const [loading,setLoading] = useState<boolean>(false)

    const onChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value, 
        }));
    };

    

    const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input)
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:8888/api/v1/user/login',input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message)
                setInput({
                    email:"",
                    password:""
                })
                setLoading(false)
                
            }
        } catch (error) {
            console.log(error)
            //@ts-ignore
            toast.error(error.response.data.message)
            setLoading(false)
        }
    };
    
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <form onSubmit={signUpHandler} className='shadow-lg flex flex-col gap-2 p-5 rounded-lg lg:p-8'>
            <div className='my-4'>
                <h1 className='text-center font-bold text-xl'>logo</h1>
                <p className='text-sm text-center'>Login to see photos and videos from your frnds</p>
            </div>
        
        <div>
            <Input
            type="text"
            name="email"
            placeholder='Username or email'
            className='focus-visible:rings-transparent my-2'
            value={input.email}
            onChange={onChangeEventHandler}

            />
        </div>
        <div>
            <Input
            type="password"
            name="password"
            placeholder='Password'
            className='focus-visible:rings-transparent my-2'
            value={input.password}
            onChange={onChangeEventHandler}
            />
        </div>

        <Button disabled={loading}>Login</Button>
        </form>

      
    </div>
  )
}

export default Signin
