'use client'
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import React, { useMemo, useState } from 'react'



import { Column, Id, Task } from './types/types'
import PlusIcon from '../Icons/plusIcon'
import TrashIcon from '../Icons/trashIcon'
import TaskContainer from './TaskContainer'


interface Props {
    column: Column
    deleteColumn: (id: Id) => void
    updateColumn: (id: Id, title: string) => void;
    deleteTask: (id: Id) => void
    createTask: (columnId: Id) => void;
    updateTask: (id: Id, content: string) => void
    task: Task[]
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, task, deleteTask, updateTask } = props
    const [editMode, setEditMode] = useState(false)
    const [columnTitleText, setColumnTitleText] = useState<string>(column.title)
    const taskIds = useMemo(() => {
        return task.map(task => task.id)
    }, [task])

    const { setNodeRef, attributes, listeners, transform, transition, isDragging }= useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editMode,

    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className=' justify-between text-center
               bg-slate-300 opacity-60 h-[300px]   w-[250px]
              border border-rose-500 rounded-lg'
            >
                {column.title}
            </div>
        )
    }

    function handleEditing() {
        setEditMode(true)
    }


    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value.trim();
        setColumnTitleText(newTitle);

        if (newTitle === "") {
            updateColumn(column.id, column.title);
        } else {
            updateColumn(column.id, newTitle);
        }

    }

    function handleBlurOrKeyDown(e: React.ChangeEvent<HTMLInputElement> |  React.KeyboardEvent<HTMLInputElement>) {
        if (e.type === 'blur' || (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')) {
            const newTitle = e.currentTarget.value.trim();

            if (newTitle === "") {
                setColumnTitleText(column.title);
                updateColumn(column.id, column.title);
            } else {
                setColumnTitleText(newTitle);
                updateColumn(column.id, newTitle);
            }

            setEditMode(false);
        }
    }



    return (
     
            <div className='flex flex-col justify-between text-center h-[300px] w-[250px]  opacity-100 rounded-lg  bg-gray-200 my-4 px-2 text-sm' ref={setNodeRef} style={style}>
                <div className='flex justify-between p-2 m-2 cursor-grab border-b border-gray-100' {...attributes} {...listeners}>
                    <div className='flex gap-2'>
                        <div onClick={handleEditing}>
                            {editMode ? <input className='bg-white px-2 py-1 rounded-lg  outline-blue-400' type="text"
                                value={columnTitleText}
                                onChange={handleTitleChange}
                                autoFocus onBlur={handleBlurOrKeyDown} onKeyDown={handleBlurOrKeyDown} />
                                :
                                column.title}
                        </div>
                    </div>
                    {column.id === 1 || column.id === 2 || column.id === 3 ?
                        ''
                        :
                        <button onClick={() => {
                            deleteColumn(column.id)
                        }}>
                            <TrashIcon />
                        </button>
                    }
                </div>
                {/* //column task container */}
                <div className='overflow-y-auto h-full '>
                    <SortableContext items={taskIds}>
                        {task.map((task , index) => {
                            return <div className=''  key={index}>
                                <TaskContainer key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                            </div>
                        })}
                    </SortableContext>
                </div>
                {/* column footer  */}
                <div className='m-2 w-[100%]'>
                    <button
                        onClick={() => {
                            createTask(column.id)
                        }}
                        className='flex gap-2 items-center  justify-center'>
                        <PlusIcon />
                        Add Task
                    </button>
                </div>
            </div>
    )
}

export default ColumnContainer