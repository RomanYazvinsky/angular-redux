package by.roma.services;

import by.roma.entity.Role;
import by.roma.entity.User;
import by.roma.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Role role : user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        String password = user.getPassword();
     //   password = new String(Base64.getEncoder().encode(password.getBytes()));
        System.out.println(user.getPassword());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), password, authorities);
    }
}
