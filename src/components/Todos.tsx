import CreateTodo from "./CreateTodo";
import TodosList from "./TodosList";

const Todos: React.FC = () => {
  return (
    <div className="artboard artboard-horizontal phone-5 mx-auto">
      <TodosList />
      <CreateTodo />
    </div>
  );
};

export default Todos;