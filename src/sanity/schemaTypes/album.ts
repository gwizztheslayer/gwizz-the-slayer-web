export default {
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      title: 'Album Title', 
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: 'coverImage', 
      title: 'Cover Image', 
      type: 'image', 
      options: { hotspot: true } 
    },
    { 
      name: 'featureFmLink',
      title: 'Feature.fm Link (Optional)',
      type: 'url' 
    },
    { 
      name: 'tracks', 
      title: 'Tracklist', 
      type: 'array', 
      of: [{ type: 'track' }] 
    }
  ]
}
