package by.roma;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
public class TestController {
    private List<Note> notes;
    @Autowired
    private IUserRepository repository;

    public TestController() {
        this.notes = new ArrayList<>();
    }

    @RequestMapping(value = "/notes", method = {RequestMethod.GET}, produces = {"application/json"})
    public List<Note> getNotes() {
        return notes;
    }


    @RequestMapping(value = "/note", method = {RequestMethod.POST}, produces = {"application/json"})
    public void addNote(@RequestBody Note note) {
        boolean isPresent = false;
        if (note.getId() == null) {
            note.setId(notes.size());
        }
        for (Note note1 : notes) {
            if (note.equals(note1)) {
                note1.setTitle(note.getTitle());
                note1.setUserId(note.getUserId());
                note1.setText(note.getText());
                isPresent = true;
            }
        }
        if (!isPresent) {
            notes.add(note);
        }
    }

    @RequestMapping(value = "/note/delete", method = {RequestMethod.POST}, produces = {"application/json"})
    public void deleteNote(@RequestBody Note note) {
        notes.remove(note);
    }

}
