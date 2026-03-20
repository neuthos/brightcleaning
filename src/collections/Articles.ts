import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    description: 'Blog articles for BrightClean',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-friendly version of the title (e.g., "how-to-clean-your-oven")',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: {
        description: 'Brief summary shown in blog listing and meta description',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Article Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Cleaning Tips', value: 'cleaning-tips' },
        { label: 'Home Organisation', value: 'home-organisation' },
        { label: 'End of Lease', value: 'end-of-lease' },
        { label: 'NDIS Support', value: 'ndis-support' },
        { label: 'Office Cleaning', value: 'office-cleaning' },
        { label: 'News & Updates', value: 'news' },
      ],
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      label: 'Tags',
      admin: {
        description: 'Add relevant tags (e.g., "kitchen", "bathroom", "adelaide")',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Author',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When this article should appear as published',
      },
    },
  ],
}
