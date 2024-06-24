import { isAdmin } from '../access/isAdmin';
import { isAdminOrHasSiteAccessOrPublished } from '../access/isAdminHasSiteAccessOrPublished';
import { isAdminOrHasSiteAccess } from '../access/isAdminOrHasSiteAccess';
import { isLoggedIn } from '../access/isLoggedIn';

export const News = {
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
        // Only admins or editors with site access can update
        update: isAdminOrHasSiteAccess(),
        // Admins or editors with site access can read,
        // otherwise users not logged in can only read published
        read: isAdminOrHasSiteAccessOrPublished,
        // Only admins can delete
        delete: isAdmin,
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