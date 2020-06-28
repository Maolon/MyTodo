

export enum taskType {
    Important = "Important",
    Schedule = "Schedule",
    Task = "Tasks",
    CheckList = "CheckList"
}

export const BASE_URL = "http://localhost:4020"

export const LOGOUT_URL = `${BASE_URL}/v1/auth/session`;

export const FETCH_TASKS = `${BASE_URL}/v1/tasks`;

export const DELTE_TASK = `${BASE_URL}/v1/tasks`