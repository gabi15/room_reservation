package com.example.demo.appuser;

import java.util.List;

public interface AppUserService {
    AppUser saveAppUser(AppUser appUser);
    Role saveRole(Role role);
    void addRoleToAppUser(String email, String roleName);
    AppUser getAppUser(String email);
    List<AppUser> getUsers();
}
