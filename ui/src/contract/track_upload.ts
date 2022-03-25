export type TrackUpload = {
  "version": "0.1.0",
  "name": "track_upload",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "track",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "cid",
          "type": "string"
        },
        {
          "name": "artist",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "title",
          "type": {
            "option": "string"
          }
        }
      ]
    },
    {
      "name": "update",
      "accounts": [
        {
          "name": "track",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "cid",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "artist",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "title",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "track",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "publicKey"
          },
          {
            "name": "cid",
            "type": "string"
          },
          {
            "name": "artist",
            "type": "string"
          },
          {
            "name": "trackTitle",
            "type": "string"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "TrackEvent",
      "fields": [
        {
          "name": "cid",
          "type": "string",
          "index": false
        },
        {
          "name": "artist",
          "type": "string",
          "index": false
        },
        {
          "name": "trackTitle",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnauthorizedUser",
      "msg": "Only the original signer can update tracks."
    },
    {
      "code": 6001,
      "name": "TrackTooLong",
      "msg": "Track should be up to 32 characters"
    },
    {
      "code": 6002,
      "name": "ArtistTooLong",
      "msg": "Artist should be up to 32 characters"
    },
    {
      "code": 6003,
      "name": "InvalidCID",
      "msg": "CID is not valid"
    }
  ]
};

export const IDL: TrackUpload = {
  "version": "0.1.0",
  "name": "track_upload",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "track",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "cid",
          "type": "string"
        },
        {
          "name": "artist",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "title",
          "type": {
            "option": "string"
          }
        }
      ]
    },
    {
      "name": "update",
      "accounts": [
        {
          "name": "track",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "cid",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "artist",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "title",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "track",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "publicKey"
          },
          {
            "name": "cid",
            "type": "string"
          },
          {
            "name": "artist",
            "type": "string"
          },
          {
            "name": "trackTitle",
            "type": "string"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "TrackEvent",
      "fields": [
        {
          "name": "cid",
          "type": "string",
          "index": false
        },
        {
          "name": "artist",
          "type": "string",
          "index": false
        },
        {
          "name": "trackTitle",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnauthorizedUser",
      "msg": "Only the original signer can update tracks."
    },
    {
      "code": 6001,
      "name": "TrackTooLong",
      "msg": "Track should be up to 32 characters"
    },
    {
      "code": 6002,
      "name": "ArtistTooLong",
      "msg": "Artist should be up to 32 characters"
    },
    {
      "code": 6003,
      "name": "InvalidCID",
      "msg": "CID is not valid"
    }
  ]
};