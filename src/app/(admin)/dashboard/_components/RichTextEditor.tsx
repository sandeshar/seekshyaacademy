"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor, EditorContent, type Editor as TiptapEditor } from '@tiptap/react';
import { Node, mergeAttributes, Extension, type RawCommands, type CommandProps } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
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
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

const Iframe = Node.create({
    name: 'iframe',
    group: 'block',
    selectable: true,
    draggable: true,
    atom: true,
    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: '100%',
            },
            height: {
                default: '520',
            },
            frameborder: {
                default: '0',
            },
            allow: {
                default: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            },
            allowfullscreen: {
                default: 'true',
            },
            class: {
                default: 'w-full rounded-xl block border-0',
            },
            style: {
                default: 'border: 0; min-height: 520px;',
            }
        }
    },
    parseHTML() {
        return [{
            tag: 'iframe',
            getAttrs: (element: HTMLElement | string) => {
                if (typeof element === 'string') return {};
                return {
                    src: element.getAttribute('src'),
                    width: element.getAttribute('width'),
                    height: element.getAttribute('height'),
                    frameborder: element.getAttribute('frameborder'),
                    allow: element.getAttribute('allow'),
                    allowfullscreen: element.getAttribute('allowfullscreen'),
                    style: element.getAttribute('style'),
                }
            }
        }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', { class: 'iframe-wrapper relative overflow-hidden rounded-2xl border border-slate-100 shadow-xl my-10 mx-auto max-w-5xl' },
            ['iframe', mergeAttributes(HTMLAttributes, { class: 'w-full block border-0' })]
        ]
    },
    addCommands() {
        return {
            setIframe: (options: Record<string, unknown>) => ({ commands }: CommandProps) => {
                return (commands as any).insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        } as Partial<RawCommands>
    },
});

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Type,
    AlignCenter,
    AlignLeft,
    AlignRight,
    AlignJustify,
    Highlighter,
    Minus,
    Table as TableIcon,
    Columns as ColumnsIcon,
    Youtube as YoutubeIcon,
    CheckSquare,
    Superscript as SuperscriptIcon,
    Subscript as SubscriptIcon,
    Code,
    Expand,
    Minimize2,
    Terminal,
    Sticker,
    MonitorPlay,
    AlignVerticalDistributeCenter,
    AlignVerticalDistributeEnd,
    AlignVerticalDistributeStart,
    ChevronDownSquare,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';
import IconChooser from './IconChooser';

const RawHTML = Node.create({
    name: 'rawHtml',
    group: 'block',
    selectable: true,
    draggable: true,
    atom: true,
    addAttributes() {
        return {
            html: {
                default: null,
            }
        }
    },
    parseHTML() {
        return [{
            tag: 'div[data-type="raw-html"]',
            getAttrs: (element: HTMLElement | string) => {
                if (typeof element === 'string') return {};
                const el = element as HTMLElement;
                const attr = el.getAttribute('data-html');
                if (attr) {
                    try {
                        return { html: decodeURIComponent(attr) };
                    } catch {
                        return { html: attr };
                    }
                }
                return { html: el.innerHTML };
            }
        }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', {
            'data-type': 'raw-html',
            class: 'raw-html-wrapper my-8',
            'data-html': encodeURIComponent(HTMLAttributes.html || '')
        }]
    },
    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement('div');
            dom.classList.add('raw-html-editor-preview', 'p-6', 'bg-slate-900/5', 'border-2', 'border-dashed', 'border-slate-200', 'rounded-2xl', 'text-slate-400', 'text-center', 'my-8');
            dom.innerHTML = `<div class="flex flex-col items-center gap-2">
                <span class="material-symbols-outlined text-3xl">code</span>
                <div class="text-[10px] font-black uppercase tracking-widest">Custom HTML Embed</div>
                <div class="text-[9px] font-medium opacity-60 max-w-50 truncate">${(node.attrs.html as string)?.substring(0, 50)}...</div>
            </div>`;
            return {
                dom,
            };
        };
    },
    addCommands() {
        return {
            setRawHtml: (html: string) => ({ commands }: CommandProps) => {
                return (commands as any).insertContent({
                    type: this.name,
                    attrs: { html },
                })
            },
        } as Partial<RawCommands>
    },
});

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
                return { name: (element as HTMLElement).innerText };
            },
        }];
    },
    renderHTML({ HTMLAttributes, node }) {
        return ['span', mergeAttributes(HTMLAttributes, { class: 'material-symbols-outlined' }), node.attrs.name as string];
    },
});

