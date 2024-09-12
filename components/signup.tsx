"use client"
import React, { EventHandler, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'

function Signup() {
    const [input,setInput] = useState({
        username:"",
        email:"",
        password:""
    })

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
        try {
            const res = await axios.post('http://localhost:8888/api/v1/user/register',input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            //@ts-ignore
            toast.error(error.response.data.message)
        }
    };
    
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <form onSubmit={signUpHandler} className='shadow-lg flex flex-col gap-2 p-8'>
            <div className='my-4'>
                <h1 className='text-center font-bold text-xl'>logo</h1>
                <p className='text-sm text-center'>Signup to see photos and videos from your frnds</p>
            </div>
        <div>
            <label className=' font-medium'>Username</label>
            <Input
            type="text"
            name="username"
            className='focus-visible:rings-transparent my-2'
            value={input.username}
            onChange={onChangeEventHandler}

            />
        </div>
        <div>
            <label className=' font-medium'>Email</label>
            <Input
            type="email"
            name="email"
            className='focus-visible:rings-transparent my-2'
            value={input.email}
            onChange={onChangeEventHandler}

            />
        </div>
        <div>
            <label className=' font-medium'>Password</label>
            <Input
            type="password"
            name="password"
            className='focus-visible:rings-transparent my-2'
            value={input.password}
            onChange={onChangeEventHandler}
            />
        </div>

        <Button>Sign up</Button>
        </form>

      
    </div>
  )
}

export default Signup
