"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { Node, mergeAttributes, Extension } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import Youtube from '@tiptap/extension-youtube';
import CharacterCount from '@tiptap/extension-character-count';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Typography from '@tiptap/extension-typography';
import FontFamily from '@tiptap/extension-font-family';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Link as LinkIcon,
    Image as ImageIcon,
    Type,
    AlignCenter,
    AlignLeft,
    AlignRight,
    AlignJustify,
    Highlighter,
    Minus,
    Eraser,
    Link2Off,
    Table as TableIcon,
    Plus,
    X,
    Columns,
    Youtube as YoutubeIcon,
    CheckSquare,
    Superscript as SuperscriptIcon,
    Subscript as SubscriptIcon,
    Code,
    Expand,
    Minimize2,
    IndentDecrease,
    IndentIncrease,
    ListTree,
    Terminal,
    Sticker
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';
import IconChooser from './IconChooser';

const MaterialIcon = Node.create({
    name: 'materialIcon',
    group: 'inline',
    inline: true,
    selectable: true,
    atom: true,
    addAttributes() {
        return {
            name: {
                default: 'star',
            },
        };
    },
    parseHTML() {
        return [{
            tag: 'span.material-symbols-outlined',
            getAttrs: (element: HTMLElement | string) => {
                if (typeof element === 'string') return { name: 'star' };
                return { name: element.innerText };
            },
        }];
    },
    renderHTML({ HTMLAttributes, node }) {
        return ['span', mergeAttributes(HTMLAttributes, { class: 'material-symbols-outlined' }), node.attrs.name];
    },
});

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        setLineHeight: (lineHeight: string) => ReturnType,
        unsetLineHeight: () => ReturnType,
    }
}

const LineHeight = Extension.create({
    name: 'lineHeight',
    addOptions() {
        return {
            types: ['paragraph', 'heading'],
            defaultLineHeight: '1.6',
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: null,
                        parseHTML: element => element.style.lineHeight || null,
                        renderHTML: attributes => {
                            if (!attributes.lineHeight) return {};
                            return { style: `line-height: ${attributes.lineHeight}` };
                        },
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            setLineHeight: (lineHeight: string) => ({ commands }) => {
                return this.options.types.every((type: string) => commands.updateAttributes(type, { lineHeight }));
            },
            unsetLineHeight: () => ({ commands }) => {
                return this.options.types.every((type: string) => commands.resetAttributes(type, 'lineHeight'));
            },
        }
    },
});

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    /** Fixed height in pixels for the editor area when not in fullscreen (e.g. 520) */
    height?: number;
    /** Tailwind height classes to apply responsively when not in fullscreen, e.g. 'h-80 sm:h-96 md:h-[520px]' */
    heightClasses?: string;
}

