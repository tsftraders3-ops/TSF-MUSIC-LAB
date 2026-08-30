/**
 * WEB FIXTURE — the LIVE WEB_REMIX search response for "tu chaiye"
 * (captured 2026-08-30T10:52:58.635Z, sandbox → music.youtube.com).
 *
 * This is the REAL payload the lab.4 device run painted: the Top-result
 * card carries a Lo-Fi Mix (188K views), REMIXes outrank the official
 * song, and Episode/Podcast/Profile rows flood the shelves. The web
 * gauntlet feeds it through the REAL ytSearchMusic pipeline (purge +
 * title-truth rank + top gate) so screenshots exercise the true code
 * path. Metro redirects only for platform=web.
 */
export const YT_SEARCH_FIXTURE = {
  "responseContext": {
    "visitorData": "CgstVmt4ZWp0cmZmcyiKl9DUBjIKCgJISxIEGgAgMQ%3D%3D",
    "serviceTrackingParams": [
      {
        "service": "CSI",
        "params": [
          {
            "key": "c",
            "value": "WEB_REMIX"
          },
          {
            "key": "cver",
            "value": "1.20260707.12.00"
          },
          {
            "key": "yt_li",
            "value": "0"
          },
          {
            "key": "GetSearch_rid",
            "value": "0x975272a4c1cbe16d"
          }
        ]
      },
      {
        "service": "GFEEDBACK",
        "params": [
          {
            "key": "logged_in",
            "value": "0"
          }
        ]
      },
      {
        "service": "ECATCHER",
        "params": [
          {
            "key": "client.version",
            "value": "1.20000101"
          },
          {
            "key": "client.name",
            "value": "WEB_REMIX"
          }
        ]
      }
    ],
    "maxAgeSeconds": 120,
    "responseId": "IhMI5rHV6JfIlgMVLHTrCB3ysR2h"
  },
  "contents": {
    "tabbedSearchResultsRenderer": {
      "tabs": [
        {
          "tabRenderer": {
            "title": "YT Music",
            "selected": true,
            "content": {
              "sectionListRenderer": {
                "contents": [
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "showingResultsForRenderer": {
                            "showingResultsFor": {
                              "runs": [
                                {
                                  "text": "Showing results for"
                                }
                              ]
                            },
                            "correctedQuery": {
                              "runs": [
                                {
                                  "text": "tu "
                                },
                                {
                                  "text": "chahiye",
                                  "italics": true
                                }
                              ]
                            },
                            "correctedQueryEndpoint": {
                              "clickTrackingParams": "COADEPAwGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "searchEndpoint": {
                                "query": "tu chahiye"
                              }
                            },
                            "searchInsteadFor": {
                              "runs": [
                                {
                                  "text": "Search instead for"
                                }
                              ]
                            },
                            "originalQuery": {
                              "runs": [
                                {
                                  "text": "tu chaiye"
                                }
                              ]
                            },
                            "originalQueryEndpoint": {
                              "clickTrackingParams": "COADEPAwGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "searchEndpoint": {
                                "query": "tu chaiye",
                                "params": "QgIIAQ%3D%3D"
                              }
                            },
                            "trackingParams": "COADEPAwGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                          }
                        }
                      ],
                      "trackingParams": "CN8DELsvGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "musicCardShelfRenderer": {
                      "trackingParams": "CJ0DEPqRBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                      "thumbnail": {
                        "musicThumbnailRenderer": {
                          "thumbnail": {
                            "thumbnails": [
                              {
                                "url": "https://i.ytimg.com/vi/zuvla6ABKbs/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3mAu-mlIo-2bYayxg9SxDVzuBWa2A",
                                "width": 400,
                                "height": 225
                              }
                            ]
                          },
                          "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                          "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                          "trackingParams": "CN4DEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                        }
                      },
                      "title": {
                        "runs": [
                          {
                            "text": "'Tu Chahiye' FULL VIDEO Song - Atif Aslam Pritam | Bajrangi Bhaijaan | Salman Khan, Kareena Kapoor",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CJ0DEPqRBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "watchEndpoint": {
                                "videoId": "zuvla6ABKbs",
                                "watchEndpointMusicSupportedConfigs": {
                                  "watchEndpointMusicConfig": {
                                    "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                  }
                                }
                              }
                            }
                          }
                        ]
                      },
                      "subtitle": {
                        "runs": [
                          {
                            "text": "Video"
                          },
                          {
                            "text": " • "
                          },
                          {
                            "text": "Amitabh Bhattacharya",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CJ0DEPqRBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "browseEndpoint": {
                                "browseId": "UCRQmZ4lsrzXAyvKRV1DSMYA",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                  }
                                }
                              }
                            }
                          },
                          {
                            "text": ", "
                          },
                          {
                            "text": "Atif Aslam",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CJ0DEPqRBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "browseEndpoint": {
                                "browseId": "UCVGomUS__PL0c4jDXa0QwXA",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                  }
                                }
                              }
                            }
                          },
                          {
                            "text": " & "
                          },
                          {
                            "text": "Shankar–Ehsaan–Loy",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CJ0DEPqRBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "browseEndpoint": {
                                "browseId": "UCD1yqtH3tB9pstyoJFpHl_w",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                  }
                                }
                              }
                            }
                          },
                          {
                            "text": " • "
                          },
                          {
                            "text": "104M views"
                          },
                          {
                            "text": " • "
                          },
                          {
                            "text": "3:51"
                          }
                        ],
                        "accessibility": {
                          "accessibilityData": {
                            "label": "Video • Amitabh Bhattacharya, Atif Aslam & Shankar–Ehsaan–Loy • 104 million views • 3 minutes, 51 seconds"
                          }
                        }
                      },
                      "contents": [
                        {
                          "messageRenderer": {
                            "text": {
                              "runs": [
                                {
                                  "text": "More from YouTube"
                                }
                              ]
                            },
                            "trackingParams": "CN0DEJY7GAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "style": {
                              "value": "RENDER_STYLE_SIMPLE_HEADER"
                            }
                          }
                        },
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CM0DEMGhCBgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/sDKLK127GVA/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3mOQmg1lmJISSoL6_wixDu_WaiH8g",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CNwDEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CNsDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "sDKLK127GVA",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CNsDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play TU CHAHIYE (Lo-Fi Mix): DJ Moody | Salman Khan, Kareena Kapoor Khan | Atif Aslam - Amitabh Bhattacharya"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause TU CHAHIYE (Lo-Fi Mix): DJ Moody | Salman Khan, Kareena Kapoor Khan | Atif Aslam - Amitabh Bhattacharya"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "TU CHAHIYE (Lo-Fi Mix): DJ Moody | Salman Khan, Kareena Kapoor Khan | Atif Aslam",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CM0DEMGhCBgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                          "watchEndpoint": {
                                            "videoId": "sDKLK127GVA",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Amitabh Bhattacharya",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CM0DEMGhCBgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UCRQmZ4lsrzXAyvKRV1DSMYA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": ", "
                                      },
                                      {
                                        "text": "Atif Aslam",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CM0DEMGhCBgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UCVGomUS__PL0c4jDXa0QwXA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " & "
                                      },
                                      {
                                        "text": "Shankar Ehsaan Loy",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CM0DEMGhCBgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UCD1yqtH3tB9pstyoJFpHl_w",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "188K views"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "5:09"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Amitabh Bhattacharya, Atif Aslam & Shankar Ehsaan Loy • 188 thousand views • 5 minutes, 9 seconds"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNoDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "sDKLK127GVA",
                                          "playlistId": "RDAMVMsDKLK127GVA",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk1zREtMSzEyN0dWQQ%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNoDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CNgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "sDKLK127GVA",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CNgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "sDKLK127GVA"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CNgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CNkDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CNgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CNYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "sDKLK127GVA",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CNYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "sDKLK127GVA"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CNYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CNcDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CNYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CNQDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CNUDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CNUDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CNQDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CNMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "sDKLK127GVA",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CNMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "sDKLK127GVA",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNEDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CNIDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CNIDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNEDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNADEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UCRQmZ4lsrzXAyvKRV1DSMYA",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNADEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CM8DEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "CgtzREtMSzEyN0dWQQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CM8DEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CM4DEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "sDKLK127GVA"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        },
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CL4DEMGhCBgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/XE4MW6VpaYI/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3lYzmrHrbo5yrnnH5k5FrRmrHbBvQ",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CMwDEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CMsDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "XE4MW6VpaYI",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CMsDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play TU CHAHIYE REMIX (DJ JOJI & DJ DEXXNOR) - DJ DEXXNOR"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause TU CHAHIYE REMIX (DJ JOJI & DJ DEXXNOR) - DJ DEXXNOR"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "TU CHAHIYE REMIX (DJ JOJI & DJ DEXXNOR)",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CL4DEMGhCBgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                          "watchEndpoint": {
                                            "videoId": "XE4MW6VpaYI",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "DJ DEXXNOR",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CL4DEMGhCBgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UC2S2Uq6_crke_ovU5W7DGMQ",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "130K views"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "5:34"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "DJ DEXXNOR • 130 thousand views • 5 minutes, 34 seconds"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMoDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "XE4MW6VpaYI",
                                          "playlistId": "RDAMVMXE4MW6VpaYI",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk1YRTRNVzZWcGFZSQ%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMoDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CMgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "XE4MW6VpaYI",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CMgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "XE4MW6VpaYI"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CMgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CMkDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CMgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CMYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "XE4MW6VpaYI",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CMYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "XE4MW6VpaYI"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CMYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CMcDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CMYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CMQDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CMUDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CMUDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CMQDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CMMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "XE4MW6VpaYI",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CMMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "XE4MW6VpaYI",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMEDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CMIDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CMIDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMEDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMADEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "CgtYRTRNVzZWcGFZSQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CMADEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CL8DEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "XE4MW6VpaYI"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        },
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CK8DEMGhCBgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/8h-4nE-pC2w/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3ne_RO5rP089okdegQs6-ftepqHXA",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CL0DEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CLwDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "8h-4nE-pC2w",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CLwDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play TU CHAHIYE | BAJRANGI BHAIJAAN | SALMAN KHAN | REMIX | DJ DEEPAK | DJ 3D | LOVE ● - 3D Creations"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause TU CHAHIYE | BAJRANGI BHAIJAAN | SALMAN KHAN | REMIX | DJ DEEPAK | DJ 3D | LOVE ● - 3D Creations"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "TU CHAHIYE | BAJRANGI BHAIJAAN | SALMAN KHAN | REMIX | DJ DEEPAK | DJ 3D | LOVE ●",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CK8DEMGhCBgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                          "watchEndpoint": {
                                            "videoId": "8h-4nE-pC2w",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "3D Creations",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CK8DEMGhCBgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UCyEV8QLoIkmoD8gVwZ9Lmlg",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "191K views"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "4:25"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "3D Creations • 191 thousand views • 4 minutes, 25 seconds"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLsDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "8h-4nE-pC2w",
                                          "playlistId": "RDAMVM8h-4nE-pC2w",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk04aC00bkUtcEMydw%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLsDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CLkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "8h-4nE-pC2w",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CLkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "8h-4nE-pC2w"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CLkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CLoDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CLkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CLcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "8h-4nE-pC2w",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CLcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "8h-4nE-pC2w"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CLcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CLgDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CLcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CLUDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CLYDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CLYDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CLUDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CLQDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "8h-4nE-pC2w",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CLQDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "8h-4nE-pC2w",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLQDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLIDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CLMDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CLMDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLIDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLEDEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "Cgs4aC00bkUtcEMydw%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CLEDEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CLADEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "8h-4nE-pC2w"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "buttons": [
                        {
                          "buttonRenderer": {
                            "style": "STYLE_DARK_ON_WHITE",
                            "size": "SIZE_DEFAULT",
                            "isDisabled": false,
                            "text": {
                              "runs": [
                                {
                                  "text": "Play"
                                }
                              ]
                            },
                            "icon": {
                              "iconType": "PLAY_ARROW"
                            },
                            "accessibility": {
                              "label": "Play"
                            },
                            "trackingParams": "CK4DEJTSBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "accessibilityData": {
                              "accessibilityData": {
                                "label": "Play"
                              }
                            },
                            "command": {
                              "clickTrackingParams": "CK4DEJTSBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hMgZzZWFyY2hSCXR1IGNoYWl5ZZoBAxD0JMoBBLRF_5c=",
                              "watchEndpoint": {
                                "videoId": "zuvla6ABKbs",
                                "params": "wAEB",
                                "watchEndpointMusicSupportedConfigs": {
                                  "watchEndpointMusicConfig": {
                                    "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                  }
                                }
                              }
                            }
                          }
                        },
                        {
                          "buttonRenderer": {
                            "style": "STYLE_WHITE_TRANSLUCENT",
                            "text": {
                              "runs": [
                                {
                                  "text": "Save"
                                }
                              ]
                            },
                            "icon": {
                              "iconType": "PLAYLIST_ADD"
                            },
                            "accessibility": {
                              "label": "Save to playlist"
                            },
                            "trackingParams": "CKwDEJimCBgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "accessibilityData": {
                              "accessibilityData": {
                                "label": "Save to playlist"
                              }
                            },
                            "command": {
                              "clickTrackingParams": "CKwDEJimCBgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "modalEndpoint": {
                                "modal": {
                                  "modalWithTitleAndButtonRenderer": {
                                    "title": {
                                      "runs": [
                                        {
                                          "text": "Save this for later"
                                        }
                                      ]
                                    },
                                    "content": {
                                      "runs": [
                                        {
                                          "text": "Make playlists and share them after signing in"
                                        }
                                      ]
                                    },
                                    "button": {
                                      "buttonRenderer": {
                                        "style": "STYLE_BLUE_TEXT",
                                        "isDisabled": false,
                                        "text": {
                                          "runs": [
                                            {
                                              "text": "Sign in"
                                            }
                                          ]
                                        },
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CK0DEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "signInEndpoint": {
                                            "hack": true
                                          }
                                        },
                                        "trackingParams": "CK0DEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      ],
                      "menu": {
                        "menuRenderer": {
                          "items": [
                            {
                              "menuNavigationItemRenderer": {
                                "text": {
                                  "runs": [
                                    {
                                      "text": "Start mix"
                                    }
                                  ]
                                },
                                "icon": {
                                  "iconType": "MIX"
                                },
                                "navigationEndpoint": {
                                  "clickTrackingParams": "CKsDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                  "watchEndpoint": {
                                    "videoId": "zuvla6ABKbs",
                                    "playlistId": "RDAMVMzuvla6ABKbs",
                                    "params": "wAEB",
                                    "loggingContext": {
                                      "vssLoggingContext": {
                                        "serializedContextData": "GhFSREFNVk16dXZsYTZBQkticw%3D%3D"
                                      }
                                    },
                                    "watchEndpointMusicSupportedConfigs": {
                                      "watchEndpointMusicConfig": {
                                        "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                      }
                                    }
                                  }
                                },
                                "trackingParams": "CKsDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            {
                              "menuServiceItemRenderer": {
                                "text": {
                                  "runs": [
                                    {
                                      "text": "Play next"
                                    }
                                  ]
                                },
                                "icon": {
                                  "iconType": "QUEUE_PLAY_NEXT"
                                },
                                "serviceEndpoint": {
                                  "clickTrackingParams": "CKkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                  "queueAddEndpoint": {
                                    "queueTarget": {
                                      "videoId": "zuvla6ABKbs",
                                      "onEmptyQueue": {
                                        "clickTrackingParams": "CKkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "zuvla6ABKbs"
                                        }
                                      }
                                    },
                                    "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                    "commands": [
                                      {
                                        "clickTrackingParams": "CKkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "addToToastAction": {
                                          "item": {
                                            "notificationTextRenderer": {
                                              "successResponseText": {
                                                "runs": [
                                                  {
                                                    "text": "Song will play next"
                                                  }
                                                ]
                                              },
                                              "trackingParams": "CKoDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  }
                                },
                                "trackingParams": "CKkDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            {
                              "menuServiceItemRenderer": {
                                "text": {
                                  "runs": [
                                    {
                                      "text": "Add to queue"
                                    }
                                  ]
                                },
                                "icon": {
                                  "iconType": "ADD_TO_REMOTE_QUEUE"
                                },
                                "serviceEndpoint": {
                                  "clickTrackingParams": "CKcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                  "queueAddEndpoint": {
                                    "queueTarget": {
                                      "videoId": "zuvla6ABKbs",
                                      "onEmptyQueue": {
                                        "clickTrackingParams": "CKcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "zuvla6ABKbs"
                                        }
                                      }
                                    },
                                    "queueInsertPosition": "INSERT_AT_END",
                                    "commands": [
                                      {
                                        "clickTrackingParams": "CKcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "addToToastAction": {
                                          "item": {
                                            "notificationTextRenderer": {
                                              "successResponseText": {
                                                "runs": [
                                                  {
                                                    "text": "Song added to queue"
                                                  }
                                                ]
                                              },
                                              "trackingParams": "CKgDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  }
                                },
                                "trackingParams": "CKcDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            {
                              "toggleMenuServiceItemRenderer": {
                                "defaultText": {
                                  "runs": [
                                    {
                                      "text": "Add to liked songs"
                                    }
                                  ]
                                },
                                "defaultIcon": {
                                  "iconType": "FAVORITE"
                                },
                                "defaultServiceEndpoint": {
                                  "clickTrackingParams": "CKUDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                  "modalEndpoint": {
                                    "modal": {
                                      "modalWithTitleAndButtonRenderer": {
                                        "title": {
                                          "runs": [
                                            {
                                              "text": "Like this song"
                                            }
                                          ]
                                        },
                                        "content": {
                                          "runs": [
                                            {
                                              "text": "Improve recommendations and save music after signing in"
                                            }
                                          ]
                                        },
                                        "button": {
                                          "buttonRenderer": {
                                            "style": "STYLE_BLUE_TEXT",
                                            "isDisabled": false,
                                            "text": {
                                              "runs": [
                                                {
                                                  "text": "Sign in"
                                                }
                                              ]
                                            },
                                            "navigationEndpoint": {
                                              "clickTrackingParams": "CKYDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "signInEndpoint": {
                                                "hack": true
                                              }
                                            },
                                            "trackingParams": "CKYDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "toggledText": {
                                  "runs": [
                                    {
                                      "text": "Remove from liked songs"
                                    }
                                  ]
                                },
                                "toggledIcon": {
                                  "iconType": "UNFAVORITE"
                                },
                                "trackingParams": "CKUDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            {
                              "menuServiceItemDownloadRenderer": {
                                "serviceEndpoint": {
                                  "clickTrackingParams": "CKQDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                  "offlineVideoEndpoint": {
                                    "videoId": "zuvla6ABKbs",
                                    "onAddCommand": {
                                      "clickTrackingParams": "CKQDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "getDownloadActionCommand": {
                                        "videoId": "zuvla6ABKbs",
                                        "params": "CAI%3D"
                                      }
                                    }
                                  }
                                },
                                "trackingParams": "CKQDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "badgeIcon": {
                                  "iconType": "PREMIUM_STANDALONE_CAIRO"
                                }
                              }
                            },
                            {
                              "menuNavigationItemRenderer": {
                                "text": {
                                  "runs": [
                                    {
                                      "text": "Save to playlist"
                                    }
                                  ]
                                },
                                "icon": {
                                  "iconType": "ADD_TO_PLAYLIST"
                                },
                                "navigationEndpoint": {
                                  "clickTrackingParams": "CKIDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                  "modalEndpoint": {
                                    "modal": {
                                      "modalWithTitleAndButtonRenderer": {
                                        "title": {
                                          "runs": [
                                            {
                                              "text": "Save this for later"
                                            }
                                          ]
                                        },
                                        "content": {
                                          "runs": [
                                            {
                                              "text": "Make playlists and share them after signing in"
                                            }
                                          ]
                                        },
                                        "button": {
                                          "buttonRenderer": {
                                            "style": "STYLE_BLUE_TEXT",
                                            "isDisabled": false,
                                            "text": {
                                              "runs": [
                                                {
                                                  "text": "Sign in"
                                                }
                                              ]
                                            },
                                            "navigationEndpoint": {
                                              "clickTrackingParams": "CKMDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "signInEndpoint": {
                                                "hack": true
                                              }
                                            },
                                            "trackingParams": "CKMDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "trackingParams": "CKIDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            {
                              "menuNavigationItemRenderer": {
                                "text": {
                                  "runs": [
                                    {
                                      "text": "Go to artist"
                                    }
                                  ]
                                },
                                "icon": {
                                  "iconType": "ARTIST"
                                },
                                "navigationEndpoint": {
                                  "clickTrackingParams": "CKEDEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                  "browseEndpoint": {
                                    "browseId": "UCRQmZ4lsrzXAyvKRV1DSMYA",
                                    "browseEndpointContextSupportedConfigs": {
                                      "browseEndpointContextMusicConfig": {
                                        "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                      }
                                    }
                                  }
                                },
                                "trackingParams": "CKEDEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            {
                              "menuNavigationItemRenderer": {
                                "text": {
                                  "runs": [
                                    {
                                      "text": "Share"
                                    }
                                  ]
                                },
                                "icon": {
                                  "iconType": "SHARE"
                                },
                                "navigationEndpoint": {
                                  "clickTrackingParams": "CKADEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                  "shareEntityEndpoint": {
                                    "serializedShareEntity": "Cgt6dXZsYTZBQkticw%3D%3D",
                                    "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                  }
                                },
                                "trackingParams": "CKADEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            }
                          ],
                          "trackingParams": "CJ8DEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                          "accessibility": {
                            "accessibilityData": {
                              "label": "Action menu"
                            }
                          }
                        }
                      },
                      "onTap": {
                        "clickTrackingParams": "CJ0DEPqRBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hMgZzZWFyY2hIu9OEgLqt-fXOAVIJdHUgY2hhaXllmgEDEPQkygEEtEX_lw==",
                        "watchEndpoint": {
                          "videoId": "zuvla6ABKbs",
                          "watchEndpointMusicSupportedConfigs": {
                            "watchEndpointMusicConfig": {
                              "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                            }
                          }
                        }
                      },
                      "thumbnailOverlay": {
                        "musicItemThumbnailOverlayRenderer": {
                          "background": {
                            "verticalGradient": {
                              "gradientLayerColors": [
                                "3422552064",
                                "3422552064"
                              ]
                            }
                          },
                          "content": {
                            "musicPlayButtonRenderer": {
                              "playNavigationEndpoint": {
                                "clickTrackingParams": "CJ4DEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                "watchEndpoint": {
                                  "videoId": "zuvla6ABKbs",
                                  "watchEndpointMusicSupportedConfigs": {
                                    "watchEndpointMusicConfig": {
                                      "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                    }
                                  }
                                }
                              },
                              "trackingParams": "CJ4DEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                              "playIcon": {
                                "iconType": "PLAY_ARROW"
                              },
                              "pauseIcon": {
                                "iconType": "PAUSE"
                              },
                              "iconColor": 4294967295,
                              "backgroundColor": 0,
                              "activeBackgroundColor": 0,
                              "loadingIndicatorColor": 14745645,
                              "playingIcon": {
                                "iconType": "VOLUME_UP"
                              },
                              "iconLoadingColor": 0,
                              "activeScaleFactor": 1,
                              "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_LARGE",
                              "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                              "accessibilityPlayData": {
                                "accessibilityData": {
                                  "label": "Play 'Tu Chahiye' FULL VIDEO Song - Atif Aslam Pritam | Bajrangi Bhaijaan | Salman Khan, Kareena Kapoor - Amitabh Bhattacharya"
                                }
                              },
                              "accessibilityPauseData": {
                                "accessibilityData": {
                                  "label": "Pause 'Tu Chahiye' FULL VIDEO Song - Atif Aslam Pritam | Bajrangi Bhaijaan | Salman Khan, Kareena Kapoor - Amitabh Bhattacharya"
                                }
                              }
                            }
                          },
                          "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                          "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                        }
                      }
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CIsDEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/qs3aynKwVClRF8IQcdwB_uNY4wiUZcXppttbhoVYffEuxPdBENSaPrFpCNXzcuMemL7Yz9BbY3BZF6Y=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/qs3aynKwVClRF8IQcdwB_uNY4wiUZcXppttbhoVYffEuxPdBENSaPrFpCNXzcuMemL7Yz9BbY3BZF6Y=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CJwDEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CJsDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "vl8YTnx3gso",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CJsDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu Chahiye - Pritam"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu Chahiye - Pritam"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu Chahiye",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CIsDEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "vl8YTnx3gso",
                                            "playerParams": "0gcJCRsC0OBS9m0t",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Song"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Pritam",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CIsDEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCCTN01plFzn4npREHKT2_9Q",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": ", "
                                      },
                                      {
                                        "text": "Atif Aslam",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CIsDEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCVGomUS__PL0c4jDXa0QwXA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " & "
                                      },
                                      {
                                        "text": "Amitabh Bhattacharya",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CIsDEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCRQmZ4lsrzXAyvKRV1DSMYA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Song • Pritam, Atif Aslam & Amitabh Bhattacharya"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "163M plays"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "163 million plays"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJoDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "vl8YTnx3gso",
                                          "playlistId": "RDAMVMvl8YTnx3gso",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk12bDhZVG54M2dzbw%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CJoDEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CJgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "vl8YTnx3gso",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CJgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "vl8YTnx3gso"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CJgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CJkDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CJgDEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CJYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "vl8YTnx3gso",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CJYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "vl8YTnx3gso"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CJYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CJcDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CJYDEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CJQDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CJUDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CJUDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CJQDEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CJMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "vl8YTnx3gso",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CJMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "vl8YTnx3gso",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CJMDENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJEDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CJIDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CJIDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CJEDEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to album"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ALBUM"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJADEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPREb_ReAXfSea0c5",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CJADEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CI8DEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UCCTN01plFzn4npREHKT2_9Q",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CI8DEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "View song credits"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "PEOPLE_GROUP"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CI4DEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPTCvl8YTnx3gso",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_TRACK_CREDITS"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CI4DEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CI0DEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "Cgt2bDhZVG54M2dzbw%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CI0DEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CIwDEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "vl8YTnx3gso"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CIoDELsvGAIiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CPsCENWfBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/kHdR-HIzoqcAmMCeRTOmZK_9QSkpUi5iNQBR0EyCV4ipxwC6e0-LqHZgum_ocO5fPmydYx9MhSdrzaI=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/kHdR-HIzoqcAmMCeRTOmZK_9QSkpUi5iNQBR0EyCV4ipxwC6e0-LqHZgum_ocO5fPmydYx9MhSdrzaI=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/kHdR-HIzoqcAmMCeRTOmZK_9QSkpUi5iNQBR0EyCV4ipxwC6e0-LqHZgum_ocO5fPmydYx9MhSdrzaI=w226-h226-l90-rj",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/kHdR-HIzoqcAmMCeRTOmZK_9QSkpUi5iNQBR0EyCV4ipxwC6e0-LqHZgum_ocO5fPmydYx9MhSdrzaI=w544-h544-l90-rj",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CIkDEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CIgDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "RDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0",
                                        "params": "wAEB"
                                      }
                                    },
                                    "trackingParams": "CIgDEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Ishq Hai Sukoon"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Ishq Hai Sukoon"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Ishq Hai Sukoon"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Playlist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "YouTube Music"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "50 songs"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIcDEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0",
                                          "params": "wAEB8gECGAE%3D"
                                        }
                                      },
                                      "trackingParams": "CIcDEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIYDEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLRDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CIYDEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CIQDEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "RDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CIQDEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "RDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CIQDEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CIUDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CIQDEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CIIDEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "RDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CIIDEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "RDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CIIDEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CIMDEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CIIDEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save playlist to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CIADEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CIEDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CIEDEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove playlist from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CIADEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "RDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0"
                                          }
                                        }
                                      },
                                      "trackingParams": "CIADEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CP4CEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CP8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CP8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CP4CEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CP0CEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EitSRENMQUs1dXlfbUZSNzBsX1ZMRlJMUDlSYVZDejNncWVadjZJYmhnTWMw",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CP0CEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CPwCEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CPsCENWfBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "browseEndpoint": {
                                "browseId": "VLRDCLAK5uy_mFR70l_VLFRLP9RaVCz3gqeZv6IbhgMc0",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PLAYLIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CPoCELsvGAMiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "COsCENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/kv_5z2ROptE/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3lZ9wU1qX3EcLWM23NqZwgH0z1LiQ",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CPkCEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CPgCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "kv_5z2ROptE",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CPgCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu Chahiye - Atif Aslam(Lyrics)| Lyrical Bam Hindi - LYRICAL BAM HINDI"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu Chahiye - Atif Aslam(Lyrics)| Lyrical Bam Hindi - LYRICAL BAM HINDI"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu Chahiye - Atif Aslam(Lyrics)| Lyrical Bam Hindi",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "COsCENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "kv_5z2ROptE",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Video"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "LYRICAL BAM HINDI",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "COsCENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCoxe356O2XrojC7NCGvsZxg",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "6.2M views"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Video • LYRICAL BAM HINDI • 6.2 million views"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CPcCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "kv_5z2ROptE",
                                          "playlistId": "RDAMVMkv_5z2ROptE",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk1rdl81ejJST3B0RQ%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CPcCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CPUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "kv_5z2ROptE",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CPUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "kv_5z2ROptE"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CPUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CPYCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CPUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CPMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "kv_5z2ROptE",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CPMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "kv_5z2ROptE"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CPMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CPQCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CPMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CPECEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CPICEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CPICEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CPECEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CPACENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "kv_5z2ROptE",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CPACENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "kv_5z2ROptE",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CPACENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CO4CEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CO8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CO8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CO4CEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CO0CEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "Cgtrdl81ejJST3B0RQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CO0CEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "COwCEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "kv_5z2ROptE"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "COoCELsvGAQiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CNgCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/ytMAmPQ7UqyX30XvKW9hsbe-OQwttN9f74k2qGvA2joPFnKFnqgDVzQQ49DHyth2DHKTXWn3puuI7bfX=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/ytMAmPQ7UqyX30XvKW9hsbe-OQwttN9f74k2qGvA2joPFnKFnqgDVzQQ49DHyth2DHKTXWn3puuI7bfX=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "COkCEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "COgCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "b7j_F_j1Vrk",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "COgCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu Chahinle - Humane Sagar"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu Chahinle - Humane Sagar"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu Chahinle",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CNgCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "b7j_F_j1Vrk",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Song"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Humane Sagar",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CNgCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCrGmNdTrGiR-ZSbxRgO1xtA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Song • Humane Sagar"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "1M plays"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "1 million plays"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "COcCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "b7j_F_j1Vrk",
                                          "playlistId": "RDAMVMb7j_F_j1Vrk",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk1iN2pfRl9qMVZyaw%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "COcCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "COUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "b7j_F_j1Vrk",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "COUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "b7j_F_j1Vrk"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "COUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "COYCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "COUCEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "COMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "b7j_F_j1Vrk",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "COMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "b7j_F_j1Vrk"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "COMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "COQCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "COMCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "COECEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "COICEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "COICEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "COECEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "COACENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "b7j_F_j1Vrk",
                                          "onAddCommand": {
                                            "clickTrackingParams": "COACENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "b7j_F_j1Vrk",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "COACENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CN4CEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CN8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CN8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CN4CEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to album"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ALBUM"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CN0CEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPREb_8gAIn1VhoJE",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CN0CEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNwCEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UCrGmNdTrGiR-ZSbxRgO1xtA",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNwCEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "View song credits"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "PEOPLE_GROUP"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNsCEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPTCb7j_F_j1Vrk",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_TRACK_CREDITS"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNsCEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNoCEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "CgtiN2pfRl9qMVZyaw%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CNoCEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CNkCEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "b7j_F_j1Vrk"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CNcCELsvGAUiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CMUCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/8rcPUY_axCJpmXE7z1tW3ipwgiVVJBmkH05BZTbzUkQ1zYooRjIb2Zfoqj9_hdQPIp0wuV3NJmMbLVA=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/8rcPUY_axCJpmXE7z1tW3ipwgiVVJBmkH05BZTbzUkQ1zYooRjIb2Zfoqj9_hdQPIp0wuV3NJmMbLVA=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CNYCEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CNUCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "5U5Ru0nTiUM",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CNUCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tere Liye - Atif Aslam"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tere Liye - Atif Aslam"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tere Liye",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CMUCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "5U5Ru0nTiUM",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Song"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Atif Aslam",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CMUCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCVGomUS__PL0c4jDXa0QwXA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": ", "
                                      },
                                      {
                                        "text": "Shreya Ghoshal",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CMUCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCrC-7fsdTCYeaRBpwA6j-Eg",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " & "
                                      },
                                      {
                                        "text": "Sachin Gupta",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CMUCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCSXkFfQZF9mQQjddxxAVJwA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Song • Atif Aslam, Shreya Ghoshal & Sachin Gupta"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "817M plays"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "817 million plays"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNQCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "5U5Ru0nTiUM",
                                          "playlistId": "RDAMVM5U5Ru0nTiUM",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk01VTVSdTBuVGlVTQ%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNQCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CNICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "5U5Ru0nTiUM",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CNICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "5U5Ru0nTiUM"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CNICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CNMCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CNICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CNACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "5U5Ru0nTiUM",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CNACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "5U5Ru0nTiUM"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CNACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CNECEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CNACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CM4CEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CM8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CM8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CM4CEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CM0CENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "5U5Ru0nTiUM",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CM0CENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "5U5Ru0nTiUM",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CM0CENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMsCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CMwCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CMwCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMsCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to album"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ALBUM"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMoCEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPREb_5Wlwwq01i5h",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMoCEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMkCEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UCVGomUS__PL0c4jDXa0QwXA",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMkCEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "View song credits"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "PEOPLE_GROUP"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMgCEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPTC5U5Ru0nTiUM",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_TRACK_CREDITS"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMgCEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMcCEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "Cgs1VTVSdTBuVGlVTQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CMcCEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CMYCEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "5U5Ru0nTiUM"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CMQCELsvGAYiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CLMCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/chAxRbxUzi84AduHseh1sVf0i9JD7rLS9VF6KPnZ7pgd4V3X_DQZlKqxvteDL5_XJCCIZDm_oxdU9V4h=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/chAxRbxUzi84AduHseh1sVf0i9JD7rLS9VF6KPnZ7pgd4V3X_DQZlKqxvteDL5_XJCCIZDm_oxdU9V4h=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CMMCEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CMICEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "7KAOseZ-pu0",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CMICEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu Chahiye - S Jayy"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu Chahiye - S Jayy"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu Chahiye",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CLMCEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "7KAOseZ-pu0",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Song"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "S Jayy"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Song • S Jayy"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "481K plays"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "481 thousand plays"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMECEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "7KAOseZ-pu0",
                                          "playlistId": "RDAMVM7KAOseZ-pu0",
                                          "params": "wAEB",
                                          "playerParams": "0gcJCZQAzrrq_1rT",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk03S0FPc2VaLXB1MA%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CMECEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CL8CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "7KAOseZ-pu0",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CL8CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "7KAOseZ-pu0"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CL8CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CMACEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CL8CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CL0CEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "7KAOseZ-pu0",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CL0CEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "7KAOseZ-pu0"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CL0CEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CL4CEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CL0CEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CLsCEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CLwCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CLwCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CLsCEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CLoCENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "7KAOseZ-pu0",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CLoCENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "7KAOseZ-pu0",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLoCENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLgCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CLkCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CLkCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLgCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to album"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ALBUM"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLcCEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPREb_AZfOvL11fvC",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLcCEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "View song credits"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "PEOPLE_GROUP"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLYCEK-jChgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPTC7KAOseZ-pu0",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_TRACK_CREDITS"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLYCEK-jChgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLUCEJH7BRgIIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "Cgs3S0FPc2VaLXB1MA%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CLUCEJH7BRgIIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CLQCEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "7KAOseZ-pu0"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CLICELsvGAciEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CKACEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/sRHMm6JYF7_XRzGBAQmDH3VtPhMDkVH9ajTRGU22WC1MhE_Xa19PFB-KMT1Toc-PZCuXJP-F2JwK3T8S=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/sRHMm6JYF7_XRzGBAQmDH3VtPhMDkVH9ajTRGU22WC1MhE_Xa19PFB-KMT1Toc-PZCuXJP-F2JwK3T8S=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CLECEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CLACEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "BU5kkhpgLz8",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CLACEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Deewaniyat (From \"Ek Deewane Ki Deewaniyat\") (Original Motion Picture Soundtrack) - Vishal Mishra"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Deewaniyat (From \"Ek Deewane Ki Deewaniyat\") (Original Motion Picture Soundtrack) - Vishal Mishra"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Deewaniyat (From \"Ek Deewane Ki Deewaniyat\") (Original Motion Picture Soundtrack)",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CKACEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "BU5kkhpgLz8",
                                            "playerParams": "0gcJCRsC0OBS9m0t",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Song"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Vishal Mishra",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CKACEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UC25UGbOHCuT5Jht2ItRXTqQ",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": ", "
                                      },
                                      {
                                        "text": "Kaushik-Guddu",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CKACEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCmMurJIUhT_GtQ6UsbyuZmg",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " & "
                                      },
                                      {
                                        "text": "Kunaal Vermaa",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CKACEOFnGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCc61x1uGM3omXh-28ajbLig",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Song • Vishal Mishra, Kaushik-Guddu & Kunaal Vermaa"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "444M plays"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "444 million plays"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CK8CEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "BU5kkhpgLz8",
                                          "playlistId": "RDAMVMBU5kkhpgLz8",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk1CVTVra2hwZ0x6OA%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_ATV"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CK8CEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CK0CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "BU5kkhpgLz8",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CK0CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "BU5kkhpgLz8"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CK0CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CK4CEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CK0CEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CKsCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "BU5kkhpgLz8",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CKsCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "BU5kkhpgLz8"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CKsCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CKwCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CKsCEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CKkCEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CKoCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CKoCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CKkCEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CKgCENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "BU5kkhpgLz8",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CKgCENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "BU5kkhpgLz8",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CKgCENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKYCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CKcCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CKcCEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CKYCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to album"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ALBUM"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKUCEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPREb_tvzHsbqcdDD",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CKUCEI_7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKQCEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UC25UGbOHCuT5Jht2ItRXTqQ",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CKQCEJD7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "View song credits"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "PEOPLE_GROUP"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKMCEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "MPTCBU5kkhpgLz8",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_TRACK_CREDITS"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CKMCEK-jChgIIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKICEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "CgtCVTVra2hwZ0x6OA%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CKICEJH7BRgJIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CKECEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "BU5kkhpgLz8"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CJ8CELsvGAgiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CJkCENVoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/ykJkyILKum4B2oudDxjnf5WNenWWZAp-WEz0_CHp4cu0VnqB2-uaNDylItqC68WLXV62rdHDun-ahbg=w60-h60-p-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/ykJkyILKum4B2oudDxjnf5WNenWWZAp-WEz0_CHp4cu0VnqB2-uaNDylItqC68WLXV62rdHDun-ahbg=w120-h120-p-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_CIRCLE",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FILL",
                                "trackingParams": "CJ4CEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Atif Aslam"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Artist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "340M monthly audience"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Artist • 340M monthly audience"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJ0CEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAOFPe0Il7VRMAhME7tUfu50A",
                                          "params": "wAEB8gECGAE%3D"
                                        }
                                      },
                                      "trackingParams": "CJ0CEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJwCEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDEMFPe0Il7VRMAhME7tUfu50A",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CJwCEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJsCEJH7BRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "GhhVQ1ZHb21VU19fUEwwYzRqRFhhMFF3WEE%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CJsCEJH7BRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CJoCEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CJkCENVoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "UCVGomUS__PL0c4jDXa0QwXA",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CJgCELsvGAkiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CIgCENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/GE28xXGUMC0nProPJHJX1f-wc9SiqkwSzmjybM1YVQadYPTLmzYXarzMsJyb1ucv8-YS7CZ0m-2eG8AL-g=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/GE28xXGUMC0nProPJHJX1f-wc9SiqkwSzmjybM1YVQadYPTLmzYXarzMsJyb1ucv8-YS7CZ0m-2eG8AL-g=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/GE28xXGUMC0nProPJHJX1f-wc9SiqkwSzmjybM1YVQadYPTLmzYXarzMsJyb1ucv8-YS7CZ0m-2eG8AL-g=w226-h226-l90-rj",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/GE28xXGUMC0nProPJHJX1f-wc9SiqkwSzmjybM1YVQadYPTLmzYXarzMsJyb1ucv8-YS7CZ0m-2eG8AL-g=w544-h544-l90-rj",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CJcCEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CJYCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "OLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo"
                                      }
                                    },
                                    "trackingParams": "CJYCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu Chahiye Yeshu"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu Chahiye Yeshu"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu Chahiye Yeshu"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Album"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Yabesh Nag",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CIgCENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCESphS-5VDa3_oIJ3qyM4kg",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "2020"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJUCEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "OLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo",
                                          "params": "wAEB8gECKAE%3D"
                                        }
                                      },
                                      "trackingParams": "CJUCEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJQCEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLOLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CJQCEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CJICEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "OLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CJICEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "OLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CJICEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Album will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CJMCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CJICEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CJACEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "OLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CJACEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "OLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CJACEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Album added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CJECEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CJACEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save album to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CI4CEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CI8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CI8CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove album from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CI4CEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "OLAK5uy_mAnmDiWrfN1VDsiiGtJHvHjWChRYwUaSo"
                                          }
                                        }
                                      },
                                      "trackingParams": "CI4CEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIwCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CI0CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CI0CEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CIwCEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIsCEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UCESphS-5VDa3_oIJ3qyM4kg",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CIsCEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIoCEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EilPTEFLNXV5X21Bbm1EaVdyZk4xVkRzaWlHdEpIdkhqV0NoUll3VWFTbw%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CIoCEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CIkCEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CIgCENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "MPREb_7CoK0Z2a96U",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CIcCELsvGAoiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CPgBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/a_cc_kkEank/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3mdIH1LSfmTjiKXJGrAjL3lBhtvhQ",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CIYCEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CIUCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "a_cc_kkEank",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CIUCEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu Chahiye - [Slowed+Reverb] Atif Aslam | Bajrangi Bhaijaan | Salman Khan | @iSpeak.Loudly Lofi Vibe - iSpeak Loudly "
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu Chahiye - [Slowed+Reverb] Atif Aslam | Bajrangi Bhaijaan | Salman Khan | @iSpeak.Loudly Lofi Vibe - iSpeak Loudly "
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu Chahiye - [Slowed+Reverb] Atif Aslam | Bajrangi Bhaijaan | Salman Khan | @iSpeak.Loudly Lofi Vibe",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CPgBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "a_cc_kkEank",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Video"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "iSpeak Loudly ",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CPgBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCNlIpmMM12ld3BilPbsGu5Q",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "8.1M views"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Video • iSpeak Loudly  • 8.1 million views"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIQCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "a_cc_kkEank",
                                          "playlistId": "RDAMVMa_cc_kkEank",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk1hX2NjX2trRWFuaw%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_UGC"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CIQCEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CIICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "a_cc_kkEank",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CIICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "a_cc_kkEank"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CIICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CIMCEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CIICEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CIACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "a_cc_kkEank",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CIACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "a_cc_kkEank"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CIACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CIECEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CIACEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CP4BEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CP8BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CP8BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CP4BEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CP0BENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "a_cc_kkEank",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CP0BENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "a_cc_kkEank",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CP0BENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CPsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CPwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CPwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CPsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CPoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "CgthX2NjX2trRWFuaw%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CPoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CPkBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "a_cc_kkEank"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CPcBELsvGAsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "COcBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/_-AqQXfgs7k/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3mVTDi_R_Bo5t3LmMFpbFiNR7W0LQ",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CPYBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CPUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "_-AqQXfgs7k",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CPUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play 'Tu Chahiye' Full Song with LYRICS Pritam | Bajrangi Bhaijaan | Salman Khan, Kareena Kapoor - Amitabh Bhattacharya"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause 'Tu Chahiye' Full Song with LYRICS Pritam | Bajrangi Bhaijaan | Salman Khan, Kareena Kapoor - Amitabh Bhattacharya"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "'Tu Chahiye' Full Song with LYRICS Pritam | Bajrangi Bhaijaan | Salman Khan, Kareena Kapoor",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "COcBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaGaAQMQ9CTKAQS0Rf-X",
                                          "watchEndpoint": {
                                            "videoId": "_-AqQXfgs7k",
                                            "watchEndpointMusicSupportedConfigs": {
                                              "watchEndpointMusicConfig": {
                                                "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Video"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Amitabh Bhattacharya",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "COcBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCRQmZ4lsrzXAyvKRV1DSMYA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": ", "
                                      },
                                      {
                                        "text": "Atif Aslam",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "COcBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCVGomUS__PL0c4jDXa0QwXA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " & "
                                      },
                                      {
                                        "text": "Shankar–Ehsaan–Loy",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "COcBENNoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCD1yqtH3tB9pstyoJFpHl_w",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "1.4M views"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Video • Amitabh Bhattacharya, Atif Aslam & Shankar–Ehsaan–Loy • 1.4 million views"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CPQBEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hmgEDEPQkygEEtEX_lw==",
                                        "watchEndpoint": {
                                          "videoId": "_-AqQXfgs7k",
                                          "playlistId": "RDAMVM_-AqQXfgs7k",
                                          "params": "wAEB",
                                          "loggingContext": {
                                            "vssLoggingContext": {
                                              "serializedContextData": "GhFSREFNVk1fLUFxUVhmZ3M3aw%3D%3D"
                                            }
                                          },
                                          "watchEndpointMusicSupportedConfigs": {
                                            "watchEndpointMusicConfig": {
                                              "musicVideoType": "MUSIC_VIDEO_TYPE_OMV"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CPQBEJvzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CPIBEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "_-AqQXfgs7k",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CPIBEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "_-AqQXfgs7k"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CPIBEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CPMBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CPIBEL7uBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CPABEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "_-AqQXfgs7k",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CPABEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "_-AqQXfgs7k"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CPABEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Song added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CPEBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CPABEPvvBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Add to liked songs"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "FAVORITE"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CO4BEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CO8BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CO8BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from liked songs"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "UNFAVORITE"
                                      },
                                      "trackingParams": "CO4BEIyfBhgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CO0BENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "_-AqQXfgs7k",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CO0BENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "_-AqQXfgs7k",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CO0BENGqBRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "badgeIcon": {
                                        "iconType": "PREMIUM_STANDALONE_CAIRO"
                                      }
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "COsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "COwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "COwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "COsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "COoBEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UCRQmZ4lsrzXAyvKRV1DSMYA",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "COoBEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "COkBEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "CgtfLUFxUVhmZ3M3aw%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "COkBEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "COgBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "_-AqQXfgs7k"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "COYBELsvGAwiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CNcBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/vwkR8wTzQYQbMuE6l7yRHrtXy2TXN882ZRInYZxGUfyWnJqN_0HTjl4bW592EEQmHexZq1ApOg=s192",
                                      "width": 192,
                                      "height": 192
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/vwkR8wTzQYQbMuE6l7yRHrtXy2TXN882ZRInYZxGUfyWnJqN_0HTjl4bW592EEQmHexZq1ApOg=s576",
                                      "width": 576,
                                      "height": 576
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/vwkR8wTzQYQbMuE6l7yRHrtXy2TXN882ZRInYZxGUfyWnJqN_0HTjl4bW592EEQmHexZq1ApOg=s1200",
                                      "width": 1200,
                                      "height": 1200
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "COUBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "COQBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "PLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C",
                                        "params": "wAEB"
                                      }
                                    },
                                    "trackingParams": "COQBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu chahiye"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu chahiye"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu chahiye"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Playlist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Akanksha Singh",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CNcBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UCas_y4Xe7CWIYqR8ffbTOwQ",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "85 views"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "COMBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "PLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C",
                                          "params": "wAEB8gECKAE%3D"
                                        }
                                      },
                                      "trackingParams": "COMBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "COIBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLPLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "COIBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "COABEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "PLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "COABEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "PLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "COABEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "COEBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "COABEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CN4BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "PLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CN4BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "PLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CN4BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CN8BEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CN4BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save playlist to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CNwBEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CN0BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CN0BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove playlist from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CNwBEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "PLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C"
                                          }
                                        }
                                      },
                                      "trackingParams": "CNwBEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNoBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CNsBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CNsBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CNoBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNkBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EiJQTEFuZTB4ODBHQTdGUG14NE0tbDlCRE9XY1l5ZW9UQjdD",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CNkBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CNgBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CNcBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "browseEndpoint": {
                                "browseId": "VLPLAne0x80GA7FPmx4M-l9BDOWcYyeoTB7C",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PLAYLIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CNYBELsvGA0iEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CNABENVoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/CkSBKxmPT_97r-CR5HPGrTzZef53Li3Zgv5S8MLajtLFTrYWejm3lvJqB15bjhqYaw5pvkzR=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/CkSBKxmPT_97r-CR5HPGrTzZef53Li3Zgv5S8MLajtLFTrYWejm3lvJqB15bjhqYaw5pvkzR=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_CIRCLE",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FILL",
                                "trackingParams": "CNUBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Vishal Mishra"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Artist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "350M monthly audience"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Artist • 350M monthly audience"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAObfg9xMTAgrYzwxGepLhZhg",
                                          "params": "wAEB8gECGAE%3D"
                                        }
                                      },
                                      "trackingParams": "CNQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDEMbfg9xMTAgrYzwxGepLhZhg",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CNMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CNIBEJH7BRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "GhhVQzI1VUdiT0hDdVQ1Smh0Mkl0UlhUcVE%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CNIBEJH7BRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CNEBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CNABENVoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "UC25UGbOHCuT5Jht2ItRXTqQ",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CM8BELsvGA4iEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CMkBENVoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/sjGMYJQ1J3FZEIBsMYUztMjjYOM4-NJ24CjmIHqxTWCxAM1YgjL-d_17u7_PRhTouOwwAjbu-2x5S6I=w60-h60-p-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/sjGMYJQ1J3FZEIBsMYUztMjjYOM4-NJ24CjmIHqxTWCxAM1YgjL-d_17u7_PRhTouOwwAjbu-2x5S6I=w120-h120-p-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_CIRCLE",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FILL",
                                "trackingParams": "CM4BEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Pritam"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Artist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "552M monthly audience"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Artist • 552M monthly audience"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CM0BEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAOjjdJvHYyMRd9suSqkF9eeg",
                                          "params": "wAEB8gECGAE%3D"
                                        }
                                      },
                                      "trackingParams": "CM0BEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMwBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDEMjjdJvHYyMRd9suSqkF9eeg",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CMwBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMsBEJH7BRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "GhhVQ0NUTjAxcGxGem40bnBSRUhLVDJfOVE%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CMsBEJH7BRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CMoBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CMkBENVoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "UCCTN01plFzn4npREHKT2_9Q",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CMgBELsvGA8iEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CLgBENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/s_aO5qlht0NYQ3POkE_dZPUrUTMyQq9MsdY-XuD-hQw3JzvHSJNLSucyCmrjxXTuH0rtvIVVlTg4wyrO=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/s_aO5qlht0NYQ3POkE_dZPUrUTMyQq9MsdY-XuD-hQw3JzvHSJNLSucyCmrjxXTuH0rtvIVVlTg4wyrO=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/s_aO5qlht0NYQ3POkE_dZPUrUTMyQq9MsdY-XuD-hQw3JzvHSJNLSucyCmrjxXTuH0rtvIVVlTg4wyrO=w226-h226-l90-rj",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/s_aO5qlht0NYQ3POkE_dZPUrUTMyQq9MsdY-XuD-hQw3JzvHSJNLSucyCmrjxXTuH0rtvIVVlTg4wyrO=w544-h544-l90-rj",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CMcBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CMYBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "OLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI"
                                      }
                                    },
                                    "trackingParams": "CMYBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu Chahiye Mujhe"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu Chahiye Mujhe"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu Chahiye Mujhe"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "EP"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Priyaanshi Verma",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CLgBENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCa6xHGojyplICC13ju4Xihw",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "2026"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMUBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "OLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI",
                                          "params": "wAEB8gECKAE%3D"
                                        }
                                      },
                                      "trackingParams": "CMUBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CMQBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLOLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CMQBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CMIBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "OLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CMIBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "OLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CMIBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Album will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CMMBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CMIBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CMABEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "OLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CMABEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "OLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CMABEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Album added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CMEBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CMABEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save album to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CL4BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CL8BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CL8BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove album from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CL4BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "OLAK5uy_mtnqJdZlfGpzEg-SEhyRht9AWfMGBxTLI"
                                          }
                                        }
                                      },
                                      "trackingParams": "CL4BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLwBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CL0BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CL0BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLwBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to artist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ARTIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLsBEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "browseEndpoint": {
                                          "browseId": "UCa6xHGojyplICC13ju4Xihw",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_ARTIST"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CLsBEJD7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLoBEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EilPTEFLNXV5X210bnFKZFpsZkdwekVnLVNFaHlSaHQ5QVdmTUdCeFRMSQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CLoBEJH7BRgHIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CLkBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CLgBENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "MPREb_Z4Lw3UCmA8K",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CLcBELsvGBAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CKgBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/WTLLym2wzIM/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3lS8Iy8WVOWIvs_F8sYt0-Ay6ZZ_Q",
                                      "width": 400,
                                      "height": 225
                                    },
                                    {
                                      "url": "https://i.ytimg.com/vi/WTLLym2wzIM/hq720.jpg?sqp=-oaymwEKCKAGEMIDIABIWg&rs=AMzJL3nFWD08YXbtIpWwiX63Gedk2DqY5Q",
                                      "width": 800,
                                      "height": 450
                                    },
                                    {
                                      "url": "https://i.ytimg.com/vi/WTLLym2wzIM/hq720.jpg?sqp=-oaymwEKCNUGEN8DIABIWg&rs=AMzJL3kETaVSRIRZiz47K-Bm_IamdlDGYg",
                                      "width": 853,
                                      "height": 479
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CLYBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CLUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "PLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc",
                                        "params": "wAEB"
                                      }
                                    },
                                    "trackingParams": "CLUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu chahiye"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu chahiye"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu chahiye"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Playlist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Megha Gupta",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CKgBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UCzFAWdZRQ_q5iMxKgbvDeZw",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "12 views"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "PLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc",
                                          "params": "wAEB8gECKAE%3D"
                                        }
                                      },
                                      "trackingParams": "CLQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CLMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLPLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CLMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CLEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "PLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CLEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "PLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CLEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CLIBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CLEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CK8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "PLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CK8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "PLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CK8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CLABEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CK8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save playlist to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CK0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CK4BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CK4BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove playlist from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CK0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "PLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc"
                                          }
                                        }
                                      },
                                      "trackingParams": "CK0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CKwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CKwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CKsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EiJQTGtHa19CWE8wdWwwRk1xTXFCUHlNX1ZCb0ZQRTFmcldj",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CKoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CKkBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CKgBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "browseEndpoint": {
                                "browseId": "VLPLkGk_BXO0ul0FMqMqBPyM_VBoFPE1frWc",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PLAYLIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CKcBELsvGBEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CJgBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/zuvla6ABKbs/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3mAu-mlIo-2bYayxg9SxDVzuBWa2A",
                                      "width": 400,
                                      "height": 225
                                    },
                                    {
                                      "url": "https://i.ytimg.com/vi/zuvla6ABKbs/hq720.jpg?sqp=-oaymwEKCKAGEMIDIABIWg&rs=AMzJL3lFZJZnc2K838UuJmhNt7vrE0ulZQ",
                                      "width": 800,
                                      "height": 450
                                    },
                                    {
                                      "url": "https://i.ytimg.com/vi/zuvla6ABKbs/hq720.jpg?sqp=-oaymwEKCNUGEN8DIABIWg&rs=AMzJL3kf9w43XUzKGRjtv8teW8WLCzZ6Zw",
                                      "width": 853,
                                      "height": 479
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CKYBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CKUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "PLwMErUyku6eYC6HPqnNNgJm2G11D12xSb",
                                        "params": "wAEB"
                                      }
                                    },
                                    "trackingParams": "CKUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Tu chahiye"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Tu chahiye"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Tu chahiye"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Playlist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "sonal d",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CJgBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                          "browseEndpoint": {
                                            "browseId": "UCMvGz-ymscqr7RagCvgii7A",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "33 views"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "PLwMErUyku6eYC6HPqnNNgJm2G11D12xSb",
                                          "params": "wAEB8gECKAE%3D"
                                        }
                                      },
                                      "trackingParams": "CKQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CKMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLPLwMErUyku6eYC6HPqnNNgJm2G11D12xSb",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CKMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CKEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "PLwMErUyku6eYC6HPqnNNgJm2G11D12xSb",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CKEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "PLwMErUyku6eYC6HPqnNNgJm2G11D12xSb"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CKEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CKIBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CKEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CJ8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "PLwMErUyku6eYC6HPqnNNgJm2G11D12xSb",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CJ8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "PLwMErUyku6eYC6HPqnNNgJm2G11D12xSb"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CJ8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CKABEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CJ8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save playlist to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CJ0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CJ4BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CJ4BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove playlist from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CJ0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "PLwMErUyku6eYC6HPqnNNgJm2G11D12xSb"
                                          }
                                        }
                                      },
                                      "trackingParams": "CJ0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CJwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CJwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CJsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EiJQTHdNRXJVeWt1NmVZQzZIUHFuTk5nSm0yRzExRDEyeFNi",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CJoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CJkBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CJgBENafBxgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                              "browseEndpoint": {
                                "browseId": "VLPLwMErUyku6eYC6HPqnNNgJm2G11D12xSb",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PLAYLIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CJcBELsvGBIiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CIgBENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/YhfxMnFuN6yInysHCNJ5us8FiwkhgUGec8ejzcUbC9kZxB1c4tYFG8DKZupFxNThI8WKPywufqvl-kh6Fg=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/YhfxMnFuN6yInysHCNJ5us8FiwkhgUGec8ejzcUbC9kZxB1c4tYFG8DKZupFxNThI8WKPywufqvl-kh6Fg=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/YhfxMnFuN6yInysHCNJ5us8FiwkhgUGec8ejzcUbC9kZxB1c4tYFG8DKZupFxNThI8WKPywufqvl-kh6Fg=w226-h226-l90-rj",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/YhfxMnFuN6yInysHCNJ5us8FiwkhgUGec8ejzcUbC9kZxB1c4tYFG8DKZupFxNThI8WKPywufqvl-kh6Fg=w544-h544-l90-rj",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CJYBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CJUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "OLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q"
                                      }
                                    },
                                    "trackingParams": "CJUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Hits Of Atif Aslam"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Hits Of Atif Aslam"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Hits Of Atif Aslam"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Album"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Various Artists"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "2020"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "OLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q",
                                          "params": "wAEB8gECKAE%3D"
                                        }
                                      },
                                      "trackingParams": "CJQBEJrzBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CJMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLOLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CJMBEJvzBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CJEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "OLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CJEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "OLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CJEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Album will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CJIBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CJEBEL7uBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CI8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "OLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CI8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "playlistId": "OLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CI8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Album added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CJABEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CI8BEPvvBRgDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save album to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CI0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CI4BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CI4BEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove album from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CI0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "OLAK5uy_ljxDMvmrFHW5qh8ZrZ5P5HKtQ5Hisk_4Q"
                                          }
                                        }
                                      },
                                      "trackingParams": "CI0BEIT_BRgEIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CIwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CIwBEPBbIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CIsBEMOUBhgFIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CIoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EilPTEFLNXV5X2xqeERNdm1yRkhXNXFoOFpyWjVQNUhLdFE1SGlza180UQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CIoBEJH7BRgGIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  }
                                ],
                                "trackingParams": "CIkBEKc7IhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CIgBENRoGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "MPREb_Iu1CE6vpSc9",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_ALBUM"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CIcBELsvGBMiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CHcQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/8vPbzyXjCTM/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3kqzf6ZuBmE829LDZPVLH-2ikSnMQ",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CIYBEIS_AiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CIUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                      "watchEndpoint": {
                                        "videoId": "8vPbzyXjCTM",
                                        "params": "8gEDmAEI",
                                        "playerParams": "0gcJCQYB-iE-y48-",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_PODCAST_EPISODE"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CIUBEMjeAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Mujhe Shirf Tu Chahiye 🥺🙏😣 | Dard Bhari Shayari 😭🤕 | Mood Off Shayari 😤😣 | @OyeshayarG  - Oye shayar G"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Mujhe Shirf Tu Chahiye 🥺🙏😣 | Dard Bhari Shayari 😭🤕 | Mood Off Shayari 😤😣 | @OyeshayarG  - Oye shayar G"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Mujhe Shirf Tu Chahiye 🥺🙏😣 | Dard Bhari Shayari 😭🤕 | Mood Off Shayari 😤😣 | @OyeshayarG ",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CHcQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "MPED8vPbzyXjCTM",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_NON_MUSIC_AUDIO_TRACK_PAGE"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Episode"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Jun 5"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Sad Shayari Video 🥀😭💔",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CHcQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "MPSPPLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Episode • Jun 5 • Sad Shayari Video 🥀😭💔"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CIMBEL7uBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "8vPbzyXjCTM",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CIMBEL7uBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "8vPbzyXjCTM"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CIMBEL7uBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Episode will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CIQBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CIMBEL7uBRgAIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CIEBEPvvBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "8vPbzyXjCTM",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CIEBEPvvBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "watchEndpoint": {
                                                "videoId": "8vPbzyXjCTM"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CIEBEPvvBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Episode added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CIIBEMrHAyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CIEBEPvvBRgBIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CIABENGqBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                        "offlineVideoEndpoint": {
                                          "videoId": "8vPbzyXjCTM",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CIABENGqBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                            "getDownloadActionCommand": {
                                              "videoId": "8vPbzyXjCTM",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CIABENGqBRgCIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CH4Qw5QGGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CH8Q8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CH8Q8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CH4Qw5QGGAMiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to podcast"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "BROADCAST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CH0QgqIJGAQiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "browseEndpoint": {
                                          "browseId": "MPSPPLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CH0QgqIJGAQiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CHwQkfsFGAUiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "Cgs4dlBienlYakNUTQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CHwQkfsFGAUiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CHgQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "topLevelButtons": [
                                  {
                                    "likeButtonRenderer": {
                                      "target": {
                                        "videoId": "8vPbzyXjCTM"
                                      },
                                      "likeStatus": "INDIFFERENT",
                                      "trackingParams": "CHkQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                      "likesAllowed": true,
                                      "dislikeNavigationEndpoint": {
                                        "clickTrackingParams": "CHkQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Not a fan?"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve your recommendations after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CHsQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CHsQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "likeCommand": {
                                        "clickTrackingParams": "CHkQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CHoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CHoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                ],
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "8vPbzyXjCTM"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CHYQuy8YFCITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CGYQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/ILO48d1jG_w/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3lJRUypLdRVFCqLyZ0lShkl67M_oQ",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CHUQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CHQQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "watchEndpoint": {
                                        "videoId": "ILO48d1jG_w",
                                        "params": "8gEDmAEI",
                                        "playerParams": "0gcJCQYB-iE-y48-",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_PODCAST_EPISODE"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CHQQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Own Karachi || Jawab tu Chahiye Featuring Adeel Khan || HKM Hum Karachi Media - HKM Hum Karachi Media"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Own Karachi || Jawab tu Chahiye Featuring Adeel Khan || HKM Hum Karachi Media - HKM Hum Karachi Media"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Own Karachi || Jawab tu Chahiye Featuring Adeel Khan || HKM Hum Karachi Media",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CGYQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "MPEDILO48d1jG_w",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_NON_MUSIC_AUDIO_TRACK_PAGE"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Episode"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Feb 19, 2024"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Karachi Wifi",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CGYQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "MPSPPLRCA_meGIdVrQK6SpirFCWlV-WsCOY02S",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Episode • Feb 19, 2024 • Karachi Wifi"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CHIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "ILO48d1jG_w",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CHIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "videoId": "ILO48d1jG_w"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CHIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Episode will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CHMQyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CHIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CHAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "ILO48d1jG_w",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CHAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "videoId": "ILO48d1jG_w"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CHAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Episode added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CHEQyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CHAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CG8Q0aoFGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "offlineVideoEndpoint": {
                                          "videoId": "ILO48d1jG_w",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CG8Q0aoFGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                            "getDownloadActionCommand": {
                                              "videoId": "ILO48d1jG_w",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CG8Q0aoFGAIiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CG0Qw5QGGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CG4Q8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CG4Q8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CG0Qw5QGGAMiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to podcast"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "BROADCAST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CGwQgqIJGAQiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "browseEndpoint": {
                                          "browseId": "MPSPPLRCA_meGIdVrQK6SpirFCWlV-WsCOY02S",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CGwQgqIJGAQiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CGsQkfsFGAUiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "CgtJTE80OGQxakdfdw%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CGsQkfsFGAUiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CGcQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "topLevelButtons": [
                                  {
                                    "likeButtonRenderer": {
                                      "target": {
                                        "videoId": "ILO48d1jG_w"
                                      },
                                      "likeStatus": "INDIFFERENT",
                                      "trackingParams": "CGgQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                      "likesAllowed": true,
                                      "dislikeNavigationEndpoint": {
                                        "clickTrackingParams": "CGgQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Not a fan?"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve your recommendations after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CGoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CGoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "likeCommand": {
                                        "clickTrackingParams": "CGgQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CGkQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CGkQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                ],
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "ILO48d1jG_w"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CGUQuy8YFSITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CGEQgawKGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/BYXS3WNE4F9hmZ2Gqdr67IlhnlsrUShOTg6L6jhV29jI15bpboBeHf2hGn49xjiMCbkUX6H8EnQ=w60-c-h60-k-c0x00ffffff-no-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/BYXS3WNE4F9hmZ2Gqdr67IlhnlsrUShOTg6L6jhV29jI15bpboBeHf2hGn49xjiMCbkUX6H8EnQ=w120-c-h120-k-c0x00ffffff-no-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_CIRCLE",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FILL",
                                "trackingParams": "CGQQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "VocalReplay"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Profile"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "@VocalReplay"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Profile • @VocalReplay"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CGMQkfsFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "GhhVQ2YtVWwzODRfUjl5ZmpONkZEemdyM2c%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CGMQkfsFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CGIQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CGEQgawKGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "UCf-Ul384_R9yfjN6FDzgr3g",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CGAQuy8YFiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CFwQgawKGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/sRWqNtQZPezRe-T3GdUPtulZvVQ2CqSk8aibR-RmZnPPCkoUGnTtqdxHvjKqVD_AOUoCQg1qEA=w60-c-h60-k-c0x00ffffff-no-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/sRWqNtQZPezRe-T3GdUPtulZvVQ2CqSk8aibR-RmZnPPCkoUGnTtqdxHvjKqVD_AOUoCQg1qEA=w120-c-h120-k-c0x00ffffff-no-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_CIRCLE",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FILL",
                                "trackingParams": "CF8QhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "TheMegha_Diaries "
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Profile"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "@medicinalove07"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Profile • @medicinalove07"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CF4QkfsFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "GhhVQ3F0SXRkb1p5RVpJamVGd0RVaWFEekE%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CF4QkfsFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CF0QpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CFwQgawKGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "UCqtItdoZyEZIjeFwDUiaDzA",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CFsQuy8YFyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CFcQgawKGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/tSF9w2AgZKCMLPC_5Qrl8qpHlcssdv5wh23_honcnlDoxK9oecxgWqKo76qFhxMRSq00bgQAWic=w60-c-h60-k-c0x00ffffff-no-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/tSF9w2AgZKCMLPC_5Qrl8qpHlcssdv5wh23_honcnlDoxK9oecxgWqKo76qFhxMRSq00bgQAWic=w120-c-h120-k-c0x00ffffff-no-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_CIRCLE",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FILL",
                                "trackingParams": "CFoQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "G_o_v_i_n_d.~K~.H_a_n_s"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Profile"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "@g_o_v_i_n_d.k.h_a_n_s8338"
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Profile • @g_o_v_i_n_d.k.h_a_n_s8338"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CFkQkfsFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "GhhVQzdnVEVteV9FV0JLa1JZUFJ3d3Nibnc%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CFkQkfsFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CFgQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CFcQgawKGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "UC7gTEmy_EWBKkRYPRwwsbnw",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CFYQuy8YGCITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CEYQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/vi/zx5EyFzsMKA/hqdefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCggAEOADGC0guwJIWg&rs=AMzJL3nb8WcjQ3MgwelfnKSrLPlkOH8pxQ",
                                      "width": 400,
                                      "height": 225
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CFUQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CFQQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "watchEndpoint": {
                                        "videoId": "zx5EyFzsMKA",
                                        "params": "8gEDmAEI",
                                        "watchEndpointMusicSupportedConfigs": {
                                          "watchEndpointMusicConfig": {
                                            "musicVideoType": "MUSIC_VIDEO_TYPE_PODCAST_EPISODE"
                                          }
                                        }
                                      }
                                    },
                                    "trackingParams": "CFQQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play I just want you ❤️ | Romantic Shayari Status | Love Shayari Status | Propose Shayari Status - MJ KI SHAYARI"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause I just want you ❤️ | Romantic Shayari Status | Love Shayari Status | Propose Shayari Status - MJ KI SHAYARI"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "I just want you ❤️ | Romantic Shayari Status | Love Shayari Status | Propose Shayari Status",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CEYQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "MPEDzx5EyFzsMKA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_NON_MUSIC_AUDIO_TRACK_PAGE"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Episode"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Sep 12, 2025"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Shayari",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CEYQ7eAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "MPSPPLSG1fdeVU09d0HrHfzM4mRAkGbPdJcr2t",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ],
                                    "accessibility": {
                                      "accessibilityData": {
                                        "label": "Episode • Sep 12, 2025 • Shayari"
                                      }
                                    }
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CFIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "zx5EyFzsMKA",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CFIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "videoId": "zx5EyFzsMKA"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CFIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Episode will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CFMQyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CFIQvu4FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CFAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "videoId": "zx5EyFzsMKA",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CFAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "videoId": "zx5EyFzsMKA"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CFAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Episode added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CFEQyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CFAQ--8FGAEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemDownloadRenderer": {
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CE8Q0aoFGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "offlineVideoEndpoint": {
                                          "videoId": "zx5EyFzsMKA",
                                          "onAddCommand": {
                                            "clickTrackingParams": "CE8Q0aoFGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                            "getDownloadActionCommand": {
                                              "videoId": "zx5EyFzsMKA",
                                              "params": "CAI%3D"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CE8Q0aoFGAIiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CE0Qw5QGGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CE4Q8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CE4Q8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CE0Qw5QGGAMiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Go to podcast"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "BROADCAST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CEwQgqIJGAQiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "browseEndpoint": {
                                          "browseId": "MPSPPLSG1fdeVU09d0HrHfzM4mRAkGbPdJcr2t",
                                          "browseEndpointContextSupportedConfigs": {
                                            "browseEndpointContextMusicConfig": {
                                              "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CEwQgqIJGAQiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CEsQkfsFGAUiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "Cgt6eDVFeUZ6c01LQQ%3D%3D",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CEsQkfsFGAUiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CEcQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "topLevelButtons": [
                                  {
                                    "likeButtonRenderer": {
                                      "target": {
                                        "videoId": "zx5EyFzsMKA"
                                      },
                                      "likeStatus": "INDIFFERENT",
                                      "trackingParams": "CEgQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                                      "likesAllowed": true,
                                      "dislikeNavigationEndpoint": {
                                        "clickTrackingParams": "CEgQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Not a fan?"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve your recommendations after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CEoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CEoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "likeCommand": {
                                        "clickTrackingParams": "CEgQpUEYBiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Like this song"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Improve recommendations and save music after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CEkQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CEkQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                ],
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "playlistItemData": {
                              "videoId": "zx5EyFzsMKA"
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CEUQuy8YGSITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CDYQ1Z8HGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/cV7A5G4rHqfvE7-7NyQROFg8pgmJIbPKXZuXH-wM1tj5_BcrE0FWNXeRA70SNt_TXJhQBctgQSfUG6s=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/cV7A5G4rHqfvE7-7NyQROFg8pgmJIbPKXZuXH-wM1tj5_BcrE0FWNXeRA70SNt_TXJhQBctgQSfUG6s=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/cV7A5G4rHqfvE7-7NyQROFg8pgmJIbPKXZuXH-wM1tj5_BcrE0FWNXeRA70SNt_TXJhQBctgQSfUG6s=w226-h226-l90-rj",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/cV7A5G4rHqfvE7-7NyQROFg8pgmJIbPKXZuXH-wM1tj5_BcrE0FWNXeRA70SNt_TXJhQBctgQSfUG6s=w544-h544-l90-rj",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CEQQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CEMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8",
                                        "params": "wAEB"
                                      }
                                    },
                                    "trackingParams": "CEMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Bollywood Love Aaj Kal"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Bollywood Love Aaj Kal"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Bollywood Love Aaj Kal"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Playlist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "YouTube Music"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "100 songs"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CEIQmvMFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8",
                                          "params": "wAEB8gECGAE%3D"
                                        }
                                      },
                                      "trackingParams": "CEIQmvMFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CEEQm_MFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLRDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CEEQm_MFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CD8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CD8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "playlistId": "RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CD8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CEAQyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CD8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CD0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CD0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "playlistId": "RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CD0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CD4QyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CD0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save playlist to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CDsQhP8FGAQiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CDwQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CDwQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove playlist from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CDsQhP8FGAQiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8"
                                          }
                                        }
                                      },
                                      "trackingParams": "CDsQhP8FGAQiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CDkQw5QGGAUiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CDoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CDoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CDkQw5QGGAUiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CDgQkfsFGAYiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EitSRENMQUs1dXlfa3ZCLVRlazFBWmNDVm1sYnlBOGlEZkJnRDRoUHhnZWM4",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CDgQkfsFGAYiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CDcQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CDYQ1Z8HGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "VLRDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PLAYLIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CDUQuy8YGiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CCYQ1Z8HGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://yt3.googleusercontent.com/kErRRaKzVl1S6dsdyd-EZQ4hwpat7U6JvraDOjTWT47_27XOOf3nvJK3YhULQBZdnTDBaSR9XU3z_MjY=w60-h60-l90-rj",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/kErRRaKzVl1S6dsdyd-EZQ4hwpat7U6JvraDOjTWT47_27XOOf3nvJK3YhULQBZdnTDBaSR9XU3z_MjY=w120-h120-l90-rj",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/kErRRaKzVl1S6dsdyd-EZQ4hwpat7U6JvraDOjTWT47_27XOOf3nvJK3YhULQBZdnTDBaSR9XU3z_MjY=w226-h226-l90-rj",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://yt3.googleusercontent.com/kErRRaKzVl1S6dsdyd-EZQ4hwpat7U6JvraDOjTWT47_27XOOf3nvJK3YhULQBZdnTDBaSR9XU3z_MjY=w544-h544-l90-rj",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CDQQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CDMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "RDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88",
                                        "params": "wAEB"
                                      }
                                    },
                                    "trackingParams": "CDMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Haryanvi Party"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Haryanvi Party"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Haryanvi Party"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Playlist"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "YouTube Music"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "97 songs"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Shuffle play"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MUSIC_SHUFFLE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CDIQmvMFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88",
                                          "params": "wAEB8gECGAE%3D"
                                        }
                                      },
                                      "trackingParams": "CDIQmvMFGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Start mix"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "MIX"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CDEQm_MFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "watchPlaylistEndpoint": {
                                          "playlistId": "RDAMPLRDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88",
                                          "params": "wAEB"
                                        }
                                      },
                                      "trackingParams": "CDEQm_MFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Play next"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "QUEUE_PLAY_NEXT"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CC8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "RDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CC8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "playlistId": "RDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AFTER_CURRENT_VIDEO",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CC8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist will play next"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CDAQyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CC8Qvu4FGAIiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuServiceItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Add to queue"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_REMOTE_QUEUE"
                                      },
                                      "serviceEndpoint": {
                                        "clickTrackingParams": "CC0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "queueAddEndpoint": {
                                          "queueTarget": {
                                            "playlistId": "RDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88",
                                            "onEmptyQueue": {
                                              "clickTrackingParams": "CC0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "watchEndpoint": {
                                                "playlistId": "RDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88"
                                              }
                                            }
                                          },
                                          "queueInsertPosition": "INSERT_AT_END",
                                          "commands": [
                                            {
                                              "clickTrackingParams": "CC0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                              "addToToastAction": {
                                                "item": {
                                                  "notificationTextRenderer": {
                                                    "successResponseText": {
                                                      "runs": [
                                                        {
                                                          "text": "Playlist added to queue"
                                                        }
                                                      ]
                                                    },
                                                    "trackingParams": "CC4QyscDIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "trackingParams": "CC0Q--8FGAMiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save playlist to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CCsQhP8FGAQiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CCwQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CCwQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove playlist from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CCsQhP8FGAQiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "RDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88"
                                          }
                                        }
                                      },
                                      "trackingParams": "CCsQhP8FGAQiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Save to playlist"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "ADD_TO_PLAYLIST"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CCkQw5QGGAUiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Make playlists and share them after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CCoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CCoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "trackingParams": "CCkQw5QGGAUiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CCgQkfsFGAYiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EitSRENMQUs1dXlfbU45dk9fZHlwc0p1Yk5kV2xPNUpTVHRDQTBTSTNvLTg4",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CCgQkfsFGAYiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CCcQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CCYQ1Z8HGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "VLRDCLAK5uy_mN9vO_dypsJubNdWlO5JSTtCA0SI3o-88",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PLAYLIST"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CCUQuy8YGyITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CB4Q7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLl_0061K4VnuU1xZBjvJlhg7JDfxV-hPu/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEICDwQPCAASFqi85f_AwYI5PWIuQY&rs=AMzJL3lqG6PtvqL3FX8rML31ZYmBx5kp8g",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLl_0061K4VnuU1xZBjvJlhg7JDfxV-hPu/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEICHgQeCAASFqi85f_AwYI5PWIuQY&rs=AMzJL3lcCm2Wf7k-AcQSELaRbTULQ45RIQ",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLl_0061K4VnuU1xZBjvJlhg7JDfxV-hPu/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjk9Yi5Bg&rs=AMzJL3l4doM1hb6uZarWfZPhVRB0Q74uHg",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLl_0061K4VnuU1xZBjvJlhg7JDfxV-hPu/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEKCKAEEKAEIABIWqLzl_8DBgjk9Yi5Bg&rs=AMzJL3kLO-vJ1ThF79RVUdw_byCG9dDIYg",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CCQQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CCMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "PLl_0061K4VnuU1xZBjvJlhg7JDfxV-hPu"
                                      }
                                    },
                                    "trackingParams": "CCMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Rajsthan ki lokdiviyo ke darshan new 2024 mata Rani Bhatiyani majisa #मातामंदिर #भक्तिस्थल #आध्यात्मिकयात्रा #मंदिरदर्शन #navratri #navratrikabhai"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Rajsthan ki lokdiviyo ke darshan new 2024 mata Rani Bhatiyani majisa #मातामंदिर #भक्तिस्थल #आध्यात्मिकयात्रा #मंदिरदर्शन #navratri #navratrikabhai"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Rajsthan ki lokdiviyo ke darshan new 2024 mata Rani Bhatiyani majisa #मातामंदिर #भक्तिस्थल #आध्यात्मिकयात्रा #मंदिरदर्शन #navratri #navratrikabhai"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Podcast"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Rao Jodha history and travel",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CB4Q7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCesQwrN3r1ui7aIM0GmcDyA",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CCEQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CCIQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CCIQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CCEQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "PLl_0061K4VnuU1xZBjvJlhg7JDfxV-hPu"
                                          }
                                        }
                                      },
                                      "trackingParams": "CCEQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CCAQkfsFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EiJQTGxfMDA2MUs0Vm51VTF4WkJqdkpsaGc3SkRmeFYtaFB1",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CCAQkfsFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CB8QpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CB4Q7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "MPSPPLl_0061K4VnuU1xZBjvJlhg7JDfxV-hPu",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CB0Quy8YHCITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CBYQ7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEICDwQPCAASFqi85f_AwYIjpLTqQY&rs=AMzJL3kIqQdeDnCW0RARP_bEDowdhQWzgw",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEICHgQeCAASFqi85f_AwYIjpLTqQY&rs=AMzJL3mm7b22DOSAB5LXznCxX8M2qvh0Hw",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEKCOIBEOIBIABIWqLzl_8DBgiOktOpBg&rs=AMzJL3mBp7Vcvy-3SCMVfF7E0ON5L_5GmQ",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEKCKAEEKAEIABIWqLzl_8DBgiOktOpBg&rs=AMzJL3liFQF7DJC6XiRZLapJgQ2RqDaR4w",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CBwQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CBsQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "PLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy"
                                      }
                                    },
                                    "trackingParams": "CBsQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play Sad Shayari Video 🥀😭💔"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause Sad Shayari Video 🥀😭💔"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Sad Shayari Video 🥀😭💔"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Podcast"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Oye shayar G",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CBYQ7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCSCdC01ktQemDa6ZlmD97fQ",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CBkQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CBoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CBoQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CBkQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "PLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy"
                                          }
                                        }
                                      },
                                      "trackingParams": "CBkQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CBgQkfsFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EiJQTE50YnZXMVZIR1BFYVFjSk5YekNLVVRGZ05xTnh2MkR5",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CBgQkfsFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CBcQpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CBYQ7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "MPSPPLNtbvW1VHGPEaQcJNXzCKUTFgNqNxv2Dy",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CBUQuy8YHSITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  },
                  {
                    "itemSectionRenderer": {
                      "contents": [
                        {
                          "musicResponsiveListItemRenderer": {
                            "trackingParams": "CA4Q7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                            "thumbnail": {
                              "musicThumbnailRenderer": {
                                "thumbnail": {
                                  "thumbnails": [
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLIks7O5WrJkU4XEmgx56RLj864WW04ueA/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEICDwQPCAASFqi85f_AwYImL74swY&rs=AMzJL3mzm-UIOD1AsveMKHEr2Nd3XtTVCw",
                                      "width": 60,
                                      "height": 60
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLIks7O5WrJkU4XEmgx56RLj864WW04ueA/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEICHgQeCAASFqi85f_AwYImL74swY&rs=AMzJL3mctXqT1juvUh7INtcHbkcUkFCddQ",
                                      "width": 120,
                                      "height": 120
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLIks7O5WrJkU4XEmgx56RLj864WW04ueA/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEKCOIBEOIBIABIWqLzl_8DBgiYvvizBg&rs=AMzJL3lXiYP66B4LvREiqwGLMNqNMGhFzQ",
                                      "width": 226,
                                      "height": 226
                                    },
                                    {
                                      "url": "https://i.ytimg.com/pl_c/PLIks7O5WrJkU4XEmgx56RLj864WW04ueA/studio_square_thumbnail.jpg?sqp=CIqX0NQG-oaymwEKCKAEEKAEIABIWqLzl_8DBgiYvvizBg&rs=AMzJL3lQwVmFx_piX3S8KOxClMMe5ubgyQ",
                                      "width": 544,
                                      "height": 544
                                    }
                                  ]
                                },
                                "thumbnailCrop": "MUSIC_THUMBNAIL_CROP_UNSPECIFIED",
                                "thumbnailScale": "MUSIC_THUMBNAIL_SCALE_ASPECT_FIT",
                                "trackingParams": "CBQQhL8CIhMI5rHV6JfIlgMVLHTrCB3ysR2h"
                              }
                            },
                            "overlay": {
                              "musicItemThumbnailOverlayRenderer": {
                                "background": {
                                  "verticalGradient": {
                                    "gradientLayerColors": [
                                      "3422552064",
                                      "3422552064"
                                    ]
                                  }
                                },
                                "content": {
                                  "musicPlayButtonRenderer": {
                                    "playNavigationEndpoint": {
                                      "clickTrackingParams": "CBMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2hygEEtEX_lw==",
                                      "watchPlaylistEndpoint": {
                                        "playlistId": "PLIks7O5WrJkU4XEmgx56RLj864WW04ueA"
                                      }
                                    },
                                    "trackingParams": "CBMQyN4CIhMI5rHV6JfIlgMVLHTrCB3ysR2h",
                                    "playIcon": {
                                      "iconType": "PLAY_ARROW"
                                    },
                                    "pauseIcon": {
                                      "iconType": "PAUSE"
                                    },
                                    "iconColor": 4294967295,
                                    "backgroundColor": 0,
                                    "activeBackgroundColor": 0,
                                    "loadingIndicatorColor": 14745645,
                                    "playingIcon": {
                                      "iconType": "VOLUME_UP"
                                    },
                                    "iconLoadingColor": 0,
                                    "activeScaleFactor": 1,
                                    "buttonSize": "MUSIC_PLAY_BUTTON_SIZE_SMALL",
                                    "rippleTarget": "MUSIC_PLAY_BUTTON_RIPPLE_TARGET_SELF",
                                    "accessibilityPlayData": {
                                      "accessibilityData": {
                                        "label": "Play 90’S Old Hindi Songs"
                                      }
                                    },
                                    "accessibilityPauseData": {
                                      "accessibilityData": {
                                        "label": "Pause 90’S Old Hindi Songs"
                                      }
                                    }
                                  }
                                },
                                "contentPosition": "MUSIC_ITEM_THUMBNAIL_OVERLAY_CONTENT_POSITION_CENTERED",
                                "displayStyle": "MUSIC_ITEM_THUMBNAIL_OVERLAY_DISPLAY_STYLE_PERSISTENT"
                              }
                            },
                            "flexColumns": [
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "90’S Old Hindi Songs"
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              },
                              {
                                "musicResponsiveListItemFlexColumnRenderer": {
                                  "text": {
                                    "runs": [
                                      {
                                        "text": "Podcast"
                                      },
                                      {
                                        "text": " • "
                                      },
                                      {
                                        "text": "Hindi Jukebox",
                                        "navigationEndpoint": {
                                          "clickTrackingParams": "CA4Q7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                          "browseEndpoint": {
                                            "browseId": "UCxMtBEZWaHUWuGjs-F1Vqpg",
                                            "browseEndpointContextSupportedConfigs": {
                                              "browseEndpointContextMusicConfig": {
                                                "pageType": "MUSIC_PAGE_TYPE_USER_CHANNEL"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "displayPriority": "MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
                                }
                              }
                            ],
                            "menu": {
                              "menuRenderer": {
                                "items": [
                                  {
                                    "toggleMenuServiceItemRenderer": {
                                      "defaultText": {
                                        "runs": [
                                          {
                                            "text": "Save to library"
                                          }
                                        ]
                                      },
                                      "defaultIcon": {
                                        "iconType": "BOOKMARK_BORDER"
                                      },
                                      "defaultServiceEndpoint": {
                                        "clickTrackingParams": "CBEQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "modalEndpoint": {
                                          "modal": {
                                            "modalWithTitleAndButtonRenderer": {
                                              "title": {
                                                "runs": [
                                                  {
                                                    "text": "Save this for later"
                                                  }
                                                ]
                                              },
                                              "content": {
                                                "runs": [
                                                  {
                                                    "text": "Save favorites to your library after signing in"
                                                  }
                                                ]
                                              },
                                              "button": {
                                                "buttonRenderer": {
                                                  "style": "STYLE_BLUE_TEXT",
                                                  "isDisabled": false,
                                                  "text": {
                                                    "runs": [
                                                      {
                                                        "text": "Sign in"
                                                      }
                                                    ]
                                                  },
                                                  "navigationEndpoint": {
                                                    "clickTrackingParams": "CBIQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                                    "signInEndpoint": {
                                                      "hack": true
                                                    }
                                                  },
                                                  "trackingParams": "CBIQ8FsiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "toggledText": {
                                        "runs": [
                                          {
                                            "text": "Remove from library"
                                          }
                                        ]
                                      },
                                      "toggledIcon": {
                                        "iconType": "BOOKMARK"
                                      },
                                      "toggledServiceEndpoint": {
                                        "clickTrackingParams": "CBEQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "likeEndpoint": {
                                          "status": "INDIFFERENT",
                                          "target": {
                                            "playlistId": "PLIks7O5WrJkU4XEmgx56RLj864WW04ueA"
                                          }
                                        }
                                      },
                                      "trackingParams": "CBEQhP8FGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                      "isToggled": false
                                    }
                                  },
                                  {
                                    "menuNavigationItemRenderer": {
                                      "text": {
                                        "runs": [
                                          {
                                            "text": "Share"
                                          }
                                        ]
                                      },
                                      "icon": {
                                        "iconType": "SHARE"
                                      },
                                      "navigationEndpoint": {
                                        "clickTrackingParams": "CBAQkfsFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                                        "shareEntityEndpoint": {
                                          "serializedShareEntity": "EiJQTElrczdPNVdySmtVNFhFbWd4NTZSTGo4NjRXVzA0dWVB",
                                          "sharePanelType": "SHARE_PANEL_TYPE_UNIFIED_SHARE_PANEL"
                                        }
                                      },
                                      "trackingParams": "CBAQkfsFGAEiEwjmsdXol8iWAxUsdOsIHfKxHaE="
                                    }
                                  }
                                ],
                                "trackingParams": "CA8QpzsiEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                                "accessibility": {
                                  "accessibilityData": {
                                    "label": "Action menu"
                                  }
                                }
                              }
                            },
                            "flexColumnDisplayStyle": "MUSIC_RESPONSIVE_LIST_ITEM_FLEX_COLUMN_DISPLAY_STYLE_TWO_LINE_STACK",
                            "navigationEndpoint": {
                              "clickTrackingParams": "CA4Q7uAIGAAiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X",
                              "browseEndpoint": {
                                "browseId": "MPSPPLIks7O5WrJkU4XEmgx56RLj864WW04ueA",
                                "browseEndpointContextSupportedConfigs": {
                                  "browseEndpointContextMusicConfig": {
                                    "pageType": "MUSIC_PAGE_TYPE_PODCAST_SHOW_DETAIL_PAGE"
                                  }
                                }
                              }
                            },
                            "itemHeight": "MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_TALL"
                          }
                        }
                      ],
                      "trackingParams": "CA0Quy8YHiITCOax1eiXyJYDFSx06wgd8rEdoQ=="
                    }
                  }
                ],
                "trackingParams": "CAIQui8iEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                "header": {
                  "chipCloudRenderer": {
                    "chips": [
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Videos"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAwQ_V0YACITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgWKAQIQAWoSEAQQAxAOEAUQCRAKEBAQFRAR"
                            }
                          },
                          "trackingParams": "CAwQ_V0YACITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show video results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Videos"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Songs"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAsQ_V0YASITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgWKAQIIAWoSEAQQAxAOEAUQCRAKEBAQFRAR"
                            }
                          },
                          "trackingParams": "CAsQ_V0YASITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show song results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Songs"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Featured playlists"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAoQ_V0YAiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgeKAQQoADgBahIQBBADEA4QBRAJEAoQEBAVEBE%3D"
                            }
                          },
                          "trackingParams": "CAoQ_V0YAiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show featured playlist results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Featured playlists"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Artists"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAkQ_V0YAyITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgWKAQIgAWoSEAQQAxAOEAUQCRAKEBAQFRAR"
                            }
                          },
                          "trackingParams": "CAkQ_V0YAyITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show artist results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Artists"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Albums"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAgQ_V0YBCITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgWKAQIYAWoSEAQQAxAOEAUQCRAKEBAQFRAR"
                            }
                          },
                          "trackingParams": "CAgQ_V0YBCITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show album results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Albums"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Community playlists"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAcQ_V0YBSITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgeKAQQoAEABahIQBBADEA4QBRAJEAoQEBAVEBE%3D"
                            }
                          },
                          "trackingParams": "CAcQ_V0YBSITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show community playlist results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Community playlists"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Episodes"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAYQ_V0YBiITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgWKAQJIAWoSEAQQAxAOEAUQCRAKEBAQFRAR"
                            }
                          },
                          "trackingParams": "CAYQ_V0YBiITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show podcast episode results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Episodes"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Profiles"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAUQ_V0YByITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgWKAQJYAWoSEAQQAxAOEAUQCRAKEBAQFRAR"
                            }
                          },
                          "trackingParams": "CAUQ_V0YByITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show profile results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Profiles"
                        }
                      },
                      {
                        "chipCloudChipRenderer": {
                          "style": {
                            "styleType": "STYLE_DEFAULT"
                          },
                          "text": {
                            "runs": [
                              {
                                "text": "Podcasts"
                              }
                            ]
                          },
                          "navigationEndpoint": {
                            "clickTrackingParams": "CAQQ_V0YCCITCOax1eiXyJYDFSx06wgd8rEdocoBBLRF_5c=",
                            "searchEndpoint": {
                              "query": "tu chaiye",
                              "params": "EgWKAQJQAWoSEAQQAxAOEAUQCRAKEBAQFRAR"
                            }
                          },
                          "trackingParams": "CAQQ_V0YCCITCOax1eiXyJYDFSx06wgd8rEdoQ==",
                          "accessibilityData": {
                            "accessibilityData": {
                              "label": "Show podcast results"
                            }
                          },
                          "isSelected": false,
                          "uniqueId": "Podcasts"
                        }
                      }
                    ],
                    "collapsedRowCount": 1,
                    "trackingParams": "CAMQ_F0iEwjmsdXol8iWAxUsdOsIHfKxHaE=",
                    "horizontalScrollable": true
                  }
                }
              }
            },
            "tabIdentifier": "music_search_catalog",
            "trackingParams": "CAEQ8JMBGAAiEwjmsdXol8iWAxUsdOsIHfKxHaE="
          }
        }
      ]
    }
  },
  "trackingParams": "CAAQvGkiEwjmsdXol8iWAxUsdOsIHfKxHaHKAQS0Rf-X"
};
