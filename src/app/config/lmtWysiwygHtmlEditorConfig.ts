import { AngularEditorConfig } from '@kolkov/angular-editor';

export const lmtWysiwygHtmlEditorConfig: AngularEditorConfig = {
    editable:                   true,
    spellcheck:                 true,
    height:                     '15rem',
    minHeight:                  '5rem',
    translate:                  'no',
    defaultParagraphSeparator:  'p',
    defaultFontName:            'Arial',
    customClasses: [
        { name: 'quote',        class: 'quote'                  },
        { name: 'redText',      class: 'redText'                },
        { name: 'titleText',    class: 'titleText', tag: 'h1'   }
    ]
};
