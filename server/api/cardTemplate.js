const carouselCard = {
  type: "flex",
  altText: "carousel flex",
  contents: {
    type: "carousel",
    contents: [],
  },
}
function callCarouselCard(motoItem) {
  // console.log("motoItem:", motoItem)
  let contents = []

  for (let i = 0; i < motoItem.length; i++) {
    let context = {
      type: "bubble",
      hero: {
        type: "image",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        url: `${motoItem[i].image}`,
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "text",
            text: `${motoItem[i].motoStore}`,
            wrap: true,
            weight: "bold",
            size: "xxl",
          },
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: `${motoItem[i].motoCatalog}`,
                wrap: true,
                weight: "bold",
                size: "lg",
                flex: 0,
                color: "#fd7e14",
              },
              {
                type: "text",
                text: `${motoItem[i].cc}cc`,
                wrap: true,
                weight: "bold",
                size: "sm",
                flex: 0,
                color: "#17a2b8",
              },
            ],
            justifyContent: "space-between",
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            action: {
              type: "uri",
              label: "網站",
              uri: `${motoItem[i].web}`,
            },
          },
          {
            type: "button",
            action: {
              type: "message",
              label: "詳細資料",
              text: `${motoItem[i].motoData}`,
            },
          },
        ],
      },
    }
    contents.push(context)
    // carouselCard.contents.contents.push(context)
  }
  carouselCard.contents.contents = contents
  return carouselCard
}

function callCarouselCardDetail(motoItem) {
  // console.log("motoItemDetail:", motoItem)
  return {
    type: "flex",
    altText: "This is a flex message",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: `${motoItem.image}`,
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: `${motoItem.motoStore}`,
            weight: "bold",
            size: "xxl",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "車款",
                    size: "md",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: `${motoItem.motoCatalog}`,
                    flex: 5,
                    size: "md",
                  },
                ],
                borderWidth: "none",
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "引擎形式",
                    size: "md",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: `${motoItem.engine}`,
                    wrap: true,
                    size: "md",
                    flex: 5,
                  },
                ],
                borderWidth: "none",
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "排氣量",
                    size: "md",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: `${motoItem.cc}c.c.`,
                    wrap: true,
                    size: "md",
                    flex: 5,
                  },
                ],
                borderWidth: "none",
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "變速型式",
                    size: "md",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: `${motoItem.variable}`,
                    wrap: true,
                    size: "md",
                    flex: 5,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "油箱容量",
                    size: "md",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: `${motoItem.oil}`,
                    wrap: true,
                    size: "md",
                    flex: 5,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "煞車型式",
                    size: "md",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: `${motoItem.brake}`,
                    wrap: true,
                    size: "md",
                    flex: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
            action: {
              type: "uri",
              label: "網站",
              uri: `${motoItem.web}`,
            },
          },
        ],
        flex: 0,
      },
    },
  }
}


module.exports = {
  callCarouselCard,
  callCarouselCardDetail
}
