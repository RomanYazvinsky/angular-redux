package by.roma;

import java.util.List;

public interface IUserRepository {
    List<User> getUsers();

    void setUsers(List<User> users);

    void addNote(Note note);

    void addUser(User user);

    void save(String destination);

    void load(String destination);
}
