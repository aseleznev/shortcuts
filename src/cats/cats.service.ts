import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  root(): string {
    return 'Hello Kitty!';
  }
}
