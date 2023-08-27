import {defineField, defineType} from 'sanity'


export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enable hotspot for image cropping
      },
    }),   
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Enter the alt text for the image',
    }),defineField({
      name: 'loading',
      title: 'Loading',
      type: 'string',
      description: 'Choose the loading strategy for the image',
      options: {
        list: [
          {title: 'Eager', value: 'eager'},
          {title: 'Lazy', value: 'lazy'},
        ],
      },
    }),
  ],
})
