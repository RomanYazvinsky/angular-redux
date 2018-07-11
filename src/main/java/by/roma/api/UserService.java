package by.roma.api;

import by.roma.entity.User;

public interface UserService {
    void save(User user);
    User findByUsername(String username);
}
