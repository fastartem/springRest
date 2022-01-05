package com.springBoot.springBoot.controller;

import com.springBoot.springBoot.model.Role;
import com.springBoot.springBoot.model.User;
import com.springBoot.springBoot.model.WebUser;
import com.springBoot.springBoot.service.RoleService;
import com.springBoot.springBoot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public List<User> getAllUsers() {
        return userService.allUsers();
    }

    //get current user
    @GetMapping("/user")
    public User getCurrentUser(@AuthenticationPrincipal User user) {
        return user;
    }

    //get user by ID
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") long id) {
        return userService.findById(id);
    }

    // get all roles
    @GetMapping("/roles")
    public List<Role> allRoles() {
        return roleService.listRoles();
    }

    //save user
    @PostMapping("/users")
    public void saveUser(@RequestBody WebUser webUser) {
        Set<Role> roles = roleService.getRoleSetByName(webUser.getRoles().toArray(new String[0]));

        User user = new User(webUser.getId(), webUser.getName(), webUser.getPassword(), roles);
        userService.add(user);
    }

    //update user
    @PutMapping("/users/{id}")
    public void updateUser(@RequestBody WebUser webUser) {
        Set<Role> roles = roleService.getRoleSetByName(webUser.getRoles().toArray(new String[0]));
        User user = new User(webUser.getId(), webUser.getName(), webUser.getPassword(), roles);
        userService.update(user);
    }

    //delete user by ID
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
}
