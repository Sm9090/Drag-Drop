'use client'
import { useState } from 'react';
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PlusIcon from '../Icons/plusIcon';

interface InputProps {
    onAddItem: (text: string, selectedOption: string) => void;
}

function Input({ onAddItem }: InputProps) {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [selectedOption, setSelectedOption] = useState<string>("")

    const handleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setText(value)
    }

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option)
        setToggleMenu(false)
    }

    const addItemToCard = () => {
        if (text.trim() !== "" && selectedOption !== "") {
            onAddItem(text, selectedOption)
            setText("")
            setSelectedOption("")
        }
    }
    return (
        <div>
            <div className='w-max' >
                <div className=' flex'>
                    <div className='border-2 rounded-lg p-2 '>
                        <input type="text" onChange={handleInputValue} className='border-0 bg-transparent outline-none' value={text} />
                        <button onClick={handleMenu} className='w-8 border-l-2'>
                            <ArrowDropDownIcon />
                        </button>
                    </div>
                    <button onClick={addItemToCard} className="bg-slate-100 hover:bg-slate-200  hover:transition py-2 px-4 hover:border-transparent rounded-xl ml-2 text-sm">
                        Add Task
                    </button>
                </div>
                {toggleMenu &&
                    <div className='relative w-full m-0.5 '>
                        <ul className='absolute right-0 bg-white p-2 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <li onClick={() => { handleOptionSelect("Do") }} className='border-b-2 mb-1 p-2 text-sm hover:bg-gray-100 rounded-md'>Do</li>
                            <li onClick={() => { handleOptionSelect("Doing") }} className='border-b-2 mb-1 p-2 text-sm hover:bg-gray-100 rounded-md'>Doing</li>
                            <li onClick={() => { handleOptionSelect("Complete") }} className='border-b-2 mb-1 p-2 text-sm hover:bg-gray-100 rounded-md'>Complete</li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Input