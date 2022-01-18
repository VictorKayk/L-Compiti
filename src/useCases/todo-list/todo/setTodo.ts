import { v4 as uuid } from 'uuid';
import { readTodoList, setTodoList } from '..';
import { ITodo, ISetTodo } from '../../../interfaces/todo-list';

export async function setTodo(
  listId: string,
  { id, name, isFinished, notification }: ISetTodo
): Promise<void> {
  const data = await readTodoList(listId);
  if (!data) throw new Error("Todo list doesn't exist.");

  let newTodos: ITodo[] = [];

  const isTodoInList = data.todos.find((todo) => todo.id === id);
  if (isTodoInList) {
    newTodos = data.todos.map((todo) =>
      todo.id === id
        ? {
            id,
            name: name || todo.name,
            isFinished: isFinished || todo.isFinished,
            notification: notification || todo.notification,
          }
        : todo
    );
  } else {
    const todo: ITodo = {
      id: uuid(),
      name: name || '',
      isFinished: isFinished || false,
      notification: notification || null,
    };

    newTodos = [...data.todos, todo];
  }

  await setTodoList({
    id: listId,
    todos: newTodos,
  });
}