import TaskRepository from "../repositories/task.repository";

class TaskService{
    taskRepository = new TaskRepository();
}

export default TaskService;