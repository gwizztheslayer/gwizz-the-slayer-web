import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "transmission",
  type: "document",
  title: "Article",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt / Short Summary",
      description: "A short summary shown in the article list.",
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      title: "External full article URL",
      description: "Optional secure link when the full article lives elsewhere.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Cover Art",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Article body",
      description: "Write the full article here, or publish a secure external URL above.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            annotations: [
              defineField({
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) => rule.uri({ scheme: ["https"] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
});
