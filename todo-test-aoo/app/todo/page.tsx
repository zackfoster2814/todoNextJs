'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TodoItem from '@/components/todo/TodoItem'
import SaveButton from '@/components/todo/SaveButton'

type Todo = {
  id: number
  content: string
  done: boolean
}

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch('http://localhost:8080/todo-item')
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export default function TodoPage() {
  const { data: todos = [], refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  const [newTodo, setNewTodo] = useState('')

  const addTodo = async () => {
    if (newTodo.trim()) {
      await fetch('http://localhost:8080/todo-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newTodo }),
      })
      setNewTodo('')
      refetch()
    }
  }

  const removeTodo = async (id: number) => {
    await fetch(`http://localhost:8080/todo-item/${id}`, {
      method: 'DELETE',
    })
    refetch()
  }

  const onClear = async () => {
    await fetch('http://localhost:8080/todo-item/deleteAll', {
      method: 'GET',
    })
    refetch()
  }

  const saveAllData = () => {
    console.log('save successful')
  }

  const toggleDone = async (todo: Todo) => {
    await fetch(`http://localhost:8080/todo-item/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !todo.done }),
    })
    refetch()
  }

  return (
    <div className="flex flex-col max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 h-[calc(100vh-5rem)]">
      <h1 className="custom-heading">📝 Todo App</h1>

      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo()
          }}
          className="flex-1"
        />
        <Button onClick={addTodo}>Add</Button>
        <SaveButton onSave={saveAllData} />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 border border-gray-200 rounded p-3 bg-gray-50">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            index={index}
            text={todo.content}
            done={todo.done}
            onRemove={() => removeTodo(todo.id)}
            onToggle={() => toggleDone(todo)}
          />
        ))}

        {todos.length === 0 && (
          <p className="text-center text-gray-500 italic">No todos yet.</p>
        )}
      </div>

      <div className="mt-4">
        <Button onClick={onClear} variant="destructive" className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  )
}
