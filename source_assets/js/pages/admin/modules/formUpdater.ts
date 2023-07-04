import { Setter } from "solid-js";

import { IPost } from "../api/types";
import { timeFormatISO } from "../utils/dateFormater";

export const updatePostField =
  (
    setter: Setter<IPost>,
    fieldName:
      | "title"
      | "slug"
      | "published"
      | "featured"
      | "date"
      | "series"
      | "categories"
      | "markdown"
      | "post_snippet",
    index?: number
  ) =>
  (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    setter((prev) => {
      if (fieldName === "categories") {
        prev.categories[index as number] = inputElement.value;
        return { ...prev, categories: [...prev.categories] };
      }
      if (fieldName === "published") {
        return { ...prev, published: !prev.published };
      }
      if (fieldName === "featured") {
        return { ...prev, featured: !prev.featured };
      }
      if (fieldName === "date") {
        return { ...prev, date: timeFormatISO(inputElement.value) };
      }

      return {
        ...prev,
        [fieldName]: inputElement.value,
      };
    });
  };

export const addCategory = (setter: Setter<IPost>) => {
  setter((prev) => {
    if (prev.categories[prev.categories.length - 1] === "") {
      return { ...prev };
    }
    return { ...prev, categories: [...prev.categories, ""] };
  });
};

export const removeCategory =
  (setter: Setter<IPost>, index: number) => (event: Event) => {
    setter((prev) => {
      return {
        ...prev,
        categories: prev.categories.filter((c) => c !== prev.categories[index]),
      };
    });
  };
