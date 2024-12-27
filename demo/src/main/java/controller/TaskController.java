package controller;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin     // Update with your frontend's URL if different
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();  // Returns a list of all tasks in the database
    }

    // Create a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task); // Saves the task to the database
    }

    // Mark a task as completed
    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> markAsComplete(@PathVariable("id") String id) {
        Optional<Task> taskOptional = taskRepository.findById(id); // Finds the task by ID
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setCompleted(true); // Marks the task as completed
            taskRepository.save(task); // Saves the updated task
            return ResponseEntity.ok(task); // Returns the updated task
        }
        return ResponseEntity.notFound().build(); // Returns 404 if task not found
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") String id) {
        Optional<Task> taskOptional = taskRepository.findById(id); // Finds the task by ID
        if (taskOptional.isPresent()) {
            taskRepository.delete(taskOptional.get()); // Deletes the task from the database
            return ResponseEntity.noContent().build(); // Returns 204 No Content if successful
        }
        return ResponseEntity.notFound().build(); // Returns 404 if task not found
    }
}
