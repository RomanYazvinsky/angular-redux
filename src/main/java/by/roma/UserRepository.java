package by.roma;

import org.springframework.stereotype.Repository;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository implements IUserRepository {
    private List<User> users;
    private Integer noteCounter;

    public UserRepository() {
        this.users = new ArrayList<>();
        noteCounter = 0;
    }

    @Override
    public List<User> getUsers() {
        return users;
    }

    @Override
    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public void addNote(Note note) {
        User user = users.get(note.getUserId());
        user.getNotes().add(note);
        note.setId(noteCounter++); // should works
    }

    @Override
    public void addUser(User user) {
        user.setId(users.size());
        user.setNotes(new ArrayList<>());
        users.add(user);
    }

    @Override
    public void save(String destination) {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(destination);

            try (ObjectOutputStream oos = new ObjectOutputStream(fos)) {
                oos.writeObject(users);
            } catch (IOException e) {
                System.out.println("ЕГГОР, ЕГГОР 2");
            }
        } catch (FileNotFoundException e) {
            System.out.println("ЕГГОР, ЕГГОР 1");
        }
    }

    @Override
    public void load(String destination) {
        FileInputStream fos = null;
        try {
            fos = new FileInputStream(destination);

            try (ObjectInputStream oos = new ObjectInputStream(fos)) {
                users = (List<User>) oos.readObject();
                for (User user : users) {
                    noteCounter += user.getNotes().size();
                }
            } catch (IOException | ClassNotFoundException e) {
                System.out.println("ЕГГОР, ЕГГОР 2");
            }
        } catch (FileNotFoundException e) {
            System.out.println("ЕГГОР, ЕГГОР 1");
        }
    }
}
