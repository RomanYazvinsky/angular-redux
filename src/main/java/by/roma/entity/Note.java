package by.roma.entity;

import java.io.Serializable;
import java.util.Objects;

public class Note implements Serializable {
    private Integer id;
    private String title;
    private Integer userId;
    private String text;

    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Note note = (Note) o;
        return note.id.equals(this.id) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, "Who let the dogs out? Woof, woof, woof");
    }

}
