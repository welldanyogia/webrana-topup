import FroalaEditor from 'react-froala-wysiwyg'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
export default function DescBrandEditor() {


    return (
        <div id="editor">
            <FroalaEditor
                tag='textarea'
                // config={this.config}
                // model={this.state.model}
            />
        </div>
    )
}
