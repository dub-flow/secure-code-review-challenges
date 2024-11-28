package com.example.demoapp;

import org.springframework.web.bind.annotation.*;
import java.lang.reflect.Method;

@RestController
public class Controller {

    @GetMapping("/hello")
    public String hello() {
        NormalUser normalUser = new NormalUser();
        return normalUser.sayHello();
    }

    @GetMapping("/custom-hello")
    public String customHello(@RequestParam String user) {
        try {
            Class<?> clazz = Class.forName(user);
            Method method = clazz.getMethod("sayHello");
            Object instance = clazz.getDeclaredConstructor().newInstance();
            Object result = method.invoke(instance);

            return result.toString();
        } catch (Exception e) {
            return "Error invoking method: " + e.getMessage();
        }
    }
}
