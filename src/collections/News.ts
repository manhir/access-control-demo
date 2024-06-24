import { isLoggedIn } from '../access/isLoggedIn';

export const News: any = {
    slug: 'news',
    admin: {
        useAsTitle: 'title',
    },
    versions: {
        drafts: true,
    },
    access: {
        // Anyone logged in can create
        create: isLoggedIn,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
        },
    ],
}