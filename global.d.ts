/// <reference types="nativewind/types" />

declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}

declare type TwTheme = {
    theme: {
        extend: {},
        colors: {
            primary: "#138BAC",
            secondary: "#BFE3EB",
            tertiary: "#0E1C36",
            white: "#FFFFFF",
            gray: {
                100: "#F6F6F6",
                200: "#E5E5E5",
                300: "#D4D4D4",
                400: "#A3A3A3",
                500: "#737373",
                600: "#525252",
                700: "#404040",
                800: "#262626",
                900: "#171717",
            }
        },
    },
};