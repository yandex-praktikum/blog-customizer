import type { Preview } from "@storybook/react";
import { StoryDecorator } from "../src/ui/story-decorator/StoryDecorator";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StoryDecorator],
};

export default preview;
