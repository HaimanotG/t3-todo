import { api } from "@/utils/api"
import { useState } from "react"

const CreateTodo = () => {
  const [form, setForm] = useState({
    text: "",
    completed: false,
  })

  const { refetch } = api.todo.getAllTodos.useQuery()

  const { mutate, isLoading } = api.todo.createTodo.useMutation({
    onSuccess: async () => {
      await refetch();
    }
  })

  const onSubmit = () => {
    mutate({
      ...form
    })
  }

  return (
    <div>
      <div className="card bg-base-100 shadow-xl max-w-[900px] mx-auto">
        <div className="card-body">
          <div className="flex flex-col gap-3">
            <input type="text"
              className="input input-bordered w-full bg-white"
              value={form.text}
              placeholder="Text"
              onChange={(e) => {
                setForm({
                  ...form,
                  text: e.target.value,
                })
              }} />
            <button
              className={`btn btn-active ${isLoading ? "loading" : ""}`}
              onClick={onSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default CreateTodo;