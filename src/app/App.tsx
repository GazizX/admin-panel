import {LoginForm} from "@features/auth"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useUnit } from "effector-react";
import { $token } from "../features/auth/model/auth";
import HomePage from "../pages/home/HomePage";
import Layout from "../pages/layout/Layout";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#651fff",
    }
  },
});

function App() {
  const token = useUnit($token)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [token, navigate])
  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/user/create" element={<UserPage />} />
          <Route path="/user/edit" element={<UserPage />} /> */}
        </Route>
      </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
