package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
class UserController {

    private final JdbcTemplate jdbcTemplate;

    public UserController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/users")
    public List<Map<String, Object>> getUsers(@RequestParam String orderBy) {
        String query = "SELECT * FROM users ORDER BY " + orderBy;
        return jdbcTemplate.queryForList(query);
    }

    @PostMapping("/users")
    public String addUser(@RequestParam String username) {
        String query = "INSERT INTO users (username) VALUES (?)";
        jdbcTemplate.update(query, username);
        return "User added successfully";
    }
}
