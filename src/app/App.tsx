import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { LoginPage, Layout, HomePage, CreatePage, EditPage } from '@pages/';
import { $isAuthenticated, appStarted, getAuthUserFx } from '@features/auth/model';
import { navigateTo } from '@features/user/model/users';

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
  const isAuthenticated = useUnit($isAuthenticated)
  const initApp = useUnit(appStarted)
  const isCheckingAuth = useUnit(getAuthUserFx.pending)
  const navigate = useNavigate()

  useEffect(() => {
    return navigateTo.watch((path) => {
      navigate(path);
    });
  }, [navigate])

  useEffect(() => {
    initApp();
  }, [initApp]);


  useEffect(() => {
    if (!isCheckingAuth) {
      if (isAuthenticated) {
        if (window.location.pathname === '/login') {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isCheckingAuth, navigate]);
  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/create" element={<CreatePage/>}/>
          <Route path="/user/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
