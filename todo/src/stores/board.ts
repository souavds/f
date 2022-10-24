/* eslint-disable @typescript-eslint/no-unused-vars */
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'

export type TaskType = {
  id: string
  content: string
}

export type Tasks = Record<string, TaskType>

export type ColumnType = {
  id: string
  title: string
  tasks: Tasks
}

export type Columns = Record<string, ColumnType>

export interface BoardState {
  columns: Columns
  getColumnById: (id: string) => ColumnType
  countTasksByColumn: (id: string) => number
  addTask: (columnId: string, content: string) => void
  updateTask: (columnId: string, taskId: string, content: string) => void
  removeTask: (columnId: string, taskId: string) => void
  moveTask: (columnId: string, toColumnId: string, taskId: string) => void
}

export const useBoardStore = create<BoardState>()(
  devtools(
    persist(
      (set, get) => ({
        columns: {
          backlog: { id: 'backlog', title: 'Backlog', tasks: {} },
          todo: { id: 'todo', title: 'Todo', tasks: {} },
          'on-going': { id: 'on-going', title: 'On going', tasks: {} },
          'team-review': { id: 'team-review', title: 'Team review', tasks: {} }
        },
        getColumnById: (id: string) => get().columns[id],
        countTasksByColumn: (id: string) => Object.keys(get().getColumnById(id).tasks).length,
        addTask: (columnId: string, content: string) => {
          const taskId = uuid()
          const column = get().getColumnById(columnId)
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks: { ...column.tasks, [taskId]: { id: taskId, content } } }
            }
          })
        },
        updateTask: (columnId: string, taskId: string, content: string) => {
          const column = get().getColumnById(columnId)
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks: { ...column.tasks, [taskId]: { id: taskId, content } } }
            }
          })
        },
        removeTask: (columnId: string, taskId: string) => {
          const column = get().getColumnById(columnId)
          const { [taskId]: _, ...tasks } = column.tasks
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks }
            }
          })
        },
        moveTask: (columnId: string, toColumnId: string, taskId: string) => {
          const column = get().getColumnById(columnId)
          const toColumn = get().getColumnById(toColumnId)
          const { [taskId]: task, ...tasks } = column.tasks
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks },
              [toColumn.id]: { ...toColumn, tasks: { ...toColumn.tasks, [taskId]: task } }
            }
          })
        }
      }),
      { name: 'board-storage' }
    )
  )
)
