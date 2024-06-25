import { Expense } from "../types"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {
  return (
    <div>
      Expense detail
    </div>
  )
}
