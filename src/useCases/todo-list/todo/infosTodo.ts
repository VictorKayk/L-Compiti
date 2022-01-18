import { readAllTodoList } from '..';
import { isEmpty } from '../../../helpers';
import { IInfosTodo, ITodo } from '../../../interfaces/todo-list';

export async function infosTodo(): Promise<IInfosTodo> {
  const todosList = await readAllTodoList();

  let unfinishedTodos: ITodo[] = [];

  todosList.forEach((todoList) => {
    const unfinished = todoList.todos.filter((todo) => !todo.isFinished);
    unfinishedTodos = [...unfinishedTodos, ...unfinished];
  });

  const data = new Date().getTime();
  const nextTodo = unfinishedTodos.reduce((acc, todo) => {
    if (!todo.notification) return acc;

    if (todo.notification.getTime() > data) {
      if (isEmpty(acc)) return todo;
      if (todo.notification.getTime() < acc.notification.getTime()) return todo;
    }

    return acc;
  }, {} as ITodo);

  return {
    unfinishedTodos: unfinishedTodos.length,
    nextTodo,
  };
}
