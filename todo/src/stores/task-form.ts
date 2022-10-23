import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { TaskType } from './board'

export interface TaskFormState {
  isOpen: boolean
  columnId: string
  task: TaskType
  setColumnId: (columnId: string) => void
  setTask: (task: TaskType) => void
  toggle: () => void
  reset: () => void
}

export const useTaskFormStore = create<TaskFormState>()(
  devtools(set => ({
    isOpen: false,
    columnId: '',
    task: { id: '', content: '' },
    setColumnId: (columnId: string) => set({ columnId }),
    setTask: (task: TaskType) => set({ task }),
    toggle: () => set(state => ({ isOpen: !state.isOpen })),
    reset: () => set({ isOpen: false, columnId: '', task: { id: '', content: '' } })
  }))
)
