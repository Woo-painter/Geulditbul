import { Mark, mergeAttributes } from "@tiptap/core";

export const SpellErrorMark = Mark.create({
  name: "spellError",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-spell-error]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-spell-error": "true",
        class: "spell-error",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setSpellError:
        (from, to) =>
        ({ commands }) => {
          return commands.setMark(this.name, {}, { from, to });
        },
      removeSpellError:
        (from, to) =>
        ({ commands }) => {
          return commands.unsetMark(this.name, { from, to });
        },
      clearAllSpellErrors:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
