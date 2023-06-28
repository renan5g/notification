export class Content {
  private readonly content: string;

  private constructor(content: string) {
    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private static validate(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  static create(content: string) {
    const isContentValid = this.validate(content);

    if (!isContentValid) {
      throw new Error('Content length error.');
    }

    return new Content(content);
  }
}
