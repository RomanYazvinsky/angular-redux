package by.roma;

import java.util.List;

public class AuthManager implements IAuthManager {
    private class Auth {
        private User user;
        private String token;

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }

    private List<Auth> authList;

    private String genToken(User user) {
        return "";
    }

    private Auth findAuth(String token) {
        Auth auth = null;
        for (Auth authOfToken : authList) {
            if (authOfToken.getToken().equals(token)) {
                auth = authOfToken;
            }
        }
        return auth;
    }

    @Override
    public void login(User user) {
        String token = genToken(user);
        Auth auth = new Auth();
        auth.setUser(user);
        auth.setToken(token);
        authList.add(auth);
    }

    @Override
    public void logout(String token) {
        authList.remove(findAuth(token));
    }

    @Override
    public User getUser(String token) {
        return findAuth(token).getUser();
    }
}