const ColumnsContainer = Node.create({
    name: 'columnsContainer',
    group: 'block',
    content: 'column+',
    addAttributes() {
        return {
            count: {
                default: 2,
            },
        };
    },
    parseHTML() {
        return [{ tag: 'div.editor-columns' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { class: 'editor-columns flex gap-8 my-6' }), 0];
    },
});

const Column = Node.create({
    name: 'column',
    content: 'block+',
    addAttributes() {
        return {
            width: {
                default: '1fr',
            },
            backgroundColor: {
                default: null,
                parseHTML: element => element.style.backgroundColor || element.getAttribute('data-background-color'),
                renderHTML: attributes => {
                    if (!attributes.backgroundColor) return {};
                    return {
                        'data-background-color': attributes.backgroundColor,
                        style: `background-color: ${attributes.backgroundColor} !important; padding: 1.5rem; border-radius: 0.75rem;`
                    };
                },
            },
            borderColor: {
                default: null,
                parseHTML: element => element.style.borderColor || element.getAttribute('data-border-color'),
                renderHTML: attributes => {
                    if (!attributes.borderColor) return {};
                    return {
                        'data-border-color': attributes.borderColor,
                        style: `border: 2px solid ${attributes.borderColor} !important; padding: 1.5rem; border-radius: 0.75rem; border-style: solid !important;`
                    };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'div.editor-column' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { class: 'editor-column flex-1 min-w-0' }), 0];
    },
});

const CollapsibleSummary = Node.create({
    name: 'collapsibleSummary',
    content: 'text*',
    marks: '',
    defining: true,
    isolating: true,
    addAttributes() {
        return {
            icon: {
                default: 'help',
            },
        };
    },
    parseHTML() {
        return [{ tag: 'summary' }]
    },
    renderHTML({ HTMLAttributes, node }) {
        return ['summary', mergeAttributes(HTMLAttributes, { class: 'collapsible-summary flex items-center gap-4 px-6 py-5 text-lg font-black tracking-tight text-slate-900 cursor-pointer select-none bg-gradient-to-r from-white via-white to-slate-50 list-none border-b border-transparent' }),
            ['span', { class: 'material-symbols-outlined collapsible-icon' }, node.attrs.icon || 'help'],
            ['span', { class: 'flex-1 min-w-0 text-slate-900' }, 0],
            ['span', { class: 'material-symbols-outlined dropdown-arrow ml-auto' }, 'expand_more']
        ]
    },
});

const CollapsibleContent = Node.create({
    name: 'collapsibleContent',
    content: 'block+',
    defining: true,
    isolating: true,
    parseHTML() {
        return [{ tag: 'div.collapsible-content' }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { class: 'collapsible-content px-6 pb-6 pt-3 bg-white min-h-[50px] text-slate-600 border-t border-slate-100' }), 0]
    },
});

const Collapsible = Node.create({
    name: 'collapsible',
    group: 'block',
    content: 'collapsibleSummary collapsibleContent',
    selectable: true,
    draggable: true,
    allowGapCursor: true,
    defining: true,
    isolating: true,
    addAttributes() {
        return {
            open: {
                default: false,
                parseHTML: element => element.hasAttribute('open'),
                renderHTML: attributes => {
                    if (attributes.open) {
                        return { open: '' }
                    }
                    return {}
                }
            }
        }
    },
    parseHTML() {
        return [{ tag: 'details.collapsible' }]
    },
    renderHTML({ HTMLAttributes, node }) {
        const { open, ...rest } = HTMLAttributes;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = open;
        return ['details', mergeAttributes(rest, {
            class: 'collapsible group border border-slate-200/80 rounded-[1.75rem] overflow-hidden my-6 bg-white shadow-sm',
            ...(node.attrs.open ? { open: '' } : {})
        }), 0]
    },
    addCommands() {
        return {
            setCollapsible: () => ({ commands }: CommandProps) => {
                return (commands as any).insertContent({
                    type: 'collapsible',
                    attrs: { open: false },
                    content: [
                        { type: 'collapsibleSummary', content: [{ type: 'text', text: 'Dropdown Title' }] },
                        { type: 'collapsibleContent', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Enter shared content here...' }] }] },
                    ],
                })
            },
            deleteCollapsible: () => ({ commands }: CommandProps) => {
                return (commands as any).deleteNode('collapsible')
            },
        } as Partial<RawCommands>
    },
});

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        setListPrefix: (prefix: string | null) => ReturnType,
        unsetListPrefix: () => ReturnType,
        setListStyle: (style: string) => ReturnType,
        unsetListStyle: () => ReturnType,
        setLineHeight: (lineHeight: string) => ReturnType,
        unsetLineHeight: () => ReturnType,
        insertColumns: (count: number) => ReturnType,
        setIframe: (options: { src: string | null, width?: string, height?: string, frameborder?: string, allow?: string, allowfullscreen?: string, style?: string }) => ReturnType,
        setVerticalAlign: (align: string) => ReturnType,
        unsetVerticalAlign: () => ReturnType,
        addColumn: () => ReturnType,
        deleteColumn: () => ReturnType,
        setCollapsible: () => ReturnType,
        deleteCollapsible: () => ReturnType,
        setRawHtml: (html: string) => ReturnType,
        setFontSize: (fontSize: string | null) => ReturnType,
        unsetFontSize: () => ReturnType,
    }
}

