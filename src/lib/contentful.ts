import contentful, { type Entry, type EntryFieldTypes } from "contentful";

export interface work {
  contentTypeId: "blogTars";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    date: EntryFieldTypes.Date;
    headerImg: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    category: EntryFieldTypes.Text;
    readTime: EntryFieldTypes.Number;
    author: EntryFieldTypes.Text;
    authorImage: EntryFieldTypes.AssetLink;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Text>;
  };
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
