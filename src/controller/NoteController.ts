import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Note } from '../entity/Note';
import Util from '../util/helpers';

export class NoteController {
  static getAll = async (req: Request, res: Response) => {
    try {
      // get user from database
      const noteRepository = getRepository(Note);
      const notes: Note[] = await noteRepository.find();

      res.status(200).send(Util.formResponseObject(notes));
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      let { title, content } = req.body;
      if (!(title && content)) {
        res.status(400).send();
      }

      const noteRepository = getRepository(Note);
      let note: Note;
      note = await noteRepository.findOne({ where: { title } });
      if (!note) {
        note = new Note();
        note.title = title;
        note.content = content;
        note.priority = 1;
        note.color = 'green';
        note.timestamp = new Date();

        const result = await noteRepository.save(note);

        res.status(200).send(Util.formResponseObject(result));
      } else {
        res
          .status(400)
          .send(Util.formResponseObject('Note already exists.', 4000));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static getNote = async (req: Request, res: Response) => {
    try {
      const noteId = req.params.noteId;
      if (!noteId) {
        res.status(400).send();
      }

      const noteRepository = getRepository(Note);
      const note: Note = await noteRepository.findOne(noteId);
      if (!note) {
        res
          .status(400)
          .send(Util.formResponseObject('Note does not exist.', 4000));
      } else {
        res.status(200).send(Util.formResponseObject(note));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static updateNote = async (req: Request, res: Response) => {
    try {
      const { title, content, priority, color } = req.body;
      const noteId = req.params.noteId;
      if (!noteId || !(title || content || priority || color)) {
        res.status(400).send();
      }

      // get user from database
      const noteRepository = getRepository(Note);
      const note: Note = await noteRepository.findOne(noteId);
      if (title) note.title = title;
      if (content) note.content = content;
      if (priority) note.priority = priority;
      if (color) note.color = color;

      if (!note) {
        res
          .status(400)
          .send(Util.formResponseObject('Note does not exist.', 4000));
      } else {
        const updatedNote = await noteRepository.save(note);
        res.status(200).send(Util.formResponseObject(updatedNote));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static deleteNote = async (req: Request, res: Response) => {
    try {
      const noteId = req.params.noteId;
      if (!noteId) {
        res.status(400).send();
      }

      const noteRepository = getRepository(Note);
      const note: Note = await noteRepository.findOne(noteId);
      if (!note) {
        res
          .status(400)
          .send(Util.formResponseObject('Note does not exist.', 4000));
      } else {
        noteRepository.delete(noteId);
        res.status(200).send(Util.formResponseObject({ isDeleted: true }));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };
}
