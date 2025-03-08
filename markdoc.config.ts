import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    alert: {
      render: component("./src/components/docs/markdoc/Alert.astro"),
      attributes: {
        level: { type: String },
      },
    },
  },
  nodes: {
    image: {
      ...nodes.image,
      attributes: {
        ...nodes.image.attributes,
        __optimizedSrc: { type: "Object" },
      },
      render: component("./src/components/docs/markdoc/Image.astro"),
    },
    fence: {
      render: component("./src/components/docs/markdoc/Fence.astro"),
      attributes: {
        language: {
          type: "String",
          required: true,
          render: "lang",
        },
        title: {
          type: "String",
        },
        content: {
          type: "String",
          render: "code",
          required: true,
        },
      },
    },
  },
});
