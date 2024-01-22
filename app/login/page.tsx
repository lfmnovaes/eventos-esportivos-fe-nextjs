'use client';

import type {ChangeEvent, FormEvent} from 'react';
import {Suspense, useEffect, useState} from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Dialog,
  Drawer
} from '@mui/material';
import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import useWindowSize from '@/app/lib/useWindowSize';
import getScreenSizes from '@/app/lib/getScreenSizes';
import ForgotPassword from './forgot-password';
import LoginHandler from './login-handler';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showForgotPassModal, setShowForgotPassModal] = useState<boolean>(false);
  const [showForgotPassDrawer, setShowForgotPassDrawer] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [shouldLogin, setShouldLogin] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShouldLogin(true);
    if (rememberMe) {
      localStorage.setItem('userEmail', email);
    } else {
      localStorage.removeItem('userEmail');
    }
  };

  const screenSizes = getScreenSizes();
  const windowSize = useWindowSize();

  const handleForgotPassClick = () => {
    if (windowSize < parseInt(screenSizes.lg)) {
      setShowForgotPassDrawer(true);
    } else {
      setShowForgotPassModal(true);
    }
  };

  const closeForgotPass = () => {
    setShowForgotPassModal(false);
    setShowForgotPassDrawer(false);
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center items-center py-12 px-4">
        <form className="max-w-md w-full pb-12 flex flex-col gap-4" onSubmit={handleLogin}>
          <Image
            src="/logo.png" // TODO: Replace with the Apex hub logo
            alt="login logo"
            width={235}
            height={53}
            priority
            className="self-center pb-8"
          />
          <div className="mb-2 font-medium">
            <h2 className="text-gray-80">Por favor, faça o login para continuar</h2>
          </div>
          <FormControl component="fieldset" className="w-full">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{shrink: true}}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputLabelProps={{shrink: true}}
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div className="flex justify-between items-center">
              <FormControlLabel
                label="Lembrar-me"
                control={
                  <Checkbox
                    color="primary"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                }
              />
              <MuiLink
                component="button"
                type="button"
                color="primary"
                onClick={handleForgotPassClick}
              >
                Esqueci minha senha
              </MuiLink>
            </div>
            {loginError ? (
              <div className="text-red-600 py-2">E-mail ou senha inválidos</div>
            ) : (
              <div className="text-transparent py-2">placeholder</div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              size="large"
              sx={{height: '48px'}}
            >
              Entrar
            </Button>
          </FormControl>
        </form>
        {shouldLogin && (
          <Suspense fallback={null}>
            <LoginHandler email={email} password={password} setLoginError={setLoginError} />
          </Suspense>
        )}
        <div className="flex gap-2">
          <span>Não possui uma conta?</span>
          <Link href="/signup" className="underline text-blue-600 hover:text-blue-800">
            Criar conta
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2 xl:w-3/5 flex justify-center items-center ">
        <div className="w-full h-[600px] lg:h-full relative">
          <Image
            src="/login_image.png"
            alt="login image"
            fill
            style={{objectFit: 'cover', objectPosition: 'center'}}
            priority
          />
        </div>
      </div>
      <Dialog
        open={showForgotPassModal}
        onClose={closeForgotPass}
        PaperProps={{sx: {borderRadius: '16px'}}}
      >
        <ForgotPassword onClose={closeForgotPass} />
      </Dialog>
      <Drawer anchor="bottom" open={showForgotPassDrawer} onClose={closeForgotPass}>
        <ForgotPassword onClose={closeForgotPass} />
      </Drawer>
    </div>
  );
}
