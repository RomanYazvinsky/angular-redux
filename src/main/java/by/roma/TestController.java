package by.roma;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
public class TestController {
    private List<Note> notes;

    public TestController() {
        this.notes = new ArrayList<>();
    }

    @RequestMapping(value = "/notes", method = {RequestMethod.GET}, produces = {"application/json"})
    public List<Note> getNotes() {
        return notes;
    }


    @RequestMapping(value = "/note", method = {RequestMethod.POST}, produces = {"application/json"})
    public void addNote(@RequestBody Note note) {
        notes.add(note);
    }

    @RequestMapping(value = "/note/delete", method = {RequestMethod.POST}, produces = {"application/json"})
    public void deleteNote(@RequestBody Note note) {
        notes.remove(note);
    }
}
