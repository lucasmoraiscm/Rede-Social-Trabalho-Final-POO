export class EmojiConverter {
  private emoji: string = '';
  private static readonly EMOJIS: string[] = [
    "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
    "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤔",
    "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯",
    "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓",
    "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟"
  ];

  constructor(emoji?: string) {
    if (emoji && EmojiConverter.isValidEmoji(emoji)) {
      this.emoji = emoji;
    }
  }

  public getEmoji(): string {
    return this.emoji;
  }

  public setEmoji(emoji: string): void {
    this.emoji = emoji;
  }

  public lerEmoji() : string[] {
    return EmojiConverter.EMOJIS;
  }

  public toString(): string {
    return this.emoji;
  }

  private static isValidEmoji(emoji: string): boolean {
    return EmojiConverter.EMOJIS.includes(emoji);
  }
}