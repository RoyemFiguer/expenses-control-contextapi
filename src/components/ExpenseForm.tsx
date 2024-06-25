import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget"; 

export default function ExpenseForm() {
    const[expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error,setError] = useState('')
    const { dispatch, state } = useBudget()

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId )[0]
            setExpense(editingExpense)
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
        const {name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField? +value : value
        })
    }

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validate
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        //Add new expense
        dispatch({type: 'add-expense', payload: { expense }})

        //Reset State
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
        >Nuevo Gasto</legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            >Nombre Gasto:</label>
            <input 
                type="text"
                id="expenseName"
                placeholder="Añade el Nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                onChange={handleChange}
                value={expense.expenseName}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >Cantidad:</label>
            <input 
                type="number"
                id="amount"
                placeholder="Añade la cantidad del gasto"
                className="bg-slate-100 p-2"
                name="amount"
                onChange={handleChange}
                value={expense.amount}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            >Categoría:</label>
            <select 
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                onChange={handleChange}
                value={expense.category}
            >
                <option value="">--- Seleccione ---</option>
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >{category.name}</option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >Fecha Gasto:</label>
            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

        <input
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={'Registrar Gasto'}
        />

    </form>
  )
}

