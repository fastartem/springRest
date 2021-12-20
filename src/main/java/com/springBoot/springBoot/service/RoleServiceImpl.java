package com.springBoot.springBoot.service;

import com.springBoot.springBoot.dao.RoleDao;
import com.springBoot.springBoot.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleDao roleDao;

    @Autowired
    RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public List<Role> listRoles() {
        return roleDao.listRoles();
    }

    @Override
    public Set<Role> getRoleSetByName(String[] roles) {
        return roleDao.getRoleSetByName(roles);
    }
}
