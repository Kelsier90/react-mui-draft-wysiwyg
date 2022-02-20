import Editor from "./Editor";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
// Main Layout
let themeUser = createTheme({
  type: "dark",
});

function App() {
  return (
    <ThemeProvider theme={themeUser}>
      <Box sx={{ p: 5 }}>
        <Editor />
      </Box>
    </ThemeProvider>
  );
}

export default App;
