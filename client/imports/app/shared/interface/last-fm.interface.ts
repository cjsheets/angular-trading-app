export interface LastFM {
  "topalbums": {
    "album": [
      {
        "name": string,
        "url": string,
        "artist": {
          "name": string,
        },
        "image": [
          {
            "#text": string,
            "size": string
          }
        ]
      }
    ]
  }
}