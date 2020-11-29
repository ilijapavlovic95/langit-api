import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Translation } from '../entity/Translation';
import { Word } from '../entity/Word';
import Util from '../util/helpers';

export class WordController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const wordRepository = getRepository(Word);
      const words: Word[] = await wordRepository.find();

      res.status(200).send(Util.formResponseObject(words));
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      let { english, translation } = req.body;
      if (!(english && translation)) {
        res.status(400).send();
      }

      const wordRepository = getRepository(Word);
      const translationRepository = getRepository(Translation);
      let word: Word;
      word = await wordRepository.findOne({
        where: { english },
      });
      if (!word) {
        word = new Word();
        word.english = english;
        word.timestamp = new Date();
      }

      let translationObject: Translation;
      translationObject = await translationRepository.findOne({
        where: { translation },
      });
      if (translationObject) {
        return res
          .status(400)
          .send(Util.formResponseObject('Translation already exists.', 4000));
      }

      translationObject = new Translation();
      translationObject.translation = translation;
      translationObject.timestamp = new Date();
      translationObject.word = word;

      const savedWord = await wordRepository.save(word);
      const savedTranslation = await translationRepository.save(
        translationObject
      );

      savedWord.translations = await translationRepository.find({
        where: { wordId: savedWord.id },
      });

      res.status(200).send(Util.formResponseObject(savedWord));
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static updateWord = async (req: Request, res: Response) => {
    try {
      let { english } = req.body;
      const { wordId } = req.params;

      if (!english) {
        res.status(400).send();
      }

      const wordRepository = getRepository(Word);
      let word: Word;
      word = await wordRepository.findOne(wordId);
      if (!word) {
        return res
          .status(400)
          .send(Util.formResponseObject('Word does not exist.', 4000));
      }

      word.english = english;
      const updatedWord = await wordRepository.save(word);

      const translationRepository = getRepository(Translation);
      updatedWord.translations = await translationRepository.find({
        where: { wordId: updatedWord.id },
      });

      res.status(200).send(Util.formResponseObject(updatedWord));
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static updateTranslation = async (req: Request, res: Response) => {
    try {
      let { translation } = req.body;
      const { wordId, translationId } = req.params;
      if (!translation) {
        res.status(400).send();
      }

      const wordRepository = getRepository(Word);
      const translationRepository = getRepository(Translation);
      let word: Word;
      word = await wordRepository.findOne(wordId);
      if (!word) {
        return res
          .status(400)
          .send(Util.formResponseObject('Word does not exist.', 4000));
      }

      let translationObject: Translation;
      translationObject = await translationRepository.findOne(translationId);
      if (!translationObject) {
        return res
          .status(400)
          .send(Util.formResponseObject('Translation does not exist.', 4000));
      }

      translationObject.translation = translation;

      const savedTranslation = await translationRepository.save(
        translationObject
      );

      word.translations = await translationRepository.find({
        where: { wordId: word.id },
      });

      res.status(200).send(Util.formResponseObject(word));
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };

  static deleteTranslation = async (req: Request, res: Response) => {
    try {
      const { wordId, translationId } = req.params;

      const wordRepository = getRepository(Word);
      const translationRepository = getRepository(Translation);
      let word: Word;
      word = await wordRepository.findOne(wordId);
      if (!word) {
        return res
          .status(400)
          .send(Util.formResponseObject('Word does not exist.', 4000));
      }

      let translationObject: Translation;
      translationObject = await translationRepository.findOne(translationId);
      if (!translationObject) {
        return res
          .status(400)
          .send(Util.formResponseObject('Translation does not exist.', 4000));
      }

      console.log(translationObject, translationId);
      await translationRepository.delete(translationId);

      word.translations = await translationRepository.find({
        where: { wordId: word.id },
      });

      res.status(200).send(Util.formResponseObject(word));
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  };
}
