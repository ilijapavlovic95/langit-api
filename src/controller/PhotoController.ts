import { Photo } from './../entity/Photo';
import { getRepository, Double } from 'typeorm';
import { Request } from 'express-serve-static-core';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { Location } from '../entity/Location';
import { validate } from 'class-validator';

export class PhotoController {
  static newPhoto = async (req: Request, res: Response) => {
    // get file extension
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    // get parameters from body
    let { title, description } = req.body;
    let reqLocation: {
      name: string;
      address: string;
      lat: Double;
      lng: Double;
      type: string;
    } = req.body.location;

    let photo = new Photo();
    photo.title = title;
    photo.generateFilename(fileExt);

    const location = new Location();
    location.name = reqLocation.name;
    location.lat = reqLocation.lat;
    location.lng = reqLocation.lng;
    location.type = reqLocation.type;
    location.address = reqLocation.address;
    photo.location = location;

    //Validate if the parameters are ok
    const errors = await validate(photo);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // saving photo to file system
    const tempPath = req.file.path;
    let targetPath = path.join(
      __dirname,
      'public',
      res.locals.jwtPayload.userId
    );

    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath);
    }
    targetPath = path.join(targetPath, photo.filename);

    if (['png', 'jpg', 'jpeg'].includes(fileExt)) {
      fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(400).send('Error!');
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return res.status(400).send('Error!');
      });
    }

    const photoRepository = getRepository(Photo);
    try {
      await photoRepository.save(photo);
    } catch (error) {
      return res.status(400).send('Error on saving new photo.');
    }

    res.status(200).send('Photo saved.');
  };
}
