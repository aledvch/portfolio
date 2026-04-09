export const blocksQuery = `
  *[_type == "entry"] | order(order asc) {
    _id,
    mediaType,
    size,
    "images": images[] {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    videoUrl,
    caption,
  }
`

export const settingsQuery = `
  *[_type == "settings"][0] {
    headerText,
    footerText,
  }
`

export const lastUpdatedQuery = `
  *[_type in ["entry", "about", "settings"]] | order(_updatedAt desc)[0]._updatedAt
`

export const aboutQuery = `
  *[_type == "about"][0] {
    name,
    bio,
    "photo": photo {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    email,
    instagram,
    linkedin,
    substack,
  }
`
