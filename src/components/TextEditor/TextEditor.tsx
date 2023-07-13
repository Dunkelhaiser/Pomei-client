import { EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
    faBold,
    faCode,
    faHeading,
    faItalic,
    faListOl,
    faListUl,
    faQuoteLeft,
    faRotateLeft,
    faRotateRight,
    faRulerHorizontal,
    faStrikethrough,
    faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Placeholder from "@tiptap/extension-placeholder";
import Styles from "./TextEditor.module.scss";
import "./TextEditor.scss";

const MenuBar = ({ editor, editable }: { editor: ReturnType<typeof useEditor>; editable?: boolean }) => {
    if (!editor) {
        return null;
    }
    if (!editable) {
        editor.setEditable(false);
        return null;
    }

    return (
        <div className={Styles.menu}>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faUnderline} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive("heading", { level: 3 }) ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faHeading} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faListUl} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faListOl} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faCode} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? Styles.active : ""}
            >
                <FontAwesomeIcon icon={faQuoteLeft} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <FontAwesomeIcon icon={faRulerHorizontal} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                <FontAwesomeIcon icon={faRotateLeft} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                <FontAwesomeIcon icon={faRotateRight} />
            </button>
        </div>
    );
};

interface Props {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
    editable?: boolean;
}

const TextEditor: React.FC<Props> = ({ content, onChange, placeholder, editable = true }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
            Underline,
            Placeholder.configure({
                placeholder,
                showOnlyWhenEditable: true,
            }),
        ],
        content,

        // eslint-disable-next-line @typescript-eslint/no-shadow
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (onChange) onChange(html);
        },
    });

    return (
        <div className={Styles.editor}>
            <MenuBar editor={editor} editable={editable} />
            <EditorContent editor={editor} className={Styles.editor_canvas} />
        </div>
    );
};

export default TextEditor;
