// import React, { useState } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, {useRef, useState} from 'react';
import Editor from "../../Editor.jsx";
// import Editor from './Editor';

const Delta = Quill.import('delta');


export default function QuillRichTextEditor({value, setValue}) {
    // const [value, setValue] = useState('');
    // console.log(value)
    const modules = {
        toolbar: [
            [{font: []}],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            ["bold", "italic", "underline", "strike"],
            [{color: []}, {background: []}],
            [{script: "sub"}, {script: "super"}],
            ["blockquote", "code-block"],
            [{list: "ordered"}, {list: "bullet"}],
            [{indent: "-1"}, {indent: "+1"}, {align: []}],
            ["link", "image", "video"],
            ["clean"],
        ],
    };
    // const quill = new Quill(container);

    // const [range, setRange] = useState();
    // const [lastChange, setLastChange] = useState();
    // const [readOnly, setReadOnly] = useState(false);
    //
    // // Use a ref to access the quill instance directly
    // const quillRef = useRef();

    return (
        <div>
            <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue}
                        placeholder="Content goes here..."/>
            <p>{value}</p>
            <div>
                {/*{Parser().parse(model)}*/}
                value
                <div dangerouslySetInnerHTML={{__html: value}}></div>
            </div>
        </div>
    );

    // return (
    //     <div>
    //         <Editor
    //             ref={quillRef}
    //             readOnly={readOnly}
    //             defaultValue={new Delta()
    //                 .insert('Hello')
    //                 .insert('\n', { header: 1 })
    //                 .insert('Some ')
    //                 .insert('initial', { bold: true })
    //                 .insert(' ')
    //                 .insert('content', { underline: true })
    //                 .insert('\n')}
    //
    //             onSelectionChange={setRange}
    //             onTextChange={setLastChange}
    //         />
    //         <div className="controls">
    //             <label>
    //                 Read Only:{' '}
    //                 <input
    //                     type="checkbox"
    //                     value={readOnly}
    //                     onChange={(e) => setReadOnly(e.target.checked)}
    //                 />
    //             </label>
    //             <button
    //                 className="controls-right"
    //                 type="button"
    //                 onClick={() => {
    //                     alert(quillRef.current?.getLength());
    //                 }}
    //             >
    //                 Get Content Length
    //             </button>
    //         </div>
    //         <div className="state">
    //             <div className="state-title">Current Range:</div>
    //             {range ? JSON.stringify(range) : 'Empty'}
    //         </div>
    //         <div className="state">
    //             <div className="state-title">Last Change:</div>
    //             {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
    //         </div>
    //     </div>
    // );
}
