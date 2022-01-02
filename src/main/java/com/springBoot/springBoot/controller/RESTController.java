package com.springBoot.springBoot.controller;

import com.springBoot.springBoot.model.User;
import com.springBoot.springBoot.service.RoleService;
import com.springBoot.springBoot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RESTController {
    @Autowired
    private UserService userService;

    @Autowired
    RoleService roleService;

    //get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.allUsers();
    }

    //get user by ID
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    //save user
    @PostMapping("/users")
    public String saveUser(@RequestBody User user) {
        userService.add(user);
        return "redirect:/admin";
    }

    //update user
    @PutMapping("/users")
    public String updateUser(@RequestBody User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    //delete user by ID
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
