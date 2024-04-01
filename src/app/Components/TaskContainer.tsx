import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Task, Id } from "./types/types"
import TrashIcon from "../Icons/trashIcon"

interface Props {
    task: Task
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void
}

function TaskContainer({ task, deleteTask, updateTask }: Props) {

    const [mouseOver, setMouseOver] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const { setNodeRef, attributes, listeners, transform, transtition, isDragging }: any = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task
        },
        disabled: editMode
    })

    const style = {
        transtition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return <div
            ref={setNodeRef}
            style={style}
            className="bg-slate-200 w-full rounded-xl  p-4 my-2 cursor-grab text-left items-center border-rose-500 border relative opacity-30" >{task.content}</div>
    }

    function onMouseOver() {
        setMouseOver(true)
    }
    function onMouseLeave() {
        setMouseOver(false)
    }

    const toggleEditMode = () => {
        setEditMode((prev) => !prev)
        setMouseOver(false)
    }
    if (editMode) {
        return <div onClick={toggleEditMode}
            className=" bg-white w-full rounded-xl px-2 my-2 cursor-grab text-left items-center flex justify-between drop-shadow-lg "
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}

        >
            <textarea className="bg-transparent max-h-max p-2 resize-none border-none rounded-xl focus:outline-none "
                value={task.content}
                autoFocus onBlur={toggleEditMode} placeholder="Task content here
           "onKeyDown={(e) => {
                    if (e.key === 'Enter') toggleEditMode();
                }}
                onChange={(e) => updateTask(task.id, e.target.value)}></textarea>
        </div>
    }

    return (
        <div onClick={toggleEditMode}
            ref={setNodeRef} style={style}
            {...attributes} {...listeners}
            className=" bg-white w-full rounded-xl  px-4 py-2 my-2 cursor-grab text-left  flex justify-between drop-shadow-lg"
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            {task.content}
            <button onClick={() => {
                deleteTask(task.id)
            }} className="opacity-60 hover:opacity-100">
                {mouseOver &&
                    <TrashIcon />
                }
            </button >
        </div>
    )
}

export default TaskContainer