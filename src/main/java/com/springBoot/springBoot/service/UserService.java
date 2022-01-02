package com.springBoot.springBoot.service;

import com.springBoot.springBoot.model.User;

import java.util.List;

public interface UserService {
    void add(User user);

    void update(User user);

    List<User> allUsers();

    void delete(Long id);

    User findById(Long id);

    User getUserByName(String name);
}
