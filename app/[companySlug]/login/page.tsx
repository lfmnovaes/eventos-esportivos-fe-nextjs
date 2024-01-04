'use client';

import type {FooterData} from '@/app/lib/definitions';
import {useState} from 'react';
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
  VisibilityOutlined as VisibilityOutlinedIcon,
  CloseOutlined as CloseIcon
} from '@mui/icons-material';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {useAtomValue} from 'jotai';
import {allFooterDataAtom} from '@/app/atoms';
import useWindowSize from '@/app/lib/useWidowSize';
import getScreenSizes from '@/app/lib/getScreenSizes';

function ForgotPasswordContent({onClose}: {onClose: () => void}) {
  return (
    <div className="p-4 h-auto flex flex-col gap-6 relative pb-16 lg:pb-4">
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      >
        <CloseIcon />
      </IconButton>
      <Image
        className="py-4 self-center"
        src={'/kart-red.png'}
        alt="no results red kart"
        width={42}
        height={28}
      />
      <h3 className="font-medium text-center">
        Informe seu e-mail de cadastro abaixo e a seguir te enviaremos um link por e-mail para
        recadastrar a senha.
      </h3>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="forgot-email"
        label="Endereço de e-mail"
        name="email"
        autoFocus
        InputLabelProps={{shrink: true}}
        placeholder="Digite seu e-mail"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="info"
        size="large"
        sx={{height: '40px'}}
      >
        Enviar
      </Button>
    </div>
  );
}

export default function LoginPage() {
  const {companySlug} = useParams<{companySlug: string}>();
  const allFooterData = useAtomValue(allFooterDataAtom);
  const footerData = allFooterData.get(companySlug) as FooterData;
  const {logo_image: logoImage} = footerData;

  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const [showForgotPassDrawer, setShowForgotPassDrawer] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center items-center py-12 px-4">
        <div className="max-w-md w-full pb-12 flex flex-col gap-4">
          <Image
            src={logoImage}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div className="flex justify-between items-center mb-4">
              <FormControlLabel label="Lembrar-me" control={<Checkbox color="primary" />} />
              <MuiLink component="button" color="primary" onClick={handleForgotPassClick}>
                Esqueci minha senha
              </MuiLink>
            </div>
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
        </div>
        <div className="flex gap-2">
          <span>Não possui uma conta?</span>
          <Link
            href={`/${companySlug}/signup`}
            className="underline text-blue-600 hover:text-blue-800"
          >
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
      <Dialog open={showForgotPassModal} onClose={closeForgotPass}>
        <ForgotPasswordContent onClose={closeForgotPass} />
      </Dialog>
      <Drawer anchor="bottom" open={showForgotPassDrawer} onClose={closeForgotPass}>
        <ForgotPasswordContent onClose={closeForgotPass} />
      </Drawer>
    </div>
  );
}