const MenuBar = ({ editor, isFullscreen, setFullscreen }: { editor: any, isFullscreen: boolean, setFullscreen: (v: boolean) => void }) => {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [showIconChooser, setShowIconChooser] = useState(false);

    if (!editor) return null;

    const lineHeights = [
        { name: '1.0', value: '1' },
        { name: '1.2', value: '1.2' },
        { name: '1.5', value: '1.5' },
        { name: '1.6', value: '1.6' },
        { name: '1.8', value: '1.8' },
        { name: '2.0', value: '2.0' },
    ];

    const addTable = () => {
        try {
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        } catch (e) {
            console.error("Failed to insert table", e);
            editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
        }
    };

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addYoutubeVideo = () => {
        const url = window.prompt('Enter YouTube URL');
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: 640,
                height: 480,
            });
        }
    };

    const colors = [
        { name: 'Default', value: 'inherit' },
        { name: 'Primary', value: '#0D3E5C' },
        { name: 'Secondary', value: '#CC1F26' },
        { name: 'Success', value: '#10b981' },
        { name: 'Warning', value: '#f59e0b' },
        { name: 'Danger', value: '#ef4444' },
    ];

    const fonts = [
        { name: 'Fonts', value: 'inherit' },
        { name: 'Arial', value: 'Arial' },
        { name: 'Helvetica', value: 'Helvetica' },
        { name: 'Times New Roman', value: 'Times New Roman' },
        { name: 'Georgia', value: 'Georgia' },
        { name: 'Verdana', value: 'Verdana' },
        { name: 'Courier New', value: 'Courier New' },
        { name: 'Trebuchet MS', value: 'Trebuchet MS' },
        { name: 'Impact', value: 'Impact' },
        { name: 'Tahoma', value: 'Tahoma' },
        { name: 'Inter', value: 'Inter' },
        { name: 'Lexend', value: 'Lexend' },
        { name: 'Montserrat', value: 'Montserrat' },
        { name: 'Poppins', value: 'Poppins' },
        { name: 'Lora', value: 'Lora' },
        { name: 'JetBrains Mono', value: 'JetBrains Mono' },
    ];

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-xl sticky top-0 z-30">
            {/* History & View */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-30 transition-colors"
                >
                    <Undo size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-30 transition-colors"
                >
                    <Redo size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => setFullscreen(!isFullscreen)}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                    title="Fullscreen"
                >
                    {isFullscreen ? <Minimize2 size={16} /> : <Expand size={16} />}
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            {/* Formatting */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <Bold size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <Italic size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('underline') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <UnderlineIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('superscript') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <SuperscriptIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('subscript') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <SubscriptIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('highlight') ? 'bg-white shadow-sm text-yellow-600' : 'text-gray-600'}`}
                >
                    <Highlighter size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('code') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Inline Code"
                >
                    <Code size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('codeBlock') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Code Block"
                >
                    <Terminal size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            {/* Alignment */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <AlignRight size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            {/* Structure */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((level) => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: level as any }).run()}
                        className={`p-1.5 rounded hover:bg-gray-200 transition-colors text-xs font-bold ${editor.isActive('heading', { level: level }) ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    >
                        H{level}
                    </button>
                ))}
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            {/* Lists & Tasks */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <List size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <ListOrdered size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('taskList') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Task List"
                >
                    <CheckSquare size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            {/* Indentation */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                    disabled={!editor.can().liftListItem('listItem')}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-30 transition-colors"
                    title="Decrease Indent"
                >
                    <IndentDecrease size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                    disabled={!editor.can().sinkListItem('listItem')}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-30 transition-colors"
                    title="Increase Indent"
                >
                    <IndentIncrease size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            {/* Media */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={addLink}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('link') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <LinkIcon size={16} />
                </button>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowImageUploader(!showImageUploader)}
                        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${showImageUploader ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
                    >
                        <ImageIcon size={16} />
                    </button>
                    {showImageUploader && (
                        <div className="absolute top-full left-0 mt-2 z-50 bg-white p-4 rounded-xl border border-gray-200 shadow-2xl min-w-80">
                            <ImageUploader
                                value=""
                                onChange={(url) => {
                                    editor.chain().focus().setImage({ src: url }).run();
                                    setShowImageUploader(false);
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setShowIconChooser(!showIconChooser);
                            setShowImageUploader(false);
                        }}
                        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${showIconChooser ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                        title="Insert Icon"
                    >
                        <Sticker size={16} />
                    </button>
                    {showIconChooser && (
                        <div className="absolute top-full left-0 mt-2 z-50 bg-white p-4 rounded-xl border border-gray-200 shadow-2xl min-w-80">
                            <IconChooser
                                value=""
                                onChange={(icon) => {
                                    editor.chain().focus().insertContent({
                                        type: 'materialIcon',
                                        attrs: { name: icon },
                                    }).run();
                                    setShowIconChooser(false);
                                }}
                            />
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={addYoutubeVideo}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                    title="Embed YouTube"
                >
                    <YoutubeIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={addTable}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                >
                    <TableIcon size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            {/* Style Dropdowns */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border border-gray-200 rounded bg-white px-2 py-1">
                    <Type size={12} className="text-gray-400" />
                    <select
                        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                        className="text-[10px] uppercase tracking-tighter font-black bg-transparent outline-none cursor-pointer"
                        value={editor.getAttributes('textStyle').fontFamily || 'inherit'}
                    >
                        {fonts.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                    </select>
                </div>
                <select
                    onChange={(e) => e.target.value === 'inherit' ? editor.chain().focus().unsetColor().run() : editor.chain().focus().setColor(e.target.value).run()}
                    className="text-[10px] uppercase tracking-tighter font-black bg-white border border-gray-200 rounded px-2 py-1 outline-none"
                    value={editor.getAttributes('textStyle').color || 'inherit'}
                >
                    {colors.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                </select>

                <div className="flex items-center gap-1 border border-gray-200 rounded bg-white px-2 py-1">
                    <span className="material-symbols-outlined text-xs text-slate-400">format_line_spacing</span>
                    <select
                        onChange={(e) => editor.chain().focus().setLineHeight(e.target.value).run()}
                        className="text-[10px] uppercase tracking-tighter font-black bg-transparent outline-none cursor-pointer"
                        value={editor.getAttributes('paragraph').lineHeight || '1.6'}
                    >
                        {lineHeights.map(lh => <option key={lh.value} value={lh.value}>{lh.name}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default function RichTextEditor({ value, onChange, placeholder, height, heightClasses }: RichTextEditorProps) {
    const [isFullscreen, setFullscreen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
                heading: { levels: [1, 2, 3, 4] },
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Underline,
            TextStyle,
            Color,
            FontFamily,
            LineHeight,
            MaterialIcon,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-primary underline cursor-pointer' } }),
            Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full h-auto my-4 shadow-md mx-auto block' } }),
            Table.configure({ resizable: true, HTMLAttributes: { class: 'border-collapse table-auto w-full my-4 border border-slate-200' } }),
            TableRow, TableHeader, TableCell,
            Youtube.configure({ width: 640, height: 480, HTMLAttributes: { class: 'rounded-xl shadow-lg my-8 mx-auto max-w-full block' } }),
            CharacterCount,
            Subscript,
            Superscript,
            TaskList,
            TaskItem.configure({ nested: true }),
            Typography,
            Placeholder.configure({ placeholder: placeholder || 'Start writing...', })
        ],
        immediatelyRender: false,
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: `tiptap prose prose-slate prose-base lg:prose-lg focus:outline-none px-8 py-10 max-w-none text-slate-700 leading-relaxed h-full ${isFullscreen ? 'min-h-screen pt-24' : ''}`
            }
        }
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className={`
            border border-gray-200 transition-all bg-white shadow-sm
            ${isFullscreen ? 'fixed inset-0 z-100 overflow-y-auto rounded-none' : 'rounded-xl overflow-hidden'}
        `}>
            <MenuBar editor={editor} isFullscreen={isFullscreen} setFullscreen={setFullscreen} />

            {editor && (
                <BubbleMenu editor={editor}>
                    <div className="flex items-center gap-0.5 bg-slate-900 text-white p-1 rounded-lg border border-slate-800 shadow-xl overflow-hidden">
                        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'text-primary' : ''}`}><Bold size={14} /></button>
                        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'text-primary' : ''}`}><Italic size={14} /></button>
                        <button type="button" onClick={() => editor.chain().focus().toggleLink().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('link') ? 'text-primary' : ''}`}><LinkIcon size={14} /></button>
                        <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('highlight') ? 'text-primary' : ''}`}><Highlighter size={14} /></button>
                    </div>
                </BubbleMenu>
            )}

            <div className={`relative bg-white overflow-y-auto ${!isFullscreen ? (heightClasses || 'h-[500px]') : ''}`} style={isFullscreen ? undefined : (height && !heightClasses ? { height: `${height}px` } : undefined)}>
                <EditorContent editor={editor} className="h-full" />
            </div>

            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex gap-4">
                    <span>{editor?.storage.characterCount.words()} Words</span>
                    <span>{editor?.storage.characterCount.characters()} Characters</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="size-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    Synced
                </div>
            </div>

            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); float: left; color: #adb5bd; pointer-events: none; height: 0; }
                .tiptap { outline: none !important; }
                
                /* Syncing Tiptap with Frontend Prose */
                .tiptap h1 { font-size: 2.25rem !important; font-weight: 700 !important; margin-top: 2rem !important; margin-bottom: 1rem !important; line-height: 1.2 !important; }
                .tiptap h2 { font-size: 1.875rem !important; font-weight: 700 !important; margin-top: 1.75rem !important; margin-bottom: 0.75rem !important; line-height: 1.2 !important; }
                .tiptap h3 { font-size: 1.5rem !important; font-weight: 700 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important; line-height: 1.2 !important; }
                .tiptap h4 { font-size: 1.25rem !important; font-weight: 700 !important; margin-top: 1.25rem !important; margin-bottom: 0.5rem !important; line-height: 1.2 !important; }
                
                .tiptap p { margin-top: 1.25em !important; margin-bottom: 1.25em !important; line-height: 1.6 !important; }
                
                .tiptap blockquote { border-left: 4px solid #0D3E5C !important; padding: 1rem 1.5rem !important; font-style: italic !important; color: #475569 !important; background: rgba(13, 62, 92, 0.05) !important; border-radius: 0 0.75rem 0.75rem 0; margin: 2rem 0 !important; }
                .tiptap ul[data-type="taskList"] { list-style: none !important; padding: 0 !important; }
                .tiptap ul[data-type="taskList"] li { display: flex !important; align-items: flex-start !important; margin-bottom: 0.5rem !important; }
                .tiptap ul[data-type="taskList"] li > label { margin-right: 0.75rem !important; user-select: none !important; padding-top: 0.25rem !important; }
                .tiptap ul[data-type="taskList"] li > div { flex: 1 !important; }
                .tiptap ul:not([data-type="taskList"]) { list-style-type: disc !important; padding-left: 1.5rem !important; margin: 1rem 0 !important; }
                .tiptap ol { list-style-type: decimal !important; padding-left: 1.5rem !important; margin: 1rem 0 !important; }
                .tiptap ul li, .tiptap ol li { margin-bottom: 0.25rem !important; }
                .tiptap ul li p, .tiptap ol li p { margin: 0 !important; }
                
                .tiptap code { background-color: #f1f5f9 !important; color: #0D3E5C !important; padding: 0.2rem 0.4rem !important; border-radius: 0.25rem !important; font-size: 0.85em !important; }
                .tiptap pre { background: #0f172a !important; color: #f8fafc !important; font-family: 'JetBrains Mono', monospace !important; padding: 1.5rem !important; border-radius: 0.75rem !important; margin: 2rem 0 !important; overflow-x: auto !important; border: 1px solid #1e293b; }
                .tiptap pre code { background: none !important; color: inherit !important; padding: 0 !important; font-size: 0.9rem !important; }
                
                .tiptap table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 2rem 0; overflow: hidden; border-radius: 0.75rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
                .tiptap td, .tiptap th { min-width: 1em; border: 1px solid #e2e8f0; padding: 1rem 0.75rem; vertical-align: top; box-sizing: border-box; position: relative; }
                .tiptap th { font-weight: bold; text-align: left; background-color: #f8fafc; }
                .tiptap iframe { border: 0; aspect-ratio: 16 / 9; width: 100%; height: auto; border-radius: 1rem; }
            `}</style>
        </div>
    );
}
