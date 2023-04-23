import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    body {
        background: #fff;
        color: #2c053b;
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font: 400 1rem Poppins, sans-serif;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`;
