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
  column: string
  task: TaskType
  columns: Columns
  getColumn: (id: string) => ColumnType
  countTaskByColumn: (id: string) => number
  selectColumn: (id: string) => void
  addTaskToColumn: (columnId: string, content: string) => void
  updateTask: (columnId: string, taskId: string, content: string) => void
  selectTask: (task: TaskType) => void
  removeTask: (columnId: string, taskId: string) => void
  moveTask: (columnId: string, toColumnId: string, taskId: string) => void
  resetTask: () => void
}

export const useBoardStore = create<BoardState>()(
  devtools(
    persist(
      (set, get) => ({
        column: '',
        task: { id: '', content: '' },
        columns: {
          backlog: { id: 'backlog', title: 'Backlog', tasks: {} },
          todo: { id: 'todo', title: 'Todo', tasks: {} },
          'on-going': { id: 'on-going', title: 'On going', tasks: {} },
          'team-review': { id: 'team-review', title: 'Team review', tasks: {} }
        },
        getColumn: (id: string) => get().columns[id],
        countTaskByColumn: (id: string) => Object.keys(get().getColumn(id).tasks).length,
        selectColumn: (id: string) => set({ column: id }),
        addTaskToColumn: (columnId: string, content: string) => {
          const taskId = uuid()
          const column = get().getColumn(columnId)
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks: { ...column.tasks, [taskId]: { id: taskId, content } } }
            }
          })
        },
        updateTask: (columnId: string, taskId: string, content: string) => {
          const column = get().getColumn(columnId)
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks: { ...column.tasks, [taskId]: { id: taskId, content } } }
            }
          })
        },
        selectTask: (task: TaskType) => set({ task: task }),
        removeTask: (columnId: string, taskId: string) => {
          const column = get().getColumn(columnId)
          const { [taskId]: _, ...tasks } = column.tasks
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks }
            }
          })
        },
        moveTask: (columnId: string, toColumnId: string, taskId: string) => {
          const column = get().getColumn(columnId)
          const toColumn = get().getColumn(toColumnId)
          const { [taskId]: task, ...tasks } = column.tasks
          set({
            columns: {
              ...get().columns,
              [column.id]: { ...column, tasks },
              [toColumn.id]: { ...toColumn, tasks: { ...toColumn.tasks, [taskId]: task } }
            }
          })
        },
        resetTask: () => set({ task: { id: '', content: '' } })
      }),
      { name: 'board-storage' }
    )
  )
)
