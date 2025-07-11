'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TodoItem from '@/components/todo/TodoItem'
import SaveButton from '@/components/todo/SaveButton'

export default function TodoPage() {
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo])
      setNewTodo('')
    }
  }

  const removeTodo = (index: number) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const saveAllData = () => {
    console.log("save successful");
  }

  const onClear = () => {
    setTodos([]);
  }

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Add"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo()
          }}
        />
        <Button onClick={addTodo}>Add</Button>
        <SaveButton onSave={saveAllData} />
      </div>
      <div className="flex-1 overflow-y-auto max-h-[600px] space-y-2 mb-4 border rounded p-2">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            text={todo}
            onRemove={() => removeTodo(index)}
          />
        ))}
      </div>

      <div>
        <Button onClick={onClear} variant="destructive" className="w-full">
          Clear
        </Button>
      </div>
    </div>
  )

}
