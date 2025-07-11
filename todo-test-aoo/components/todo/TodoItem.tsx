'use client'

type Props = {
  index: number
  text: string
  done: boolean
  onRemove: () => void
  onToggle: () => void
}

export default function TodoItem({ index, text, done, onRemove, onToggle }: Props) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded shadow-sm border ${
        done ? 'todo-done border-green-300' : 'todo-pending border-red-300'
      }`}
    >
      <span>{index + 1} </span>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!done}
          onChange={onToggle}
          className="w-4 h-4"
        />
        <span className={`${done ? 'line-through text-gray-500' : ''}`}>{text}</span>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:underline">🗑</button>
    </div>
  )
}
