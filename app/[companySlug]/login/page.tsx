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
  IconButton
} from '@mui/material';
import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {useAtomValue} from 'jotai';
import {allFooterDataAtom} from '@/app/atoms';

export default function LoginPage() {
  const {companySlug} = useParams<{companySlug: string}>();
  const allFooterData = useAtomValue(allFooterDataAtom);

  const footerData = allFooterData.get(companySlug) as FooterData;
  const {logo_image: logoImage} = footerData;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
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
              <Link href="#" className="underline text-blue-600 hover:text-blue-800">
                Esqueci minha senha
              </Link>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              className="mb-3"
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
      <div className="w-full h-full lg:w-1/2 xl:w-3/5 bg-blue-900 flex justify-center items-center relative">
        <Image
          src="/login_image.png"
          alt="login image"
          fill
          style={{objectFit: 'cover', objectPosition: 'center'}}
          priority
        />
      </div>
    </div>
  );
}
