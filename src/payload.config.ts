import { buildConfig } from 'payload/config';
import path from 'path';
import { Users } from './collections/Users';
import { Sites } from './collections/Sites';
import { Media } from './collections/Media';
import { News } from './collections/News';

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { HTMLConverterFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

export default buildConfig({
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
    },
    editor: lexicalEditor({
        features({ defaultFeatures }) {
            return [
                ...defaultFeatures
                    .filter((feature) => [
                        'link',
                        'paragraph',
                        // 'heading',
                        'upload',
                        'bold',
                        'italic',
                        'underline',
                        'align',
                    ].includes(feature.key)),
                HeadingFeature({
                    enabledHeadingSizes: ['h1', 'h2', 'h3'],
                }),
                HTMLConverterFeature({}),
            ]
        },
    }),
    collections: [
        Users,
        News,
        Media,
        Sites,
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
})
