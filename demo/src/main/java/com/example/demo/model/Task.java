package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")  // MongoDB collection name
public class Task {

    @Id
    private String id;  // Unique identifier for each task
    private String name;  // Task name
    private boolean completed;  // Task completion status

    // Constructors
    public Task() {
    }

    public Task(String name, boolean completed) {
        this.name = name;
        this.completed = completed;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
