'use client'
import React, { useMemo, useState, useEffect } from 'react'
import { DndContext, DragOverlay, useSensors, useSensor, PointerSensor, DragOverEvent, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';


import PlusIcon from '../Icons/plusIcon'
import { Column, Id, Task } from './types/types'
import ColumnContainer from './ColumnContainer'
import TaskContainer from './TaskContainer';
import Input from './Input';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { auth, getUser, db } from '../Config/firebase';
import TrelloPng from '../Icons/Trello_logo.svg.png'
import Image from 'next/image';
import { ArrowDropDown } from '@mui/icons-material';
import {AccountMenu , MenuListComposition} from './AccountMenu';





function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([
        { id: 1, title: "Do" },
        { id: 2, title: "Doing" },
        { id: 3, title: "Complete" },
    ])
    const [task, setTasks] = useState<Task[]>([])
    const [activeColumn, setActiveColumn] = useState<Column | null>()
    const [activeTask, setActiveTask] = useState<Task | null>()
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [userId, setUserId] = useState<string | null>()

    const router = useRouter()

    useEffect(() => {
        const loggedUser = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                setUserId(uid)
                const userData = await getUser(uid)
                setCurrentUser(userData)
                if(userData){
                setColumns(userData.columns || [])
                setTasks(userData.tasks || [])
                }
            } else {
                // User is signed out
                router.push('./Views/Login')
                setCurrentUser(null);
                setUserId(null)
            }
        });
        return () => loggedUser();
    }, []);


    useEffect(() => {
        const saveData = async () => {
            if (userId) {
                const uid = userId
                const userDocRef = doc(db, "users", uid);
                // console.log('userDocRef',userDocRef)
                const docUpdate = await updateDoc(userDocRef, {
                    columns: columns,
                    tasks: task
                });
                console.log(docUpdate)
            }
            else {
                console.log('user Not Found')
            }
        };
        saveData();
    }, [columns, task, currentUser]);

    console.log(currentUser)

    const columnId = useMemo(() => columns.map((col) => col.id), [columns])
    console.log('columnId ==>', columnId)
    const sensor = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }

        })
    )

    function onAddItem(text: string, selectedOption: string) {
        const selectedColumn = columns.find(column => column.title === selectedOption);
        if (selectedColumn) {
            const newTask: Task = {
                id: Math.ceil(Math.random() * 10000),
                columnId: selectedColumn.id,
                content: text
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
        }

    }

    function deleteTask(id: Id) {
        const newTask = task.filter((task) => task.id !== id)
        setTasks(newTask)
    }

    function updateTask(id: Id, content: string) {
        const newTask = task.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content }
        })
        setTasks(newTask)
    }

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: Math.ceil(Math.random() * 10000), columnId,
            content: `Task ${task.length + 1}`
        }
        console.log(columnId)
        setTasks([...task, newTask])
    }

    function createNewColumn() {

        const addColumns: Column = {
            title: `Column ${columns.length + 1}`,
            id: Math.ceil(Math.random() * 10000)
        }

        setColumns([...columns, addColumns])

    }

    function updateColumn(id: Id, title: string) {
        const newColumn = columns.map((col) => {
            if (col.id !== id) {
                return col
            }
            return { ...col, title }
        })
        setColumns(newColumn);
    }

    function deleteColumn(id: Id) {
        const filteredColumn = columns.filter(col => col.id !== id)
        setColumns(filteredColumn)

        const newTask = task.filter((t) => t.columnId !== id)
        setTasks(newTask)
    }

    function onDragStart(event: DragStartEvent) {
        console.log("DragStart", event)
        if (event.active.data.current?.type === 'Column') {
            setActiveColumn(event.active.data.current.column)
            return;
        }

        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null)
        setActiveTask(null)

        const { over, active } = event
        if (!over) return;

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        console.log("DRAG END");

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeId
            );

            const overColumnIndex = columns.findIndex(
                (col) => col.id === overId
            );
            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        })

    }

    function onDragOver(event: DragOverEvent) {
        const { over, active } = event
        if (!over) return;

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task"
        const isOverTask = over.data.current?.type === "Task"

        if (!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }


        const isOverAColumn = over.data.current?.type === "Column"

        if (isActiveTask === isOverAColumn) {
            setTasks((task) => {
                const activeIndex = task.findIndex(t => t.id === activeId)

                task[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(task, activeIndex, activeIndex);

            })

        }

    }

    if(!currentUser){
        return <div>loading</div>
    }

    return (
        <div className='m-auto flex  flex-col items-center flex-wrap justify-start p-4 w-full min-h-screen px=[40px] overflow-x-auto overflow-y-hidden bg-gradient-to-r from-pink-500 to-blue-500 '>
            <div className=' w-[80%] rounded-md backdrop-blur-sm bg-white/20 p-2 max-sm:w-[100%] relative'>
                <div className='hidden max-sm:block absolute right-0 top-3 mr-2'>
                    <AccountMenu title={currentUser.name}  email={currentUser.email}/>
                </div>
                <div className='flex max-custom:flex-wrap max-custom:justify-center justify-between w-full  items-center border-b border-gray-100 max-sm:text-sm '>
                    <div className='max-custom:basis-full max-custom:flex max-custom:justify-center' >
                        <Image src={TrelloPng} alt="" className='w-[150px]  ml-2  '/>
                    </div>
                    <div className='m-4 max-custom:basis-6/12 '>
                        <Input onAddItem={onAddItem}  />
                    </div>
                    <div className=' font-bold bg-white/10 hover:bg-white/30  hover:transition py-2 px-4  rounded-xl ml-2 text-sm text-white max-sm:hidden '>
                    <MenuListComposition title={currentUser.name}  email={currentUser.email}/>
                    </div>
                </div>
                <DndContext sensors={sensor} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                    <div className='mt-4 mx-4'>
                        <div className='flex items-center overflow-x-auto  h-[510px] max-sm:flex-wrap max-sm:justify-center'>
                            <SortableContext items={columnId}>
                                {columns.map((col, ind) => {
                                    return <div key={ind} className='mx-2'>
                                        <ColumnContainer
                                            column={col} deleteColumn={deleteColumn} key={col.id} updateColumn={updateColumn}
                                            createTask={createTask}
                                            deleteTask={deleteTask}
                                            updateTask={updateTask}
                                            task={task.filter((task) => task.columnId === col.id)} />
                                    </div>
                                })}
                            </SortableContext>
                    <button
                        onClick={createNewColumn}
                        className='flex gap-2 justify-center items-center rounded-lg min-w-[250px] h-[40px] bg-white/10
                         hover:bg-white/20 mt-4 text-sm text-white'
                    >
                        <PlusIcon />
                        Add another list
                    </button>
                        </div>
                    </div>

                    {createPortal(
                        <DragOverlay>
                            {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                task={task.filter((task) => task.columnId === activeColumn.id)}
                            />
                            }
                            {activeTask && <TaskContainer task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
                {/* <div>
                    <button>
                        <Link href='./Views/Login'>Login</Link>
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default KanbanBoard