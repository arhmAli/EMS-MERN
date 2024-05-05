import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useEmployeeStore = create(
  persist(
    (set) => ({
      salaries: [],
      addSalaries: (salary) =>
        set((state) => ({ salaries: [...state.salaries, salary] })),
    }),
    {
      name: 'employee-store', 
    }
  )
);

export default useEmployeeStore;
