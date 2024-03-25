'use client'
import React, { useMemo, useState } from 'react'
import { DndContext, DragOverlay, useSensors, useSensor, PointerSensor, DragOverEvent, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import PlusIcon from '../Icons/plusIcon'
import { Column, Id, Task } from './types/types'
import ColumnContainer from './ColumnContainer'
import { createPortal } from 'react-dom';
import TaskContainer from './TaskContainer';


function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([])
    const [task, setTasks] = useState<Task[]>([])
    const [activeColumn, setActiveColumn] = useState<Column | null>()
    const [activeTask ,setActiveTask] = useState<Task | null>()

    const columnId = useMemo(() => columns.map((col) => col.id), [columns])
    console.log('columnId ==>', columnId)
    const sensor = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }

        })
    )

    function deleteTask(id: Id) {
        const newTask = task.filter((task) => task.id !== id)
     setTasks(newTask)
    }

    function updateTask(id:Id , content:string){
        const newTask = task.map((task) =>{
            if(task.id !== id) return task;
            return {...task , content}
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

        const newTask = task.filter((t)   => t.columnId !== id)
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

    function onDragOver(event :DragOverEvent){
        const { over, active } = event
        if (!over) return;

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task"
        const isOverTask = over.data.current?.type === "Task"

        if(!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
              const activeIndex = tasks.findIndex((t) => t.id === activeId);
              const overIndex = tasks.findIndex((t) => t.id === overId);
      
              if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                // Fix introduced after video recording
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                return arrayMove(tasks, activeIndex, overIndex - 1);
              }
      
              return arrayMove(tasks, activeIndex, overIndex);
            });
          }
      

        const isOverAColumn = over.data.current?.type === "Column"

        if(isActiveTask === isOverAColumn){
         setTasks( (task) => {
                const activeIndex = task.findIndex(t=> t.id === activeId)

                task[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(task, activeIndex, activeIndex);

            })

        }

    }

    return (
        <div className='m-auto flex justify-center items-center w-full min-h-screen px=[40px] overflow-x-auto overflow-y-hidden'>
            <DndContext sensors={sensor} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                <div>
                    <div className='flex gap-4'>
                        <SortableContext items={columnId}>
                            {columns.map((col, ind) => {
                                return <div key={ind}>
                                    <ColumnContainer
                                        column={col} deleteColumn={deleteColumn} key={col.id} updateColumn={updateColumn}
                                        createTask={createTask}
                                        deleteTask={deleteTask}
                                        updateTask={updateTask}
                                        task={task.filter((task) => task.columnId === col.id)} />
                                </div>
                            })}
                        </SortableContext>
                    </div>
                </div>
                <button
                    onClick={createNewColumn}
                    className='flex gap-2 justify-center items-center  rounded-lg w-[350px] h-[60px] border-2 hover:ring-2 min-w-[350px]'
                >
                    <PlusIcon />
                    Add Column
                </button>
                {createPortal(
                    <DragOverlay>
                        {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} updateColumn={updateColumn}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            task={task.filter((task) => task.columnId === activeColumn.id)}
                            />
                        }
                        {activeTask && <TaskContainer  task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />} 
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    )
}

export default KanbanBoard