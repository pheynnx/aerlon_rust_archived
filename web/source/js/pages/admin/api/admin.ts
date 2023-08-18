import axios from "axios";

import { IPost } from "./types";
import { timeFormatISO } from "../utils/dateFormater";

export async function updatePost(postData: IPost) {
  try {
    await axios.post(`/admin/api/post/${postData.id}`, {
      ...postData,
      categories: postData.categories.filter((c) => c != ""),
      date: timeFormatISO(postData.date),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(newPostData: IPost) {
  try {
    await axios.post(`/admin/api/post`, {
      ...newPostData,
      categories: newPostData.categories.filter((c) => c != ""),
      id: "00000000-0000-0000-0000-000000000000",
      date: timeFormatISO(newPostData.date),
      created_at: "2000-01-01T00:00:00.000000Z",
      updated_at: "2000-01-01T00:00:00.000000Z",
    });
  } catch (error) {
    console.log(error);
  }
}
