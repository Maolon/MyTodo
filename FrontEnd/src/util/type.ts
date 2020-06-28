import { tasksInterface } from "./TaskFetchHandler"
import { TaskInterface } from "../Components/Pages"

export const URL = "localhost:3000"

export enum Methods {
    put = "put",
    get = "get",
    delete = "delete",
    post = "post"
}

export const DEFAULT_USER_AUTH = { user: "", token: ""}

export const DEFAULT_USER_REGISTER = { user:"", password: ""}


const important :TaskInterface [] = []
const schedule : TaskInterface [] = []
const tasks : TaskInterface [] = []

export const DEFAULT_COMBINE_TASKS = {
    important,
    schedule,
    tasks
}

let TIME_OUT= 3000;
export { TIME_OUT }
