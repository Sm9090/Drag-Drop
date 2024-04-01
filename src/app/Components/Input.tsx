'use client'
import { useEffect, useState } from 'react';
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface InputProps {
    onAddItem: (text: string, selectedOption: string) => void;
    columnTitle: any
}

function Input({ onAddItem  , columnTitle}: InputProps) {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [selectedOption, setSelectedOption] = useState<string>("")
    const [columnsTitle ,setColumnsTitle] = useState([])

    useEffect(()=>{
        setColumnsTitle(columnTitle)
    },[columnTitle])

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
            onAddItem(text, selectedOption )
            setText("")
            setSelectedOption("")
        }
    }
    return (
        <div>
            <div className='w-max max-[425px]:w-auto' >
                <div className=' flex max-[425px]:flex-wrap max-[425px]:justify-center max-[425px]:w-full'>
                    <div className='border-none rounded-lg p-2  backdrop-blur-sm bg-white/10 hover:bg-white/30'>
                        <input type="text" onChange={handleInputValue} className='border-0 bg-transparent outline-none ' value={text} placeholder='Task Title' />
                        <button onClick={handleMenu} className='w-8 border-l border-l-gray-400'>
                            <ArrowDropDownIcon />
                        </button>
                    </div>
                    <button onClick={addItemToCard} className="bg-white/10 hover:bg-white/30  hover:transition py-2 px-4  rounded-xl ml-2 text-sm max-[425px]:mt-2 text-white">
                        Add Task
                    </button>
                </div>
                {toggleMenu &&
                    <div className='relative w-full m-0.5 '>
                       {columnTitle.length >= 1 &&  <ul className='absolute right-0  p-2 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                           { columnsTitle.map((col:any) => {
                                return <li onClick={() => { handleOptionSelect(col.title) }} className='border-b-2 mb-1 p-2 text-sm hover:bg-gray-100 rounded-md'>{col.title}</li>
                            })}
                        </ul>}
                    </div>
                }
            </div>
        </div>
    )
}

export default Input