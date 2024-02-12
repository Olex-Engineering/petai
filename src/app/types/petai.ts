export type Petai = {
  "version": "0.1.0",
  "name": "petai",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateProgramState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
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
          "name": "data",
          "type": {
            "defined": "ProgramState"
          }
        }
      ]
    },
    {
      "name": "createToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "ataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintSeed",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "metadataArgs",
          "type": {
            "defined": "MetatadataArgs"
          }
        }
      ]
    },
    {
      "name": "updateToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "initializer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadataArgs",
          "type": {
            "defined": "MetatadataArgs"
          }
        }
      ]
    },
    {
      "name": "mintToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initPlayerState",
      "accounts": [
        {
          "name": "playerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petNftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created thread."
          ]
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Clockwork thread program."
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "petStates",
          "type": {
            "vec": {
              "vec": "string"
            }
          }
        },
        {
          "name": "realDogConfig",
          "type": {
            "defined": "RealDogConfig"
          }
        },
        {
          "name": "threadId",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "updatePetStateCron",
      "accounts": [
        {
          "name": "playerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "thread",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "Verify that only this thread can execute this intruction"
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "playerId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "putAsset",
      "accounts": [
        {
          "name": "assetState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
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
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetArgs",
          "type": {
            "defined": "AssetArgs"
          }
        }
      ]
    },
    {
      "name": "useAsset",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintSeed",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u8"
        }
      ]
    },
    {
      "name": "putDecor",
      "accounts": [
        {
          "name": "decorState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
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
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "decorArgs",
          "type": {
            "defined": "DecorArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "assetState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          },
          {
            "name": "increaseFood",
            "type": "u8"
          },
          {
            "name": "increaseLoneliness",
            "type": "u8"
          },
          {
            "name": "increaseLove",
            "type": "u8"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "decorState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          },
          {
            "name": "globalType",
            "type": {
              "defined": "DecorType"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "petState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentPetNft",
            "type": "publicKey"
          },
          {
            "name": "condition",
            "type": {
              "defined": "PetCondition"
            }
          },
          {
            "name": "age",
            "type": {
              "defined": "PetAge"
            }
          },
          {
            "name": "loneliness",
            "type": "u8"
          },
          {
            "name": "food",
            "type": "u8"
          },
          {
            "name": "love",
            "type": "u8"
          },
          {
            "name": "updatesNumber",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "playerState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "petStates",
            "type": {
              "vec": {
                "vec": "string"
              }
            }
          },
          {
            "name": "currentEffects",
            "type": {
              "vec": {
                "defined": "GameEffect"
              }
            }
          },
          {
            "name": "decors",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "lastFreeAssetsCollected",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "petCollection",
            "type": "publicKey"
          },
          {
            "name": "assetCollection",
            "type": "publicKey"
          },
          {
            "name": "decorCollection",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "realDogsConfigs",
            "type": {
              "option": {
                "vec": {
                  "defined": "RealDogConfig"
                }
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AssetArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "increaseFood",
            "type": "u8"
          },
          {
            "name": "increaseLoneliness",
            "type": "u8"
          },
          {
            "name": "increaseLove",
            "type": "u8"
          },
          {
            "name": "price",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "DecorArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "globalType",
            "type": {
              "defined": "DecorType"
            }
          }
        ]
      }
    },
    {
      "name": "GameEffect",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "effectType",
            "type": {
              "defined": "GameEffectType"
            }
          },
          {
            "name": "effectPower",
            "type": "u8"
          },
          {
            "name": "end",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MetatadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "tokenStandart",
            "type": {
              "defined": "TokenStandard"
            }
          },
          {
            "name": "primarySaleHappened",
            "type": "bool"
          },
          {
            "name": "collection",
            "type": {
              "option": {
                "defined": "Collection"
              }
            }
          },
          {
            "name": "collectionDetails",
            "type": {
              "option": {
                "defined": "CollectionDetails"
              }
            }
          },
          {
            "name": "decimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "printSupply",
            "type": {
              "option": {
                "defined": "PrintSupply"
              }
            }
          },
          {
            "name": "creators",
            "type": {
              "option": {
                "vec": {
                  "defined": "Creator"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "Collection",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "key",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RealDogConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "DecorType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Background"
          },
          {
            "name": "OnTheWall"
          },
          {
            "name": "Table"
          },
          {
            "name": "Floor"
          },
          {
            "name": "Bowl"
          }
        ]
      }
    },
    {
      "name": "GameEffectType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Game"
          },
          {
            "name": "Walk"
          },
          {
            "name": "Food"
          }
        ]
      }
    },
    {
      "name": "TokenStandard",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NonFungible"
          },
          {
            "name": "FungibleAsset"
          },
          {
            "name": "Fungible"
          },
          {
            "name": "NonFungibleEdition"
          },
          {
            "name": "ProgrammableNonFungible"
          },
          {
            "name": "ProgrammableNonFungibleEdition"
          }
        ]
      }
    },
    {
      "name": "CollectionDetails",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "V1",
            "fields": [
              {
                "name": "size",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "PrintSupply",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Zero"
          },
          {
            "name": "Limited",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "Unlimited"
          }
        ]
      }
    },
    {
      "name": "PetAge",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Kid"
          },
          {
            "name": "Young"
          },
          {
            "name": "Adult"
          },
          {
            "name": "Old"
          }
        ]
      }
    },
    {
      "name": "PetCondition",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Super"
          },
          {
            "name": "Good"
          },
          {
            "name": "Middle"
          },
          {
            "name": "Bad"
          },
          {
            "name": "Dead"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PetStatesArgsError",
      "msg": "Invalid pet states provided"
    },
    {
      "code": 6001,
      "name": "RealDogValidationError",
      "msg": "Invalid real dog config provided"
    },
    {
      "code": 6002,
      "name": "InvalidDogNft",
      "msg": "Invalid Dog NFT (invalid collection or collection is not verified)"
    }
  ]
};

