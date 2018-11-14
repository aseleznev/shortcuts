import { Injectable } from '@nestjs/common';
import { query } from '../db/index';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  getOne(id: string): string {
    return 'getting one link';
  }

  checkShortLinkAvailability(newLink: CreateLinkDto): Promise<any> {
    return new Promise((resolve, reject) => {
      if (newLink instanceof CreateLinkDto) {
        const queryText = 'select short_link from links where short_link = $1';

        query(queryText, [newLink.shortLink.trim()], (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            resolve(res);
          }
        });
      } else reject(new Error('неподдерживаемый тип параметра'));
    });
  }

  checkLongLinkAvailability(newLink: CreateLinkDto): Promise<any> {
    return new Promise((resolve, reject) => {
      if (newLink instanceof CreateLinkDto) {
        const queryText = 'select long_link from links where long_link = $1';

        query(queryText, [newLink.longLink.trim()], (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            resolve(res);
          }
        });
      } else reject(new Error('неподдерживаемый тип параметра'));
    });
  }

  async createLink(newLink: CreateLinkDto): Promise<any> {
    return Promise.all([this.checkLongLinkAvailability(newLink), this.checkShortLinkAvailability(newLink)])
      .then(values => {
        const longLinkQueryRes = values[0];
        const shortLinkQueryRes = values[1];
        if (longLinkQueryRes.rowCount === 0) {
          const shortLink = Buffer.from(newLink.longLink).toString('base64');

          newLink.shortLink = shortLink;

          const queryText = 'insert into links(long_link, short_link) values ($1, $2)';

          const params = [newLink.longLink.trim(), newLink.shortLink];

          query(queryText, params, (err, res) => {
            if (err) {
              console.log(err);
              return err;
            } else {
              console.log(res);
              return newLink;
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
