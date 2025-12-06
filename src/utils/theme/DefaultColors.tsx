import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";

declare module "@mui/material/styles" {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: Record<string, any>;
      };
    };
  }
}

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#13DEB9",
      light: "#E6FFFA",
      dark: "#02b3a9",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    success: {
      main: "#13DEB9",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },

    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       border: "none",
    //       "& .MuiDataGrid-columnHeaders": {
    //         backgroundColor: "#F8F9FA",
    //         borderBottom: "2px solid #E5EAEF",
    //         minHeight: "56px !important",
    //         maxHeight: "56px !important",
    //         "& .MuiDataGrid-columnHeader": {
    //           fontWeight: 700,
    //           fontSize: "0.8125rem",
    //           color: "#2A3547",
    //           letterSpacing: "0.5px",
    //           textTransform: "uppercase",
    //           "&:focus, &:focus-within": {
    //             outline: "none",
    //           },
    //         },
    //       },
    //       "& .MuiDataGrid-columnHeader:hover": {
    //         backgroundColor: "transparent",
    //       },
    //       "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
    //         padding: "0px 15px",
    //         borderBottom: "1px solid #F2F6FA",
    //       },
    //       "& .MuiDataGrid-row": {
    //         borderBottom: "1px solid #F2F6FA",
    //         // transition: "all 0.2s ease-in-out",
    //         cursor: "pointer",
    //         "&:nth-of-type(even)": {
    //           backgroundColor: "#FAFBFC",
    //         },
    //         "&:nth-of-type(odd)": {
    //           backgroundColor: "#FFFFFF",
    //         },
    //         "&:hover": {
    //           backgroundColor: "#E6FFFA !important",
    //           boxShadow: "0 2px 8px rgba(19, 222, 185, 0.1)",
    //         },
    //         "&.Mui-selected": {
    //           backgroundColor: "#E6FFFA !important",
    //           "&:hover": {
    //             backgroundColor: "#D4F5ED !important",
    //           },
    //         },
    //       },
    //       "& .MuiDataGrid-cell": {
    //         fontSize: "0.875rem",
    //         color: "#2A3547",
    //         borderBottom: "none",
    //         "&:focus, &:focus-within": {
    //           outline: "none",
    //         },
    //       },
    //       "& .MuiDataGrid-footerContainer": {
    //         // borderTop: "1px solid #E5EAEF",
    //         minHeight: "64px !important",
    //       },
    //       "& .MuiDataGrid-virtualScroller": {
    //         "&::-webkit-scrollbar": {
    //           width: "8px",
    //           height: "8px",
    //         },
    //         "&::-webkit-scrollbar-track": {
    //           backgroundColor: "#F2F6FA",
    //         },
    //         "&::-webkit-scrollbar-thumb": {
    //           backgroundColor: "#DFE5EF",
    //           borderRadius: "4px",
    //           "&:hover": {
    //             backgroundColor: "#7C8FAC",
    //           },
    //         },
    //       },
    //       "& .MuiDataGrid-iconButtonContainer": {
    //         visibility: "visible",
    //       },
    //       "& .MuiDataGrid-sortIcon": {
    //         opacity: 1,
    //         // color: "#13DEB9",
    //       },
    //     },
    //   },
    // },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #E5EAEF",
          },
          "& .MuiDataGrid-columnHeader": {
            fontWeight: 700,
            fontSize: 13,
          },
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
            padding: "0px 15px",
            // borderRight: "2px solid #E5EAEF",
          },
          "& .MuiDataGrid-cell": {
            fontSize: 12,
            fontWeight: 400,
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#f9fafb",
            "&:hover": {
              backgroundColor: "#e5e7eb",
            },
          },

          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#ffffff",
            "&:hover": {
              backgroundColor: "#e5e7eb",
            },
          },
        },
      },
    },
  },
});

export { baselightTheme };