export const IDL: Petai = {
  "version": "0.1.0",
  "name": "petai",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateProgramState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
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
          "name": "data",
          "type": {
            "defined": "ProgramState"
          }
        }
      ]
    },
    {
      "name": "createToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "ataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintSeed",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "metadataArgs",
          "type": {
            "defined": "MetatadataArgs"
          }
        }
      ]
    },
    {
      "name": "updateToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "initializer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadataArgs",
          "type": {
            "defined": "MetatadataArgs"
          }
        }
      ]
    },
    {
      "name": "mintToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initPlayerState",
      "accounts": [
        {
          "name": "playerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petNftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created thread."
          ]
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Clockwork thread program."
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "petStates",
          "type": {
            "vec": {
              "vec": "string"
            }
          }
        },
        {
          "name": "realDogConfig",
          "type": {
            "defined": "RealDogConfig"
          }
        },
        {
          "name": "threadId",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "updatePetStateCron",
      "accounts": [
        {
          "name": "playerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "thread",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "Verify that only this thread can execute this intruction"
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "playerId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "putAsset",
      "accounts": [
        {
          "name": "assetState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
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
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetArgs",
          "type": {
            "defined": "AssetArgs"
          }
        }
      ]
    },
    {
      "name": "useAsset",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "petState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintSeed",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u8"
        }
      ]
    },
    {
      "name": "putDecor",
      "accounts": [
        {
          "name": "decorState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
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
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "decorArgs",
          "type": {
            "defined": "DecorArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "assetState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          },
          {
            "name": "increaseFood",
            "type": "u8"
          },
          {
            "name": "increaseLoneliness",
            "type": "u8"
          },
          {
            "name": "increaseLove",
            "type": "u8"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "decorState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          },
          {
            "name": "globalType",
            "type": {
              "defined": "DecorType"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "petState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentPetNft",
            "type": "publicKey"
          },
          {
            "name": "condition",
            "type": {
              "defined": "PetCondition"
            }
          },
          {
            "name": "age",
            "type": {
              "defined": "PetAge"
            }
          },
          {
            "name": "loneliness",
            "type": "u8"
          },
          {
            "name": "food",
            "type": "u8"
          },
          {
            "name": "love",
            "type": "u8"
          },
          {
            "name": "updatesNumber",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "playerState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "petStates",
            "type": {
              "vec": {
                "vec": "string"
              }
            }
          },
          {
            "name": "currentEffects",
            "type": {
              "vec": {
                "defined": "GameEffect"
              }
            }
          },
          {
            "name": "decors",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "lastFreeAssetsCollected",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "petCollection",
            "type": "publicKey"
          },
          {
            "name": "assetCollection",
            "type": "publicKey"
          },
          {
            "name": "decorCollection",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "realDogsConfigs",
            "type": {
              "option": {
                "vec": {
                  "defined": "RealDogConfig"
                }
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AssetArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "increaseFood",
            "type": "u8"
          },
          {
            "name": "increaseLoneliness",
            "type": "u8"
          },
          {
            "name": "increaseLove",
            "type": "u8"
          },
          {
            "name": "price",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "DecorArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "globalType",
            "type": {
              "defined": "DecorType"
            }
          }
        ]
      }
    },
    {
      "name": "GameEffect",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "effectType",
            "type": {
              "defined": "GameEffectType"
            }
          },
          {
            "name": "effectPower",
            "type": "u8"
          },
          {
            "name": "end",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MetatadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "tokenStandart",
            "type": {
              "defined": "TokenStandard"
            }
          },
          {
            "name": "primarySaleHappened",
            "type": "bool"
          },
          {
            "name": "collection",
            "type": {
              "option": {
                "defined": "Collection"
              }
            }
          },
          {
            "name": "collectionDetails",
            "type": {
              "option": {
                "defined": "CollectionDetails"
              }
            }
          },
          {
            "name": "decimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "printSupply",
            "type": {
              "option": {
                "defined": "PrintSupply"
              }
            }
          },
          {
            "name": "creators",
            "type": {
              "option": {
                "vec": {
                  "defined": "Creator"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "Collection",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "key",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RealDogConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "DecorType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Background"
          },
          {
            "name": "OnTheWall"
          },
          {
            "name": "Table"
          },
          {
            "name": "Floor"
          },
          {
            "name": "Bowl"
          }
        ]
      }
    },
    {
      "name": "GameEffectType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Game"
          },
          {
            "name": "Walk"
          },
          {
            "name": "Food"
          }
        ]
      }
    },
    {
      "name": "TokenStandard",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NonFungible"
          },
          {
            "name": "FungibleAsset"
          },
          {
            "name": "Fungible"
          },
          {
            "name": "NonFungibleEdition"
          },
          {
            "name": "ProgrammableNonFungible"
          },
          {
            "name": "ProgrammableNonFungibleEdition"
          }
        ]
      }
    },
    {
      "name": "CollectionDetails",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "V1",
            "fields": [
              {
                "name": "size",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "PrintSupply",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Zero"
          },
          {
            "name": "Limited",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "Unlimited"
          }
        ]
      }
    },
    {
      "name": "PetAge",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Kid"
          },
          {
            "name": "Young"
          },
          {
            "name": "Adult"
          },
          {
            "name": "Old"
          }
        ]
      }
    },
    {
      "name": "PetCondition",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Super"
          },
          {
            "name": "Good"
          },
          {
            "name": "Middle"
          },
          {
            "name": "Bad"
          },
          {
            "name": "Dead"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PetStatesArgsError",
      "msg": "Invalid pet states provided"
    },
    {
      "code": 6001,
      "name": "RealDogValidationError",
      "msg": "Invalid real dog config provided"
    },
    {
      "code": 6002,
      "name": "InvalidDogNft",
      "msg": "Invalid Dog NFT (invalid collection or collection is not verified)"
    }
  ]
};
