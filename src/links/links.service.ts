import { Injectable } from '@nestjs/common';
import { query } from '../db/index';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  getOne(shortLink: string): Promise<CreateLinkDto> {
    return new Promise((resolve, reject) => {
      const queryText = 'select short_link, long_link from links where short_link = $1';

      query(queryText, [shortLink], (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(res.long_link);
          resolve(new CreateLinkDto({ shortLink: res.rows[0].short_link, longLink: res.rows[0].long_link }));
        }
      });
    });
  }

  checkLinkAvailability(newLink: CreateLinkDto): Promise<any> {
    return new Promise((resolve, reject) => {
      if (newLink.longLink) {
        const queryText = 'select short_link, long_link from links where long_link = $1';
        query(queryText, [newLink.longLink.trim()], (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('long link:');
            console.log(res);
            if (res.rowCount > 0) {
              resolve(new CreateLinkDto({ shortLink: res.rows[0].short_link, longLink: res.rows[0].long_link }));
            } else {
              resolve(new CreateLinkDto({ shortLink: null, longLink: null }));
            }
          }
        });

        // } else {
        //   resolve({ shortLink: null, longLink: null });
        // }
      }
    });
  }

  createLink(newLink: CreateLinkDto): Promise<CreateLinkDto> {
    return this.checkLinkAvailability(newLink)
      .then(result => {
        if (result.shortLink) {
          const queryText = 'DELETE FROM links WHERE links.long_link = $1';
          query(queryText, [newLink.longLink], err => {
            if (err) {
              console.log(err);
              return err.message;
            }
          });
        }

        const shortLink = Buffer.from(newLink.longLink).toString('base64');

        const returnLink = new CreateLinkDto({ longLink: newLink.longLink, shortLink });

        const queryText = 'insert into links(long_link, short_link) values ($1, $2)';
        const params = [newLink.longLink, shortLink];
        query(queryText, params, (err, res) => {
          if (err) {
            console.log(err);
            return err.message;
          }
        });

        return returnLink;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
