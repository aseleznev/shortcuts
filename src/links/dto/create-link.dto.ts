export class CreateLinkDto {
  constructor(init) {
    this.shortLink = init.shortLink || null;
    this.longLink = init.longLink || null;
  }
  readonly longLink: string;
  readonly shortLink: string;
}
