
import { api } from "@/utils/api"
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react"

const CreateTodo = () => {
  const [form, setForm] = useState({
    text: "",
    completed: false,
  })

  const utils = api.useContext();

  const { mutate } = api.todo.createTodo.useMutation({
    onMutate: async (input) => {
      await utils.todo.getAllTodos.cancel()
      const previousTodos = utils.todo.getAllTodos.getData()

      utils.todo.getAllTodos.setData(undefined, (prev) => {
        if (!prev) return previousTodos
        const optimisticNewTodo = {
          ...input,
          userId: "t",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: "optimistic-id"
        }
        return [...prev, optimisticNewTodo]
      })

      return { previousTodos }
    },
    onError: (_, __, context) => {
      if (!context) return
      utils.todo.getAllTodos.setData(undefined, () => context.previousTodos)
    },
    onSettled: () => {
      void utils.todo.getAllTodos.invalidate()
    },
  })

  const onSubmit = () => {
    mutate({
      ...form
    })
  }

  return (
    <div>
      <div className="bg-base-100 mx-auto">
        <div className="card-body">
          <div className="flex flex-col gap-3">
            <Input
             type="text"
              value={form.text}
              label="Text"
              size="lg"
              onChange={(e) => {
                setForm({
                  ...form,
                  text: e.target.value,
                })
              }}
            />
            <Button
              onClick={onSubmit}>
              ADD
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CreateTodo;