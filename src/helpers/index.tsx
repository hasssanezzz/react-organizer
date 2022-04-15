import { Todo } from "../interfaces"

export function customSplit<T>(array: T[]) {
  let result: T[][] = [[], [], []]

  array.forEach((element, index) => {
    result[(index + 3) % 3].push(element)
  })

  return result
}

export const getCategory = (text: string) => {
  if (typeof text === "string" && text.length) {
    const categories = text.match(/#(\w+)/g)
    const category = categories && categories[0]
    return category ? category.replace("#", "") : ""
  } else {
    return ""
  }
}

export const getCategories = (todos: Todo[]) => {
  return [...new Set(todos.map((todo: { text: string }) => getCategory(todo.text)))].filter(
    (category) => category.length
  )
}
