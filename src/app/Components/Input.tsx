'use client'
import { useEffect, useState } from 'react';
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


interface item{
    title: string   ,
    id: string | number ,
}

interface InputProps {
    onAddItem: (text: string, selectedOption: string) => void;
    columnTitle: item[];
}

function Input({ onAddItem  , columnTitle}: InputProps) {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [selectedOption, setSelectedOption] = useState<string>("")
    const [columnsTitle ,setColumnsTitle] = useState<item[]>([])

    console.log(columnTitle)

    
    useEffect(()=>{
        setColumnsTitle(columnTitle)
    },[columnTitle])

    useEffect(() => {
        // Attach event listener for outside click when dropdown is open
        if (toggleMenu) {
          document.addEventListener("mousedown", handleOutsideClick);
        } else {
          document.removeEventListener("mousedown", handleOutsideClick);
        }
        // Cleanup event listener on component unmount
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [toggleMenu]);

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

    const handleOutsideClick = (event : MouseEvent) =>{

        if (!(event.target instanceof Element)) return; 

        if (event.target.closest(".dropdown-wrapper") === null) {
            setToggleMenu(false);
          }
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
            <div className='w-max max-[425px]:w-auto dropdown-wrapper' >
                <div className=' flex max-[425px]:flex-wrap max-[425px]:justify-center max-[425px]:w-full'>
                    <div className='border-none rounded-lg p-2 backdrop-blur-sm bg-white/10 hover:bg-white/30'>
                        <input type="text" onChange={handleInputValue} className='border-0 bg-transparent outline-none max-xs:w-[100px] ' value={text} placeholder='Task Title' />
                        { selectedOption ? <button onClick={handleMenu} className='font-light text-sm px-1 border-l border-l-gray-400 max-xs:text-xs' >
                            {selectedOption}
                            <ArrowDropDownIcon />
                        </button> :
                        <button onClick={handleMenu} className='w-8 border-l border-l-gray-400 outline-none' autoFocus>
                            <ArrowDropDownIcon />
                        </button>
}
                    </div>
                    <button onClick={addItemToCard} className="bg-white/10 hover:bg-white/30  hover:transition py-2 px-4  rounded-xl ml-2 text-sm max-[425px]:mt-2 text-white">
                        Add Task
                    </button>
                </div>
                {toggleMenu &&
                    <div className='relative w-full '>
                       {columnTitle.length >= 1 &&  <ul className='absolute right-0  p-2 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                           { columnsTitle.map((col , index) => {
                                return <li key={index} onClick={() => { handleOptionSelect(col.title) }} className='border-b-2 mb-1 p-2 text-sm hover:bg-gray-100 rounded-md'>{col.title}</li>
                            })}
                        </ul>}
                    </div>
                }
            </div>
        </div>
    )
}

export default Input