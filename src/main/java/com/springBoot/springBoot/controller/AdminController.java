package com.springBoot.springBoot.controller;

import com.springBoot.springBoot.model.Role;
import com.springBoot.springBoot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.springBoot.springBoot.service.RoleService;
import com.springBoot.springBoot.service.UserService;

import java.util.List;
import java.util.Set;

@Controller
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    RoleService roleService;

//    @RequestMapping(value = "admin", method = RequestMethod.GET)
//    public String adminPage(ModelMap model) {
//        model.addAttribute("users", userService.listUsers());
//        return "admin";
//    }

    @GetMapping("/admin")
    public String adminPage(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("users", userService.listUsers());
        return "admin";
    }

    @GetMapping("/user-add")
    public String addUserForm(User user, ModelMap model) {
        List<Role> roles = roleService.listRoles();
        model.addAttribute("roles", roles);
        return "user-add";
    }

    @PostMapping("/user-add")
    public String addUser(User user,
                          @RequestParam(value = "rolesChecked", required = false) String[] roles) {

        Set<Role> roleSet = roleService.getRoleSetByName(roles);
        user.setRoles(roleSet);
        userService.add(user);
        return "redirect:/admin";
    }

    @GetMapping("/user-delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @GetMapping("/user-update/{id}")
    public String updateUserForm(@PathVariable("id") Long id, ModelMap model) {
        List<Role> roles = roleService.listRoles();
        model.addAttribute("roles", roles);
        model.addAttribute("user", userService.findById(id));
        return "user-update";
    }

    @PostMapping("/user-update")
    public String updateUser(User user,
                             @RequestParam(value = "rolesChecked", required = false) String[] roles) {
        Set<Role> roleSet = roleService.getRoleSetByName(roles);
        user.setRoles(roleSet);
        userService.update(user);
        return "redirect:/admin";
    }
}
