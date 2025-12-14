declare module 'bibtex-parse' {
  interface BibtexField {
    name: string;
    value: string;
  }

  interface BibtexEntry {
    itemtype: string;
    type?: string;
    key?: string;
    fields?: BibtexField[];
  }

  export function parse(bibtex: string): BibtexEntry[];
}
