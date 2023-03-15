import { api } from "@/utils/api";
import { type Todo } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import { useCallback, useState, type FC } from "react";

const TodoItem: FC<{ todo: Todo}> = ({ todo }) => {
  const { data: sessionData } = useSession();

  const { refetch } = api.todo.getAllTodos.useQuery(undefined, {
    enabled: !!sessionData?.user
  })

  const { mutate: deleteTodo } = api.todo.deleteTodo.useMutation({
    onSuccess: async () => {
      await refetch();
    }
  });

  const { mutate: updateTodo } = api.todo.updateTodo.useMutation({
    onSuccess: async () => {
      await refetch();
    }
  });

  const [checked, setChecked] = useState(todo.completed ?? false)

  const markTodoComplete = useCallback(() => {
    setChecked(!checked);
    updateTodo({
      completed: !checked,
      id: todo.id
    })
  }, [checked, todo.id, updateTodo])
  
  return (
    <tr>
      <th>
        <label>
          <input checked={checked} onClick={markTodoComplete} type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        {todo.text}
      </td>
      <td>
        {formatDistance(todo.createdAt, new Date())}
      </td>
      <th>
        <button
          className="btn btn-xs btn-error"
          onClick={() => deleteTodo({
            id: todo.id
          })}
        >Delete</button>
      </th>
    </tr>
  );
}

export default TodoItem;