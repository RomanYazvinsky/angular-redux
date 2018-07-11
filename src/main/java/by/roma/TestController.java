package by.roma;

import by.roma.api.UserService;
import by.roma.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600,
        allowedHeaders = {"x-auth-token", "x-requested-with", "x-xsrf-token"})
@RestController
public class TestController {
    @Autowired
    private UserService userService;
    @Autowired
    AuthenticationTrustResolver authenticationTrustResolver;
    private boolean isCurrentAuthenticationAnonymous() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authenticationTrustResolver.isAnonymous(authentication);
    }

    @RequestMapping(value = "/msg", method = {RequestMethod.POST}, produces = {"application/json"})
    //@PreAuthorize("hasAuthority(ROLE_ADMIN) or hasAuthority(ROLE_USER)")
    public User logout(Authentication authentication) {
        User user = userService.findByUsername("admin");
        if (user == null){
            return new User();
        }
        return user;
    }
    @RequestMapping(value = "/user", method = {RequestMethod.GET})//, produces = {"application/json"})
    //@PreAuthorize("hasAuthority(ROLE_ADMIN) or hasAuthority(ROLE_USER)")
    public String logout2(Authentication authentication) {
       if (isCurrentAuthenticationAnonymous())
        return "anon";
       else return authentication.getName();
    }

}
