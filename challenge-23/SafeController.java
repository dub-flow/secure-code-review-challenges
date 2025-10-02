package com.example.demoapp;

import org.springframework.web.bind.annotation.*;
import java.lang.reflect.Method;
import java.util.Set;

@RestController
@RequestMapping("/safe")
public class SafeController {

    private static final Set<String> allowedClasses = Set.of(
        "com.example.demoapp.NormalUser"
    );

    @GetMapping("/custom-hello")
    public String customHello(@RequestParam String user) {
        if (!allowedClasses.contains(user)) {
            return "Error: Class not allowed";
        }

        try {
            // Load the class dynamically but only if it's in the allow-list
            Class<?> clazz = Class.forName(user);
            Method method = clazz.getMethod("sayHello");
            Object instance = clazz.getDeclaredConstructor().newInstance();
            Object result = method.invoke(instance);

            return result.toString();
        } catch (Exception e) {
            return "Error invoking method: " + e.getClass().getSimpleName() + " - " + e.getMessage();
        }
    }
}
