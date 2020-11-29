import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Note } from '../entity/Note';

export class NoteController {
  static create = async (req: Request, res: Response) => {
    try {
      console.log('usao ovde');
      // check if username and password are set
      let { title, content } = req.body;
      if (!(title && content)) {
        res.status(400).send();
      }

      // get user from database
      const noteRepository = getRepository(Note);
      let note: Note = new Note();
      note = await noteRepository.findOneOrFail({ where: { title } });
      console.log(note);
      if (!note) {
        note.title = title;
        note.content = content;
        note.priority = 1;
        note.color = 'green';
        note.timestamp = new Date();

        const result = await noteRepository.save(note);

        res.status(200).send(result);
      } else {
        console.log('NOte already exists.');
        res.status(400).send({ message: 'Note alrady exists' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };
}
