import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactPage extends Document {
    hero: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        backgroundImage: string;
        overlayOpacity: number;
    };
    contactInfo: {
        isVisible: boolean;
        title: string;
        description: string;
        address: {
            title: string;
            details: string;
        };
        phone: {
            title: string;
            numbers: string[];
        };
        email: {
            title: string;
            addresses: string[];
        };
        map: {
            title: string;
            iframeCode: string;
        };
    };
    contactForm: {
        isVisible: boolean;
        title: string;
        description: string;
    };
    seo: {
        title: string;
        description: string;
    };
}

const ContactPageSchema: Schema = new Schema({
    hero: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Get in Touch with Seekshya Academy" },
        subtitle: { type: String, default: "Start your CA journey with the ICAN New Syllabus 2025. Whether you have questions about admissions, faculty, or curriculum, we are here to help." },
        backgroundImage: { type: String, default: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2071&auto=format&fit=crop" },
        overlayOpacity: { type: Number, default: 60 }
    },
    contactInfo: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Contact Information" },
        description: { type: String, default: "Reach out to us through any of the following channels or visit our office." },
        address: {
            title: { type: String, default: "Visit Us" },
            details: { type: String, default: "Putalisadak, Kathmandu, Nepal<br />Opposite to Kumari Bank" }
        },
        phone: {
            title: { type: String, default: "Call or WhatsApp" },
            numbers: { type: [String], default: ["+977-98XXXXXXXX", "+977-01-XXXXXXX"] }
        },
        email: {
            title: { type: String, default: "Email Us" },
            addresses: { type: [String], default: ["info@seekshyaacademy.com", "admissions@seekshyaacademy.com"] }
        },
        map: {
            title: { type: String, default: "Find us on Map" },
            iframeCode: { type: String, default: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1234567890123!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjcuNzE3Miw4NS4zMjQw!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp" width="100%" height="280" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' }
        }
    },
    contactForm: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Send us an Inquiry" },
        description: { type: String, default: "Fill out the form below and our team will get back to you within 24 hours." }
    },
    seo: {
        title: { type: String, default: "Contact Us" },
        description: { type: String, default: "Get in touch with Seekshya Academy for admissions, faculty inquiries, or curriculum details." },
    }
}, {
    timestamps: true
});

const ContactPageModel: Model<IContactPage> = mongoose.models.ContactPage || mongoose.model<IContactPage>('ContactPage', ContactPageSchema);

export default ContactPageModel;
