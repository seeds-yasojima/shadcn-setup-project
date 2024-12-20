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
  id: number; // ID
  title: string; // タイトル
  isComplete: boolean; // 完了フラグ true: 完了, false: 未完了
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
      // 対象のidを省いたtodoList
      const deletedTodoLists = todoList.filter((todo) => todo.id !== id);

      console.log(deletedTodoLists);

      // Todoリストを更新
      setTodoList(deletedTodoLists);
    }
  };

  /** 新規登録 */
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新規のTodoタイトルが未入力の場合は何もしない
    if (!newTodoTitle) {
      return;
    }

    const newTodoItem = {
      id: Math.floor(Math.random() * 10000), // ランダムな値。今回は新規のIDとして用いてます。
      title: newTodoTitle, // 入力されたタイトル
      isComplete: false, // 完了フラグ 初期値はfalse(= 未完了)
    };

    // 新規のTodoを先頭に追加
    const newTodoList = [newTodoItem, ...todoList];

    console.log(newTodoList);

    // Todoリストを更新
    setTodoList(newTodoList);

    // 入力欄をクリア
    setNewTodoTitle("");
  };

  /** チェックボックス */
  const handleCheckTodo = (e: boolean, todo: Todo) => {
    // チェックボックスの状態を変更
    const newTodoList = todoList.map((item) => {
      // 対象のIDのTodoのisCompleteを変更
      if (item.id === todo.id) {
        return {
          ...item,
          isComplete: e, // チェックボックスの状態を変更。スプレッド構文を使用して、isCompleteを上書きする
        };
      }

      // 対象のID以外のTodoはそのまま返す
      return item;
    });

    console.log(newTodoList);

    // Todoリストを更新
    setTodoList(newTodoList);
  };

  /** タイトルの変更 */
  const handleChangeTitle = (id: number, title: string) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: title, // チェックボックスの状態を変更。スプレッド構文を使用して、titleを上書きする
        };
      }
      return item;
    });

    console.log(newTodoList);

    // Todoリストを更新
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