const VerticalAlign = Extension.create({
    name: 'verticalAlign',
    addOptions() {
        return {
            types: ['paragraph', 'heading', 'column'],
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    verticalAlign: {
                        default: null,
                        parseHTML: element => element.style.display === 'flex' ? element.style.alignItems : null,
                        renderHTML: attributes => {
                            if (!attributes.verticalAlign) return {};
                            return {
                                style: `display: flex !important; flex-direction: column; justify-content: ${attributes.verticalAlign === 'center' ? 'center' : attributes.verticalAlign === 'end' ? 'flex-end' : 'flex-start'}`,
                            };
                        },
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            setVerticalAlign: (verticalAlign: string) => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).updateAttributes(type, { verticalAlign }));
            },
            unsetVerticalAlign: () => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).resetAttributes(type, 'verticalAlign'));
            },
        } as Partial<RawCommands>
    },
});

const ColumnsExtension = Extension.create({
    name: 'columnsExtension',
    addCommands() {
        return {
            insertColumns: (count: number) => ({ commands }: CommandProps) => {
                return (commands as any).insertContent({
                    type: 'columnsContainer',
                    attrs: { count },
                    content: Array.from({ length: count }).map(() => ({
                        type: 'column',
                        content: [{ type: 'paragraph' }],
                    })),
                });
            },
            addColumn: () => ({ commands, state }: CommandProps) => {
                return (commands as any).insertContentAt(
                    state.selection.to,
                    { type: 'column', content: [{ type: 'paragraph' }] }
                );
            },
            deleteColumn: () => ({ commands }: CommandProps) => {
                return (commands as any).deleteNode('column');
            }
        } as Partial<RawCommands>
    },
});

const ListPrefix = Extension.create({
    name: 'listPrefix',
    addOptions() {
        return {
            types: ['bulletList', 'orderedList'],
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    prefix: {
                        default: null,
                        parseHTML: element => element.getAttribute('data-prefix'),
                        renderHTML: attributes => {
                            if (!attributes.prefix) return {};
                            return {
                                'data-prefix': attributes.prefix,
                                style: `--list-prefix: "${attributes.prefix}"`,
                                class: 'custom-prefix-list'
                            };
                        },
                    },
                    listStyle: {
                        default: null,
                        parseHTML: element => element.style.listStyleType || element.getAttribute('data-list-style'),
                        renderHTML: attributes => {
                            if (!attributes.listStyle) return {};
                            return {
                                'data-list-style': attributes.listStyle,
                                style: `list-style-type: ${attributes.listStyle} !important`,
                                class: 'custom-style-list'
                            };
                        },
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            setListPrefix: (prefix: string | null) => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).updateAttributes(type, { prefix, listStyle: null }));
            },
            unsetListPrefix: () => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).resetAttributes(type, 'prefix'));
            },
            setListStyle: (listStyle: string) => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).updateAttributes(type, { listStyle, prefix: null }));
            },
            unsetListStyle: () => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).resetAttributes(type, 'listStyle'));
            },
        } as Partial<RawCommands>
    },
});

