import { FC, useEffect, useState } from "react";
import axios from "axios";
import { TodoType } from "../types";
import TodoForm from "../todoForm/TodoForm";
import TodoItem from "../todoItem/TodoItem";
import scss from "./Todolist.module.scss";
const url =
	"https://api.elchocrud.pro/api/v1/72cb4b993cb143e80c92c94914cbb509/todolistdata";
console.log(url);

// ----------------------------------------------------

const Todolist: FC = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);

	const getTodos = async () => {
		try {
			const response = (await axios.get(url)).data;
			setTodos(response);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------

	const addTodo = async (text: string) => {
		try {
			const newItem: TodoType = {
				text,
				completed: false,
			};

			const response = (await axios.post<TodoType>(url, newItem)).data;

			setTodos([...todos, response]);
			console.log(response);
		} catch (error) {
			console.error(error);
		}

		getTodos();
	};
	// ----------------------------------------------------

	const deleteTodo = async (id: number) => {
		try {
			const response = await axios.delete<TodoType>(`${url}/${id}`);
			setTodos(todos.filter((todo) => todo._id !== id));
			getTodos();
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};
	// ----------------------------------------------------

	const toggleTodo = async (id: number) => {
		const updateTodo = todos.map((todo) =>
			todo._id === id ? { ...todo, completed: !todo.completed } : todo
		);

		setTodos(updateTodo);
		console.log(updateTodo);

		try {
			await axios.patch(`${url}/${id}`, {
				completed: updateTodo.find(
					(todo) => todo._id === Number(id) || todo._id === undefined
				)?.completed,
			});
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------

	const toggleAllTodo = async () => {
		const allCompleted = todos.every((todo) => todo.completed);
		const updateTodo = todos.map((todo) => ({
			...todo,
			completed: !allCompleted,
		}));

		setTodos(updateTodo);
		console.log(updateTodo);

		try {
			await axios.patch(url, { completed: !allCompleted });
		} catch (error) {
			console.error(error);
		}
	};
	// ----------------------------------------------------

	const deleteAllTodos = async () => {
		try {
			await axios.delete(url);
			setTodos([]);
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------

	useEffect(() => {
		getTodos();
	}, []);
	return (
		<div className={scss.sectionTodoList}>
			<div className={scss.contentForm}>
				<TodoForm
					addTodo={addTodo}
					toggleAllTodo={toggleAllTodo}
					deleteAllTodos={deleteAllTodos}
				/>
			</div>

			<ul className={scss.todolist}>
				{todos.map((todo) => (
					<TodoItem
						key={todo._id}
						todo={todo}
						deleteTodo={deleteTodo}
						toggleTodo={toggleTodo}
					/>
				))}
			</ul>
		</div>
	);
};

export default Todolist;
