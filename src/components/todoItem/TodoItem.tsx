import { FC } from "react";
import { TodoType } from "../types";
import scss from "./TodoItem.module.scss";
interface TodoItemProps {
	todo: TodoType;
	deleteTodo: (id: number) => void;
	toggleTodo: (id: number) => void;
}
const TodoItem: FC<TodoItemProps> = ({ todo, deleteTodo, toggleTodo }) => {
	return (
		<li key={todo._id} className={scss.todoItem}>
			<span
				style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
				{todo.text}
			</span>
			<div className={scss.buttons}>
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => toggleTodo(todo._id)}
				/>
				<button onClick={() => deleteTodo(todo._id)}>delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
