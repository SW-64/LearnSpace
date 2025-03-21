import TaskService from '../services/task.service.js';

class TaskController {
  taskService = new TaskService();
}

export default TaskController;
