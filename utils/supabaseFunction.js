import { supabase } from "./supabase";

export const getTodo = async () => {
  const { data, error } = await supabase
    .from("todo")
    .select("id, title, description, created_at");
  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
  console.log("取得したデータ:", data); // デバッグ用に表示
  return data;
};

export const addTodo = async (formData) => {
  // ISOフォーマットに変換
  const { data, error } = await supabase.from("todo").insert({
    title: formData.title,
    description: formData.description,
  });
};

export const deleteTodo = async (id) => {
  const { data, error } = await supabase.from("todo").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error);
  } else {
    console.log("Todo deleted:", data);
  }
};
