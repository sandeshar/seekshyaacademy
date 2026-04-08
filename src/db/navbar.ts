import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INavbarItem {
    label: string;
    href: string;
    isExternal?: boolean;
    subItems?: INavbarItem[];
}

export interface INavbar extends Document {
    items: INavbarItem[];
    cta?: {
        label: string;
        href: string;
        show: boolean;
    };
}

const NavbarItemSchema = new Schema({
    label: { type: String, required: true },
    href: { type: String, required: true },
    isExternal: { type: Boolean, default: false },
});

// Recursive subItems
NavbarItemSchema.add({
    subItems: [NavbarItemSchema]
});

const NavbarSchema = new Schema({
    items: {
        type: [NavbarItemSchema],
        default: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            {
                label: 'Courses', href: '/courses', subItems: [
                    { label: 'CAP-I', href: '/courses/cap-i' },
                    { label: 'CAP-II', href: '/courses/cap-ii' },
                    { label: 'CAP-III', href: '/courses/cap-iii' },
                ]
            },
            { label: 'Faculty', href: '/faculty' },
            { label: 'Blogs', href: '/blogs' },
            { label: 'Notices', href: '/notices' },
        ]
    },
    cta: {
        label: { type: String, default: 'Contact' },
        href: { type: String, default: '/contact' },
        show: { type: Boolean, default: true }
    }
}, { timestamps: true });

const Navbar: Model<INavbar> = mongoose.models.Navbar || mongoose.model<INavbar>('Navbar', NavbarSchema);

export default Navbar;
