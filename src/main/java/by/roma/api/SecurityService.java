package by.roma.api;

public interface SecurityService {
    String findLoggedInUsername();
    void autoLogin(String username, String password);
}
