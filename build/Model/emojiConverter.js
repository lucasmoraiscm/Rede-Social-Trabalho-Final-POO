"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiConverter = void 0;
class EmojiConverter {
    constructor(emoji) {
        this.emoji = '';
        if (emoji && EmojiConverter.isValidEmoji(emoji)) {
            this.emoji = emoji;
        }
    }
    getEmoji() {
        return this.emoji;
    }
    setEmoji(emoji) {
        this.emoji = emoji;
    }
    lerEmoji() {
        return EmojiConverter.EMOJIS;
    }
    toString() {
        return this.emoji;
    }
    static isValidEmoji(emoji) {
        return EmojiConverter.EMOJIS.includes(emoji);
    }
}
exports.EmojiConverter = EmojiConverter;
EmojiConverter.EMOJIS = [
    "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
    "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤔",
    "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯",
    "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓",
    "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟"
];
