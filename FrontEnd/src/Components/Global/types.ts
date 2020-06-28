export enum MessageType {
    Success = "success",
    Warning = "warning",
    Error = "error",
}

export interface UserAuth {
   user: string;
   token: string;
}
