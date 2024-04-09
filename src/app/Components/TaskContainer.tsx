import { useState, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Task, Id } from "./types/types"
import TrashIcon from "../Icons/trashIcon"

interface Props {
    task: Task
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void
}

interface SortableProperties {
    setNodeRef: (node: HTMLElement | null) => void;
    attributes: {
        style: React.CSSProperties;
    };
    listeners: {
        onMouseDown: (event: React.MouseEvent) => void;
        onTouchStart: (event: React.TouchEvent) => void;
    };
    transform: string;
    transition: string;
    isDragging: boolean;
}

function TaskContainer({ task, deleteTask, updateTask }: Props) {

    const [mouseOver, setMouseOver] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [taskTitle, setTaskTitle] = useState<string>(task.content)


    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        // Function to check if the viewport width is less than a certain threshold
        const handleResize = () => {
            const mobileThreshold = 425; // Adjust this threshold as needed
            setIsMobileView(window.innerWidth < mobileThreshold);
        };

        // Initial check on component mount
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task
        },
        disabled: editMode
    })

    console.log(task)

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),

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
        setEditMode(true)
        setMouseOver(false)
    }
    function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newTitle = e.target.value
        setTaskTitle(newTitle)

        if (newTitle === "") {
            updateTask(task.id, task.content)
        } else {
            updateTask(task.id, newTitle)
        }
        toggleEditMode()

    }

    function handleBlurOrKeyDown(e: React.FocusEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.type === 'blur' || (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')) {
            const newTitle = e.currentTarget.value;

            if (newTitle === "") {
                setTaskTitle(task.content)
                updateTask(task.id, task.content)
            } else {
                setTaskTitle(task.content)
                updateTask(task.id, newTitle)
            }

            toggleEditMode()
            setEditMode(false)
        }
    }



    // task.id, e.target.value
    if (editMode) {
        return <div onClick={toggleEditMode}
            className={`bg-white w-full rounded-xl px-2 my-2 cursor-grab text-left items-center flex justify-between drop-shadow-lg`}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}

        >
            <textarea className="bg-transparent max-h-max p-2 resize-none border-none rounded-xl focus:outline-none "
                value={taskTitle}
                autoFocus onBlur={handleBlurOrKeyDown} placeholder="Task content here
           "onKeyDown={handleBlurOrKeyDown}
                onChange={handleTitleChange}></textarea>
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
            }} className="opacity-60 hover:opacity-100" >
                <div className={mouseOver || isMobileView ? 'block' : 'hidden'}>
                    <TrashIcon />
                </div>
            </button >
        </div>
    )
}

export default TaskContainer