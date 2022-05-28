package com.example.demo.appuser;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class AppUserServiceImpl implements AppUserService, UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public AppUserServiceImpl(AppUserRepository appUserRepository) {
//        this.appUserRepository = appUserRepository;
//    }

    @Override
    public List<AppUser> getUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public AppUser saveAppUser(AppUser appUser){
        Optional<AppUser> userByEmail = appUserRepository.findUserByEmail(appUser.getEmail());
        if( userByEmail.isPresent()){
            throw new IllegalStateException("Email taken");
        }
        log.info("Saving new user {} to the database",  appUser.getEmail());
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        appUserRepository.save(appUser);
        return appUser;
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database ", role.getName());
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToAppUser(String email, String roleName) {
        Optional<AppUser> appUser = appUserRepository.findUserByEmail(email);
        Role role = roleRepository.findByName(roleName);
        appUser.ifPresent(user -> user.getRoles().add(role));

    }

    @Override
    public AppUser getAppUser(String email){
        Optional<AppUser> appUser = appUserRepository.findUserByEmail(email);
        if(appUser.isEmpty()){
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        }
        return appUser.get();
    }


    public void deleteAppUser(Long id){
        boolean exists = appUserRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException(
                    "user with id " +id + " does not exist"
            );
        }
        appUserRepository.deleteById(id);
    }


    @Transactional
    public void updateAppUser(Long id, String name, String email) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException(
                        "student with id "+ id  +"does not exist"
                ));

        if(name != null && name.length()>0 && !Objects.equals(user.getName(), name)){
            user.setName(name);
        }
        if(email != null && email.length()>0 && !Objects.equals(user.getEmail(), email)){
            Optional<AppUser> userByEmail = appUserRepository.findUserByEmail(user.getEmail());
            if( userByEmail.isPresent()){
                throw new IllegalStateException("Email taken");
            }
            user.setName(name);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<AppUser> appUser = appUserRepository.findUserByEmail(email);
        if(appUser.isEmpty()){
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        }
        AppUser user = appUser.get();
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role ->{authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new User(user.getEmail(), user.getPassword(), authorities);
    }
}
