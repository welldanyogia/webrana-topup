
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

import PropTypes from 'prop-types'
import { useRef } from "react"

const Editor = ({ value, setValue,toolbar = true,readOnly }) => {

    const editorRef = useRef(null)
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' },
                {'align': []},],
            [{ 'font': [] }, ],
            [{ 'script': 'sub' },{'script':'super' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'align','font','script',
        'color', 'background',
        'link', 'image',
        'clean'
    ]

    const handleChange = () => {
        if (editorRef.current) {
            const editor = editorRef.current.getEditor()
            const html = editor.root.innerHTML
            setValue(html)

        }
    }

    return (
        <ReactQuill
            ref={editorRef}
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={toolbar ? modules : {toolbar:false}}
            formats={formats}
            className="w-full h-fit bg-slate-500/30"
            placeholder="Write something awesome..."
            readOnly={readOnly}


        />

    )
}

Editor.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    readOnly: PropTypes.bool,
    toolbar: PropTypes.bool
}

export default Editor
