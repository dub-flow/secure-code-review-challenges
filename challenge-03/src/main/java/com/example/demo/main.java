package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.xml.bind.DatatypeConverter;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class main {
    private Map<String, String> userDatabase = new HashMap<>();

    public static void main(String[] args) {
        SpringApplication.run(main.class, args);
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam String username, @RequestParam String password) {
        String hashedPassword = hashPassword(password);
        userDatabase.put(username, hashedPassword);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String username, @RequestParam String password) {
        String hashedPassword = userDatabase.get(username);
        if (hashedPassword != null && hashedPassword.equals(hashPassword(password))) {
            return "Login successful";
        }
        return "Invalid username or password";
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(password.getBytes());
            byte[] digest = md.digest();
            return DatatypeConverter.printHexBinary(digest).toUpperCase();
        } catch (NoSuchAlgorithmException e) {
            return "Error: Hashing algorithm not found";
        }
    }

    // retrieving all usernames (simulated admin functionality)
    @GetMapping("/admin/usernames")
    public Map<String, String> getAllUsernames() {
        return userDatabase;
    }
}
