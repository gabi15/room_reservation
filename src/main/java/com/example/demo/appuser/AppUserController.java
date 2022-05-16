package com.example.demo.appuser;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserServiceImpl appUserServiceImpl;
//
//    @Autowired
//    public AppUserController(AppUserServiceImpl appUserServiceImpl) {
//        this.appUserServiceImpl = appUserServiceImpl;
//    }

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(appUserServiceImpl.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<AppUser> registerNewAppUser(@RequestBody AppUser appUser){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/user/save").toUriString());
        return ResponseEntity.created(uri).body(appUserServiceImpl.saveAppUser(appUser));
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/role/save").toUriString());
        return ResponseEntity.created(uri).body(appUserServiceImpl.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm roleToUserForm){
        appUserServiceImpl.addRoleToAppUser(roleToUserForm.getEmail(),roleToUserForm.getEmail());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path="{userId}")
    public void deleteAppUser(@PathVariable("userId") Long id){
        appUserServiceImpl.deleteAppUser(id);
    }

    @PutMapping(path = {"userId"})
    public void updateAppUser(
            @PathVariable("userId") Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email){
        appUserServiceImpl.updateAppUser(id, name, email);

    }
}

@Data
class RoleToUserForm {
    private String email;
    private String roleName;
}

