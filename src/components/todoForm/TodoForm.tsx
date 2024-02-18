import { FC, useState } from "react";
import scss from "./TodoForm.module.scss";
interface TodoInputProps {
	addTodo: (text: string) => void;
}

const TodoForm: FC<TodoInputProps> = ({
	addTodo,
	toggleAllTodo,
	deleteAllTodos,
}) => {
	const [inputValue, setInputValue] = useState("");

	const handleAddTodo = () => {
		if (inputValue.trim() !== "") {
			addTodo(inputValue);
			setInputValue("");
		} else {
			alert("Please enter task todos");
		}
	};
	return (
		<div className={scss.formbox}>
			<input
				type="text"
				placeholder="todo a task ...."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button onClick={handleAddTodo}>ADD</button>
			<button onClick={toggleAllTodo}>Toggle All Todos</button>
			<button onClick={deleteAllTodos}>Delete All Todos</button>
		</div>
	);
};

export default TodoForm;
