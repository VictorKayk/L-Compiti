import { IUseTodoList } from '../interfaces/hooks/IUseTodoList';

import { setTodoList } from '../useCases/todo-list/list/set';
import { deleteTodoList } from '../useCases/todo-list/list/delete';
import { readTodoList } from '../useCases/todo-list/list/read';
import { readAllTodoList } from '../useCases/todo-list/list/readAll';

import { setTodo } from '../useCases/todo-list/todo/set';

export function useTodoList(): IUseTodoList {
  const list = {
    setTodoList,
    deleteTodoList,
    readTodoList,
    readAllTodoList,
  };

  const todo = {
    setTodo,
  };

  return { list, todo };
}