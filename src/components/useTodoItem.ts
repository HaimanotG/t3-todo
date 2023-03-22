import { api, type RouterOutputs } from "@/utils/api";
import { useCallback } from "react";
type Todo = RouterOutputs['todo']['getAllTodos'][0]

const useTodoItem = (todo: Todo) => {
  const trpc = api.useContext();

	const { mutate: deleteTodo } = api.todo.deleteTodo.useMutation({
		onMutate: async ({ id }) => {
			await trpc.todo.getAllTodos.cancel()
			const previousTodos = trpc.todo.getAllTodos.getData()

			trpc.todo.getAllTodos.setData(undefined, (prev) => {
				if (!prev) return previousTodos
				return prev.filter(todo => todo.id !== id)
			})

			return { previousTodos }
		},
		onError: (_, __, context) => {
			if (!context) return
			trpc.todo.getAllTodos.setData(undefined, () => context.previousTodos)
		},
		onSettled: () => {
			void trpc.todo.getAllTodos.invalidate()
		},
	});

	const { mutate: updateTodo } = api.todo.updateTodo.useMutation({
		onMutate: async ({ id, completed }) => {
			await trpc.todo.getAllTodos.cancel()

			const previousTodos = trpc.todo.getAllTodos.getData()

			trpc.todo.getAllTodos.setData(undefined, (prev) => {
				if (!prev) return previousTodos
				return prev.map(todo => {
					if (todo.id === id) {
						return ({
							...todo,
							completed: !!completed
						})
					}
					return todo
				})
			})

			return { previousTodos }
		},
		onError: (_, __, context) => {
			if (!context) return
			trpc.todo.getAllTodos.setData(undefined, () => context.previousTodos)
		},
		onSettled: () => {
			void trpc.todo.getAllTodos.invalidate()
		},
	});

	const markTodoComplete = useCallback(() => {
		updateTodo({
			completed: !todo.completed,
			id: todo.id
		})
	}, [todo.completed, todo.id, updateTodo])

  return {
    trpc,
    markTodoComplete,
    deleteTodo,
    updateTodo
  }
}

export default useTodoItem;