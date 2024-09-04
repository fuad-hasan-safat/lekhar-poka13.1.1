// components/custom-editor.js

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
// import Editor from '../ckeditor5/src/ckeditor'

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
       
        'blockQuote',
      
        'mediaEmbed',
        'undo',
        'redo'
    ]
};

function CustomEditor( props ) {
        return (
            <CKEditor
                editor={ Editor }
                config={ editorConfiguration }
                data={ props.initialData }
                onChange={ (event, editor ) => {
                    const data = editor.getData();
                    props.setContent(data);
                    console.log( { event, editor, data } );
                } }

            
            />
        )
}

export default CustomEditor;
