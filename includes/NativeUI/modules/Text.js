import game from 'natives';
import Color from "../utils/Color.js";
import Point from "../utils/Point.js";
import IElement from "./IElement.js";
export default class Text extends IElement {
    constructor(caption, pos, scale, color, font, centered) {
        super();
        this.Caption = caption;
        this.Pos = pos;
        this.Scale = scale;
        this.Color = color || new Color(255, 255, 255, 255);
        this.Font = font || 0;
        this.Centered = centered || false;
    }
    Draw(caption, pos, scale, color, font, centered) {
        if (caption && !pos && !scale && !color && !font && !centered) {
            pos = new Point(this.Pos.X + caption.Width, this.Pos.Y + caption.Height);
            scale = this.Scale;
            color = this.Color;
            font = this.Font;
            centered = this.Centered;
        }
        const x = pos.X / 1280.0;
        const y = pos.Y / 720.0;
        game.setTextFont(parseInt(font));
        game.setTextScale(scale, scale);
        game.setTextColour(color.R, color.G, color.B, color.A);
        game.setTextCentre(centered);
        game.beginTextCommandDisplayText("STRING");
        Text.AddLongString(caption);
        game.endTextCommandDisplayText(x, y, 0);
    }
    static AddLongString(text) {
        if (!text.length)
            return;
        const maxStringLength = 99;
        const splittedArrayOfStrings = [];
        let i = 0;
        let position;
        let next;
        let currentText;
        while (i < text.length) {
            next = (i + maxStringLength) > text.length ? text.length : i + maxStringLength;
            position = next;
            currentText = text.substring(i, position);
            if (((currentText.match(/~/g) || []).length % 2) !== 0 && (i + maxStringLength) <= text.length) {
                position = currentText.lastIndexOf('~');
                currentText = text.substring(i, i + position);
                i = i + position;
            }
            else {
                i = next;
            }
            splittedArrayOfStrings.push(currentText);
        }
        for (const str of splittedArrayOfStrings) {
            game.addTextComponentSubstringPlayerName(str);
        }
    }
}
export { Text };
