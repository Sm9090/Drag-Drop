import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import PlusIcon from '../Icons/plusIcon'
import React, { useMemo, useState } from 'react'


import { Column, Id, Task } from './types/types'
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
    const taskIds = useMemo(() => {
        return task.map(task => task.id)
    }, [task])


    const { setNodeRef, attributes, listeners, transform, transition, isDragging }: any = useSortable({
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
              border-2 border-rose-500'
            >
                {column.title}
            </div>
        )
    }

    function handleEditing() {
        setEditMode(true)
    }


    return (
        <div className='flex flex-col justify-between text-center h-[300px] w-[250px]  opacity-100 rounded-lg  bg-gray-200 my-4 px-2 text-sm' ref={setNodeRef} style={style}>
            {/* column title */}
            <div className='flex justify-between p-2 m-2 cursor-grab border-b border-gray-100' {...attributes} {...listeners}>
                <div className='flex gap-2'>
                    <div onClick={handleEditing}>
                        {editMode ? <input className='bg-transparent' type="text"
                            value={column.title}
                            onChange={(e) => updateColumn(column.id, e.target.value)}
                            autoFocus onBlur={() => {
                                setEditMode(false)
                            }} onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false)
                            }} />
                            :
                            column.title}
                    </div>
                </div>
                <button onClick={() => {
                    deleteColumn(column.id)
                }}>
                    <TrashIcon />
                </button>
            </div>
            {/* //column task container */}
            <div className='overflow-y-auto'>
                <SortableContext items={taskIds}>
                    {task.map((task) => {
                        return <div className='' >
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