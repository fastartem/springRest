package com.springBoot.springBoot.controller;

import com.springBoot.springBoot.model.Role;
import com.springBoot.springBoot.model.User;
import com.springBoot.springBoot.model.UserTransfer;
import com.springBoot.springBoot.service.RoleService;
import com.springBoot.springBoot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class RESTController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RESTController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.allUsers(), HttpStatus.OK);
    }

    //get user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    //save user
    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //update user
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@RequestBody UserTransfer user) {
    //    userService.update(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //delete user by ID
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }

    // get all roles
    @GetMapping("/roles")
    public List<Role> allRoles() {
        return roleService.listRoles();
    }

}