const LineHeight = Extension.create({
    name: 'lineHeight',
    addOptions() {
        return {
            types: ['paragraph', 'heading', 'blockquote'],
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
            setLineHeight: (lineHeight: string) => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).updateAttributes(type, { lineHeight }));
            },
            unsetLineHeight: () => ({ commands }: CommandProps) => {
                return (this.options.types as string[]).every((type: string) => (commands as any).resetAttributes(type, 'lineHeight'));
            },
        } as Partial<RawCommands>
    },
});

const FontSize = Extension.create({
    name: 'fontSize',
    addGlobalAttributes() {
        return [
            {
                types: ['textStyle'],
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize || null,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) return {};
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string | null) => ({ commands }: CommandProps) => {
                if ((commands as any).setTextStyle) {
                    return (commands as any).setTextStyle({ fontSize });
                }
                if ((commands as any).setMark) {
                    return (commands as any).setMark('textStyle', { fontSize });
                }
                return false;
            },
            unsetFontSize: () => ({ commands }: CommandProps) => {
                if ((commands as any).setTextStyle) {
                    return (commands as any).setTextStyle({ fontSize: null });
                }
                if ((commands as any).setMark) {
                    return (commands as any).setMark('textStyle', { fontSize: null });
                }
                return false;
            },
        } as Partial<RawCommands>
    },
});

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    height?: number;
    heightClasses?: string;
}

