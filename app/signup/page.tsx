'use client';

import {useState} from 'react';
import Link from 'next/link';
import type {SelectChangeEvent, TextFieldProps} from '@mui/material';
import {
  Box,
  Container,
  TextField as MuiTextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material';
import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import TextMask from '@/app/ui/components/text-mask';

const primaryColor = '#072342';

const TextField: React.FC<TextFieldProps> = ({id, name, autoComplete, ...props}) => (
  <MuiTextField
    fullWidth
    required
    margin="normal"
    InputLabelProps={{shrink: true}}
    id={id}
    name={name ?? id}
    autoComplete={autoComplete ?? id}
    {...props}
  />
);

export default function SignupPage() {
  const [category, setCategory] = useState<string>('none');
  const [participant, setParticipant] = useState<string>('none');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };

  const handleParticipantChange = (event: SelectChangeEvent<unknown>) => {
    setParticipant(event.target.value as string);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box className="py-16" sx={{backgroundColor: primaryColor}}>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{borderRadius: '16px', backgroundColor: 'background.paper'}}
      >
        <Box className="p-8 flex justify-center">
          <FormControl component="fieldset" fullWidth>
            <Box className="w-full h-full border-2 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 pb-6">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-medium">Preencha seus dados corretamente</h2>
                  <p>* Todos os campos são obrigatórios</p>
                  <TextField
                    select
                    id="participant"
                    label="Você é?"
                    value={participant}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue:
                        participant !== 'none'
                          ? undefined
                          : () => <span className="opacity-40">Selecione uma opção</span>,
                      onChange: handleParticipantChange
                    }}
                  >
                    <MenuItem value="maior">Participante maior de idade</MenuItem>
                    <MenuItem value="responsavel">Responsável Legal</MenuItem>
                  </TextField>
                </div>
                <div className="justify-self-end">
                  {'Já possui uma conta? '}
                  <Link href="/signup" className="underline text-blue-600 hover:text-blue-800">
                    Faça login
                  </Link>
                </div>
              </div>
              <TextField
                autoFocus
                id="fullname"
                label="Nome completo"
                placeholder="Digite seu nome completo"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <TextField
                  id="cpf"
                  label="CPF"
                  placeholder="Digite seu CPF"
                  InputProps={{
                    inputComponent: TextMask as any,
                    inputProps: {
                      mask: '000.000.000-00',
                      definitionType: 'number'
                    }
                  }}
                />
                <TextField
                  id="cellphone"
                  label="Número de celular com DDD"
                  placeholder="Digite seu número de celular"
                  InputProps={{
                    inputComponent: TextMask as any,
                    inputProps: {
                      mask: '(00) 00000-0000',
                      definitionType: 'number'
                    }
                  }}
                />
                <TextField
                  id="birthdate"
                  label="Data de nascimento"
                  placeholder="__/__/____"
                  InputProps={{
                    inputComponent: TextMask as any,
                    inputProps: {
                      mask: '00/00/0000',
                      definitionType: 'number'
                    }
                  }}
                />
                <TextField
                  select
                  id="category"
                  label="Selecione a modalidade"
                  value={category}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue:
                      category !== 'none'
                        ? undefined
                        : () => <span className="opacity-40">Selecione uma opção</span>,
                    onChange: handleCategoryChange
                  }}
                >
                  <MenuItem value="mirim">Mirim</MenuItem>
                  <MenuItem value="cadete">Cadete</MenuItem>
                  <MenuItem value="adulto">Adulto</MenuItem>
                </TextField>
                <TextField id="email" label="E-mail" placeholder="Digite seu e-mail" />
                <TextField
                  id="email-confirm"
                  label="Confirmar e-mail"
                  placeholder="Confirme seu e-mail"
                />
                <TextField
                  id="password"
                  label="Criar senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite no mínimo 8 caracteres"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  id="password-confirm"
                  label="Confirmar senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className="pt-6 flex align-middle">
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography component="span">
                      Concordo com os{' '}
                      <Link href="#" className="underline text-blue-600 hover:text-blue-800">
                        termos e políticas
                      </Link>
                    </Typography>
                  }
                />
              </div>
            </Box>
            <Button variant="contained" color="info" size="large" sx={{alignSelf: 'flex-end'}}>
              Criar conta
            </Button>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
}
