
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import TodoItem from "./TodoItem";

const TodosList = () => {
  const { data: sessionData } = useSession();

  const { data: todos, isLoading } = api.todo.getAllTodos.useQuery(undefined, {
    enabled: !!sessionData?.user
  })

  return (
    <div className="overflow-x-auto w-full">
      {isLoading && <progress className="progress w-full" />}
      <table className="table w-full">
        <thead>
          <tr>
            <th>
            </th>
            <th>Todo</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map(((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          )))}
        </tbody>
      </table>
    </div>
  );
}

export default TodosList;