const MenuBar = ({ editor, isFullscreen, setFullscreen }: { editor: TiptapEditor | null, isFullscreen: boolean, setFullscreen: (v: boolean) => void }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_prefixColor, _setPrefixColor] = useState('#0D3E5C');

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--tiptap-prefix-color', _prefixColor);
        }
    }, [_prefixColor]);

    const [showImageUploader, setShowImageUploader] = useState(false);
    const [showIconChooser, setShowIconChooser] = useState(false);
    const [pickerColor, setPickerColor] = useState('#000000');

    useEffect(() => {
        if (!editor) return;
        const updateColorPicker = () => {
            const c = editor.getAttributes('textStyle').color;
            if (typeof c === 'string' && /^#([0-9a-f]{3}){1,2}$/i.test(c)) {
                setPickerColor(c);
            }
        };

        editor.on('selectionUpdate', updateColorPicker);
        updateColorPicker();
        return () => {
            editor.off('selectionUpdate', updateColorPicker);
        };
    }, [editor]);

    const lineHeights = [
        { name: '1.0', value: '1' },
        { name: '1.2', value: '1.2' },
        { name: '1.5', value: '1.5' },
        { name: '1.6', value: '1.6' },
        { name: '1.8', value: '1.8' },
        { name: '2.0', value: '2.0' },
    ];

    if (!editor) return null;

    const addTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
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
            (editor.commands as any).setYoutubeVideo({
                src: url,
                width: 640,
                height: 480,
            });
        }
    };

    const addEmbed = () => {
        const input = window.prompt('Paste HTML Tag (<iframe>, <div>, <script>... etc.)');
        if (!input) return;

        if (input.includes('<') && input.includes('>')) {
            if (input.includes('<iframe')) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(input, 'text/html');
                const iframe = doc.querySelector('iframe');

                if (iframe) {
                    const options = {
                        src: iframe.getAttribute('src'),
                        width: iframe.getAttribute('width') || '100%',
                        height: iframe.getAttribute('height') || '520',
                        frameborder: iframe.getAttribute('frameborder') || '0',
                        allow: iframe.getAttribute('allow') || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                        allowfullscreen: iframe.getAttribute('allowfullscreen') !== null ? 'true' : 'false',
                        style: iframe.getAttribute('style') || 'border: 0; min-height: 520px;',
                    };
                    return (editor.commands as any).setIframe(options);
                }
            }
            return (editor.commands as any).setRawHtml(input);
        }
        (editor.commands as any).setIframe({ src: input });
    };

    const _listPrefixes = [
        { name: 'Symbol', value: '' },
        { name: 'Check (✓)', value: '✓' },
        { name: 'Arrow (→)', value: '→' },
        { name: 'Star (★)', value: '★' },
        { name: 'Circle (○)', value: '○' },
        { name: 'Square (■)', value: '■' },
        { name: 'Diamond (◆)', value: '◆' },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ignore_listPrefixes = _listPrefixes;

    const applyFontSize = (fontSize: string | null) => {
        (editor.chain().focus() as any).setFontSize(fontSize).run();
    };

    const fontSizes = [
        { name: 'Size', value: 'inherit' },
        { name: '10', value: '10' },
        { name: '12', value: '12' },
        { name: '14', value: '14' },
        { name: '16', value: '16' },
        { name: '18', value: '18' },
        { name: '20', value: '20' },
        { name: '24', value: '24' },
        { name: '28', value: '28' },
        { name: '32', value: '32' },
        { name: 'Custom…', value: 'custom' },
    ];

    const getSelectFontSizeValue = (raw: string | null | undefined) => {
        if (!raw) return 'inherit';
        const matchPx = /^([0-9]+(?:\.[0-9]+)?)px$/i.exec(raw.trim());
        if (matchPx) {
            const numeric = matchPx[1];
            const allowed = fontSizes.map(f => f.value);
            return allowed.includes(numeric) ? numeric : 'custom';
        }
        return 'custom';
    };

    const _orderedStyles = [
        { name: 'Style', value: '' },
        { name: '1, 2, 3...', value: 'decimal' },
        { name: 'a, b, c...', value: 'lower-alpha' },
        { name: 'A, B, C...', value: 'upper-alpha' },
        { name: 'i, ii, iii...', value: 'lower-roman' },
        { name: 'I, II, III...', value: 'upper-roman' },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ignore_orderedStyles = _orderedStyles;

    const fonts = [
        { name: 'Fonts', value: 'inherit' },
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
                <div className="flex items-center gap-1 border border-gray-200 rounded bg-white px-2 py-1">
                    <Type size={12} className="text-gray-400" />
                    <select
                        onChange={(e) => {
                            const size = e.target.value;
                            if (size === 'custom') {
                                const raw = window.prompt('Enter a custom size (e.g. 18 or 18px or 1.2rem):');
                                if (!raw) return;
                                const trimmed = raw.trim();
                                const withUnit = /px|%|rem|em$/i.test(trimmed) ? trimmed : `${trimmed}px`;
                                applyFontSize(withUnit);
                                return;
                            }
                            const value = size === 'inherit' ? null : `${size}px`;
                            applyFontSize(value);
                        }}
                        className="text-[10px] uppercase tracking-tighter font-black bg-transparent outline-none cursor-pointer"
                        value={getSelectFontSizeValue(editor.getAttributes('textStyle').fontSize)}
                    >
                        {fontSizes.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
                    </select>
                </div>
                <input
                    type="color"
                    value={pickerColor}
                    onChange={(e) => {
                        setPickerColor(e.target.value);
                        editor.chain().focus().setColor(e.target.value).run();
                    }}
                    className="w-7 h-7 rounded border border-gray-200 p-0"
                    title="Pick text color"
                />

                <div className="flex items-center gap-1 border border-gray-200 rounded bg-white px-2 py-1">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">format_line_spacing</span>
                    <select
                        onChange={(e) => (editor.chain().focus() as any).setLineHeight(e.target.value).run()}
                        className="text-[10px] uppercase tracking-tighter font-black bg-transparent outline-none cursor-pointer"
                        value={editor.getAttributes('paragraph').lineHeight || '1.6'}
                    >
                        {lineHeights.map(lh => <option key={lh.value} value={lh.value}>{lh.name}</option>)}
                    </select>
                </div>
            </div>

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
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <AlignJustify size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => (editor.chain().focus() as any).setVerticalAlign('start').run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.getAttributes('paragraph').verticalAlign === 'start' || editor.getAttributes('column').verticalAlign === 'start' ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Align Top"
                >
                    <AlignVerticalDistributeStart size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => (editor.chain().focus() as any).setVerticalAlign('center').run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.getAttributes('paragraph').verticalAlign === 'center' || editor.getAttributes('column').verticalAlign === 'center' ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Align Center"
                >
                    <AlignVerticalDistributeCenter size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => (editor.chain().focus() as any).setVerticalAlign('end').run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.getAttributes('paragraph').verticalAlign === 'end' || editor.getAttributes('column').verticalAlign === 'end' ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Align Bottom"
                >
                    <AlignVerticalDistributeEnd size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

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

            <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    >
                        <List size={16} />
                    </button>
                </div>
                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    >
                        <ListOrdered size={16} />
                    </button>
                </div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('taskList') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Task List"
                >
                    <CheckSquare size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('blockquote') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Blockquote"
                >
                    <Quote size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                    title="Horizontal Rule"
                >
                    <Minus size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={addLink}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('link') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                >
                    <LinkIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => (editor.chain().focus() as any).setCollapsible().run()}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('collapsible') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Insert Collapsible"
                >
                    <ChevronDownSquare size={16} />
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
                    onClick={() => {
                        const count = parseInt(window.prompt('Number of columns (2-6)', '2') || '2');
                        if (count >= 2 && count <= 6) {
                            (editor.chain().focus() as any).insertColumns(count).run();
                        }
                    }}
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('columnsContainer') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Insert Multi-column Layout"
                >
                    <ColumnsIcon size={16} />
                </button>
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
                    className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('table') ? 'bg-white shadow-sm text-primary' : 'text-gray-600'}`}
                    title="Insert Table"
                >
                    <TableIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={addEmbed}
                    className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                    title="External Embed (Map, Instagram, etc.)"
                >
                    <MonitorPlay size={16} />
                </button>
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
            HorizontalRule,
            Underline,
            TextStyle,
            Color,
            FontFamily,
            LineHeight.configure({
                types: ['paragraph', 'heading', 'blockquote'],
                defaultLineHeight: '1.6',
            }),
            FontSize,
            VerticalAlign,
            MaterialIcon,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['heading', 'paragraph', 'blockquote'] }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-primary underline cursor-pointer font-bold' } }),
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
            ListPrefix,
            ColumnsContainer,
            Column,
            ColumnsExtension,
            Iframe,
            RawHTML,
            Collapsible,
            CollapsibleSummary,
            CollapsibleContent,
            Placeholder.configure({ placeholder: placeholder || 'Start writing...', })
        ],
        immediatelyRender: false,
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: `tiptap is-editable prose prose-slate prose-base lg:prose-lg focus:outline-none px-8 py-10 max-w-none text-slate-700 leading-relaxed ${isFullscreen ? 'min-h-screen pt-24' : ''}`
            }
        }
    });

    useEffect(() => {
        if (editor && value !== undefined && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className={`
            border border-gray-200 transition-all bg-white shadow-sm
            ${isFullscreen ? 'fixed inset-0 z-[100] overflow-y-auto rounded-none' : 'rounded-xl overflow-hidden'}
        `}>
            <MenuBar editor={editor} isFullscreen={isFullscreen} setFullscreen={setFullscreen} />

            {editor && (
                <BubbleMenu editor={editor}>
                    <div className="flex items-center gap-0.5 bg-slate-900 text-white p-1 rounded-lg border border-slate-800 shadow-xl overflow-hidden">
                        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'text-primary' : ''}`}><Bold size={14} /></button>
                        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'text-primary' : ''}`}><Italic size={14} /></button>
                        <button type="button" onClick={() => editor.chain().focus().toggleLink().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('link') ? 'text-primary' : ''}`}><LinkIcon size={14} /></button>
                    </div>
                </BubbleMenu>
            )}

            <div className={`relative bg-white overflow-y-auto ${!isFullscreen ? (heightClasses || (height ? '' : 'h-130')) : ''}`} style={isFullscreen ? undefined : (height && !heightClasses ? { height: `${height}px` } : undefined)}>
                <EditorContent editor={editor} className="h-full" />
            </div>

            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex gap-4">
                    <span>{editor?.storage.characterCount.words()} Words</span>
                    <span>{editor?.storage.characterCount.characters()} Characters</span>
                </div>
            </div>

            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); float: left; color: #adb5bd; pointer-events: none; height: 0; }
                .tiptap { outline: none !important; }
                .tiptap h1 { font-size: 2.5rem; font-weight: 800; margin: 2rem 0 1rem; }
                .tiptap h2 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 1rem; }
                .tiptap h3 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.75rem; }
                .tiptap blockquote { border-left: 4px solid #0D3E5C; padding-left: 1.5rem; font-style: italic; color: #475569; }
                .tiptap .editor-columns { display: flex; gap: 2rem; margin: 2rem 0; }
                .tiptap .editor-column { flex: 1; min-width: 0; }
                .tiptap table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; }
                .tiptap td, .tiptap th { border: 1px solid #e2e8f0; padding: 0.75rem; min-width: 1em; position: relative; }
                .tiptap th { background: #f8fafc; font-weight: 600; }
                .tiptap .collapsible { border: 1px solid #e2e8f0; border-radius: 0.75rem; margin: 1.5rem 0; }
                .tiptap .collapsible-summary { background: #f8fafc; padding: 1rem 1.25rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; }
                .tiptap .collapsible-content { padding: 1rem 1.25rem; }
            `}</style>
        </div>
    );
}
