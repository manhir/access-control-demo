import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAccess";
import { isLoggedIn } from "../access/isLoggedIn";

export const Media: CollectionConfig = {
    slug: 'media',
    upload: true,
    // upload: {
    //     imageSizes: [
    //         {
    //             name: 'thumbnail',
    //             width: 400,
    //             height: 300,
    //             position: 'centre',
    //         },
    //         {
    //             name: 'card',
    //             width: 768,
    //             height: 1024,
    //             position: 'centre',
    //         },
    //         {
    //             name: 'tablet',
    //             width: 1024,
    //             // By specifying `undefined` or leaving a height undefined,
    //             // the image will be sized to a certain width,
    //             // but it will retain its original aspect ratio
    //             // and calculate a height automatically.
    //             height: undefined,
    //             position: 'centre',
    //         },
    //     ],
    //     adminThumbnail: 'thumbnail',
    //     mimeTypes: ['image/*'],
    // },
    access: {
        // Anyone logged in can create
        create: isLoggedIn,
        // Only admins or editors with site access can update
        update: isAdminOrHasSiteAccess(),
        // Only admins or editors with site access can read
        read: isAdminOrHasSiteAccess(),
        // Only admins or editors with site access can delete
        delete: isAdminOrHasSiteAccess(),
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'site',
            type: 'relationship',
            relationTo: 'sites',
            required: true,
            // If user is not admin, set the site by default
            // to the first site that they have access to
            defaultValue: ({ user }) => {
                if (!user.roles.includes('admin') && user.sites?.[0]) {
                    return user.sites[0];
                }
            }
        }
    ]
}