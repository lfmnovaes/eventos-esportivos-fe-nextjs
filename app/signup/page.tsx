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
  Typography,
  Divider
} from '@mui/material';
import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import type {OtherParticipant} from '@/app/lib/definitions';
import TextMask from '@/app/ui/components/text-mask';

const primaryColor = '#072342';

const MAX_NUMBER_OF_OTHER_PARTICIPANTS = 4;

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

const OtherParticipantSection = ({index}: {index: number}) => {
  const idPrefix = `other-${index}`;
  const title = `Perfil do Participante ${index + 1}`;
  const [otherCategory, setOtherCategory] = useState<string>('');

  const handleOtherCategoryChange = (event: SelectChangeEvent<unknown>) => {
    setOtherCategory(event.target.value as string);
  };

  return (
    <div className="w-full h-full border-0 md:border-2 rounded-2xl px-4 md:px-6 py-8 md:py-6 ">
      <h2 className="text-lg md:text-2xl font-medium pb-4">{title}</h2>
      <TextField
        id={`${idPrefix}-fullname`}
        label="Nome completo"
        placeholder="Digite seu nome completo do participante"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <TextField
          id={`${idPrefix}-cpf`}
          label="CPF"
          placeholder="Digite o CPF do participante"
          InputProps={{
            inputComponent: TextMask as any,
            inputProps: {
              mask: '000.000.000-00',
              definitionType: 'number'
            }
          }}
        />
        <TextField
          id={`${idPrefix}-cellphone`}
          label="Número de celular com DDD"
          placeholder="Digite o número com DDD"
          InputProps={{
            inputComponent: TextMask as any,
            inputProps: {
              mask: '(00) 00000-0000',
              definitionType: 'number'
            }
          }}
        />
        <TextField
          select
          id={`${idPrefix}-category`}
          label="Selecione a modalidade do participante"
          value={otherCategory}
          SelectProps={{
            displayEmpty: true,
            renderValue:
              otherCategory !== ''
                ? undefined
                : () => <span className="opacity-40">Selecione uma opção</span>,
            onChange: handleOtherCategoryChange
          }}
        >
          <MenuItem value="mirim">Mirim</MenuItem>
          <MenuItem value="cadete">Cadete</MenuItem>
          <MenuItem value="adulto">Adulto</MenuItem>
        </TextField>
        <TextField
          id={`${idPrefix}-birthdate`}
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
      </div>
    </div>
  );
};

export default function SignupPage() {
  const [category, setCategory] = useState<string>('');
  const [participant, setParticipant] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [participants, setParticipants] = useState<OtherParticipant[]>([{}]);

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };

  const handleParticipantChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value === 'responsavel') {
      setCategory('non-participant');
    } else if (category === 'non-participant') {
      setCategory('');
    }
    setParticipant(event.target.value as string);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const addParticipant = () => {
    if (participants.length < MAX_NUMBER_OF_OTHER_PARTICIPANTS) {
      setParticipants([...participants, {}]);
    }
  };

  const removeParticipant = () => {
    if (participants.length > 0) {
      setParticipants(participants.slice(0, -1));
    }
  };

  return (
    <Box className="py-0 sm:py-4 md:py-8 lg:py-12 xl:py-16" sx={{backgroundColor: primaryColor}}>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{borderRadius: '16px', backgroundColor: 'background.paper'}}
      >
        <div className="p-0 sm:p-2 md:p-4 lg:p-6 xl:p-8 flex justify-center">
          <FormControl component="fieldset" fullWidth>
            <div className="w-full h-full border-0 md:border-2 rounded-2xl px-4 md:px-6 py-8 md:py-6 mb-4 md:mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 pb-6">
                <div className="flex flex-col gap-4 order-2 md:order-1">
                  <h2 className="text-lg md:text-2xl font-medium">
                    Preencha seus dados corretamente
                  </h2>
                  <p>* Todos os campos são obrigatórios</p>
                  <TextField
                    select
                    autoFocus
                    id="participant"
                    label="Você é?"
                    value={participant}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue:
                        participant !== ''
                          ? undefined
                          : () => <span className="opacity-40">Selecione uma opção</span>,
                      onChange: handleParticipantChange
                    }}
                  >
                    <MenuItem value="maior">Participante maior de idade</MenuItem>
                    <MenuItem value="responsavel">Responsável Legal</MenuItem>
                  </TextField>
                </div>
                <div className="flex flex-col order-1 md:order-2 w-full">
                  <div className="flex gap-2 justify-center md:justify-end">
                    <p>Já possui uma conta?</p>
                    <Link href="/login" className="underline text-blue-600 hover:text-blue-800">
                      Faça login
                    </Link>
                  </div>
                  <Divider className="bg-gray-200 block md:hidden w-full" sx={{marginY: '32px'}} />
                </div>
              </div>
              <TextField
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
                      category !== ''
                        ? undefined
                        : () => <span className="opacity-40">Selecione uma opção</span>,
                    onChange: handleCategoryChange
                  }}
                >
                  {participant === 'responsavel' && (
                    <MenuItem value="non-participant">Não participante</MenuItem>
                  )}
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
              <Divider className="bg-gray-200 block md:hidden w-full" sx={{marginY: '32px'}} />
              <div className="md:pt-6 flex align-middle">
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
            </div>
            {participant === 'responsavel' && (
              <div className="flex flex-col gap-4 pb-4">
                {participants.map((_, index) => (
                  <OtherParticipantSection key={index} index={index} />
                ))}
                <div className="self-start">
                  {participants.length < MAX_NUMBER_OF_OTHER_PARTICIPANTS && (
                    <Button onClick={addParticipant}>+ Adicionar Participante</Button>
                  )}
                  {participants.length > 1 && (
                    <Button onClick={removeParticipant}>- Remover Participante</Button>
                  )}
                </div>
              </div>
            )}
            <div className="flex justify-end flex-col md:flex-row gap-4 px-4 md:px-0 pb-8 md:pb-0">
              <Link href="/login" passHref>
                <Button
                  variant="outlined"
                  color="info"
                  size="large"
                  className="w-full md:w-auto order-2 md:order-1"
                >
                  Voltar
                </Button>
              </Link>
              <Button
                variant="contained"
                color="info"
                size="large"
                className="w-full md:w-auto order-1 md:order-2"
              >
                Criar conta
              </Button>
            </div>
          </FormControl>
        </div>
      </Container>
    </Box>
  );
}
