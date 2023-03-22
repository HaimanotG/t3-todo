import { type RouterOutputs } from "@/utils/api";
import { Button, Checkbox } from "@material-tailwind/react";
import { formatDistance } from "date-fns";
import { type FC } from "react";
import useTodoItem from "./useTodoItem";

type Todo = RouterOutputs['todo']['getAllTodos'][0]

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {

	const { markTodoComplete, deleteTodo } = useTodoItem(todo);

	return (
		<tr>
			<th>
				<label>
					<Checkbox
						defaultChecked={todo.completed}
						onClick={markTodoComplete} />
				</label>
			</th>
			<td>
				{todo.text}
			</td>
			<td>
				{formatDistance(todo.createdAt, new Date())}
			</td>
			<th>
				<Button
					size="sm"
					color="red"
					onClick={() => deleteTodo({
						id: todo.id
					})}
				>Delete</Button>
			</th>
		</tr>
	);
}

export default TodoItem;