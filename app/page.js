"use client";
import Todo from "@/Components/Todo";
import { addTodo, getTodo } from "@/utils/supabaseFunction";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [todos, setTodos] = useState();
  const notify = () =>
    toast.success("Fight!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifys = () =>
    toast.success("Perfect!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    const get = async () => {
      const todos = await getTodo();
      setTodos(todos);
    };
    get();
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((forms) => ({ ...forms, [name]: value }));
    console.log(formData);
  };
  const submits = async (e) => {
    e.preventDefault();
    console.log("内部の確認", formData.title);
    if (formData.title === "") return;
    await addTodo(formData);
    notify();
    setFormData({
      title: "",
      description: "",
    });
    const next = await getTodo();
    setTodos(next);
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={submits}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-10 mx-auto"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={change}
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={change}
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>

        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[100%] mx-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 ">
                Build
              </th>
              <th scope="col" className="px-6 ">
                Title
              </th>
              <th scope="col" className="px-6 ">
                Description
              </th>

              <th scope="col" className="px-6  ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <Todo todos={todos} setTodos={setTodos} notifys={notifys} />
            <Todo /> <Todo />
          </tbody>
        </table>
      </div>

      <div></div>
    </>
  );
}
