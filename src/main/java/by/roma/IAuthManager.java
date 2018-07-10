package by.roma;

public interface IAuthManager {
    void login(User user);

    void logout(String token);

    User getUser(String token);
}
