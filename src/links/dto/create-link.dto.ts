export class CreateLinkDto {
  constructor(init) {
    this.shortLink = init.shortLink;
    this.longLink = init.shortLink;
  }
  longLink: string;
  shortLink: string;
}
