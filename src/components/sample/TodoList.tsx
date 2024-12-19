import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TodoItem } from "./TodoItem";
import { JsonCode } from "./JsonCode";
import { CompletedProgress } from "./CompletedProgress";
import { TodoCreateForm } from "./TodoCreateForm";

export type Todo = {
  id: number;
  title: string;
  isComplete: boolean;
};

const initialTodoList: Todo[] = [];

export const TodoList = () => {
  const [todoList, setTodoList] = useState(initialTodoList);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleChangeNewTodoTitle = (value: string) => {
    setNewTodoTitle(value);
  };

  /** 削除 */
  const handleDelete = (id: number) => {
    if (confirm("削除しますか？")) {
      const deletedTodoLists = todoList.filter((todo) => todo.id !== id);
      setTodoList(deletedTodoLists);
    }
  };

  /** 新規登録 */
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodoTitle) {
      return;
    }

    const newTodoItem = {
      id: Math.floor(Math.random() * 10000),
      title: newTodoTitle,
      isComplete: false,
    };

    const newTodoList = [newTodoItem, ...todoList];
    setTodoList(newTodoList);
    setNewTodoTitle("");
  };

  /** チェックボックス */
  const handleCheckTodo = (e: boolean, todo: Todo) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          isComplete: e,
        };
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  /** タイトルの変更 */
  const handleChangeTitle = (id: number, title: string) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: title,
        };
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Todoリスト</CardTitle>
            <CardDescription>
              Todoの登録・変更・削除ができます。あなたのやる気を全力でサポート！
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {todoList.length > 0 && <CompletedProgress todoList={todoList} />}
            <TodoCreateForm
              newTodoTitle={newTodoTitle}
              onChangeNewTodoTitle={handleChangeNewTodoTitle}
              onCreate={handleCreate}
            />
            {todoList.length === 0 ? (
              <div className="px-6 pb-6 text-slate-600 text-sm">
                タスクは未登録です。
              </div>
            ) : (
              <>
                <ul className="divide-y border-t">
                  {todoList.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onCheckTodo={handleCheckTodo}
                      onDelete={handleDelete}
                      onChangeTitle={handleChangeTitle}
                    />
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <JsonCode data={JSON.stringify({ newTodoTitle, todoList }, null, 2)} />
      </div>
    </div>
  );
};
