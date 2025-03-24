import TaskRepository from '../repositories/task.repository.js';

class TaskService {
  taskRepository = new TaskRepository();
}

export default TaskService;
