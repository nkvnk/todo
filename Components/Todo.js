import { deleteTodo } from "@/utils/supabaseFunction";
import React from "react";

export default function Todo({ todos, setTodos, notifys }) {
  // Check if todos is an array and has items

  const deletes = async (id) => {
    console.log("ボタン押せてるよね");
    console.log(id);
    notifys();
    await deleteTodo(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  if (!todos) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center"></td>
      </tr>
    );
  }

  return (
    <>
      {todos.map((todo) => (
        <tr key={todo.id} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {todo.created_at
              ? new Date(todo.created_at).toLocaleDateString()
              : "No Date"}
          </th>
          <td className="px-6 py-4">{todo.title}</td>
          <td className="px-6 py-4">{todo.description}</td>

          <td className="px-4 py-4 flex gap-1">
            <button
              className="py-2 px-3.5 bg-green-500 text-white  "
              onClick={() => deletes(todo.id)}
            >
              Done
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
