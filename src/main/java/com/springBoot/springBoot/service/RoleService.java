package com.springBoot.springBoot.service;

import com.springBoot.springBoot.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    List<Role> listRoles();

    Set<Role> getRoleSetByName(String[] roles);
}
