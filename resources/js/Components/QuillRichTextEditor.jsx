import React, { useRef, useState } from 'react';

import Quill from 'quill';
import Editor from "../../Editor.jsx";

const Delta = Quill.import('delta');

const QuillRichTextEditor = ({value,setValue}) => {
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);

    // Use a ref to access the quill instance directly
    const quillRef = useRef();

    return (
        <div>
            <Editor value={value} setValue={setValue} readOnly={false} />
            {/*<Editor value={value} toolbar={false} setValue={() => { }} readOnly={true} />*/}
        </div>
    );
};

export default QuillRichTextEditor;
