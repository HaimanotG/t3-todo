import { Card, CardBody } from "@material-tailwind/react";
import CreateTodo from "./CreateTodo";
import TodosList from "./TodosList";

const Todos: React.FC = () => (
  <Card className="w-2/3 mx-auto">
    <CardBody className="flex flex-col gap-4">
      <TodosList />
      <CreateTodo />
    </CardBody>
  </Card>
)

export default Todos;