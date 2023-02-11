 const enum Status {
    NotStarted,
    InProgress,
    Done
}
class Task {
    static maxId: number = 0;
    id: number
    name: string
    status: Status

    constructor(
        name: string,
        status: Status,){
           this.id = ++Task.maxId
           this.name = name
           this.status = status
    }

}

export {Task,Status}