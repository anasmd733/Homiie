import { createTheme } from "@mui/material";
import { Colors } from "../Colors/Colors";

const theme = createTheme({
  // components:{
  //     MuiAppBar: {
  //       styleOverrides:{
  //           root: {
  //               boxShadow: 'none',
  //               backgroundColor: Colors.white,
  //               color: Colors.darkblue
  //             },
  //       }
  //   },
  // },
  colors : {
    primary : "#487AE2",
    secondary : "#EAC96B",
    green: "#68D183",
    yellow: "#E6B734",
    cement: "#C4CDDD",
    lightWhite: "#F7F9FC",
    white: "#FFFFFF",
    lightDarkBlue : "#123262",
    darkblue: "#333A44",
    black: "#000000",
    lightViolet: "#9299B5",
    red: "#D02929",
    gray : "#93a0b5",
  }
});

export default theme;