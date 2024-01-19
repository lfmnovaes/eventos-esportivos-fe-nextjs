'use client';

import type {ChangeEvent} from 'react';
import {useState} from 'react';
import {TextField, Button, IconButton} from '@mui/material';
import {CloseOutlined as CloseIcon} from '@mui/icons-material';
import Image from 'next/image';
import {isValidEmail} from '@/app/lib/utils';

export default function ForgotPassword({onClose}: {onClose: () => void}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError('');
  };

  const handleButtonClick = () => {
    if (isValidEmail(email)) {
      setIsConfirmed(true);
    } else {
      setError('Por favor, digite um e-mail válido');
    }
  };

  if (isConfirmed) {
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
        <h3 className="text-2xl font-medium text-center">Pronto!</h3>
        <p className="text-center">
          Verifique a sua caixa de entrada, te enviamos um email para você recadastrar sua senha.
        </p>
        <Button
          onClick={onClose}
          fullWidth
          variant="contained"
          color="info"
          size="large"
          sx={{height: '40px'}}
        >
          Fechar
        </Button>
      </div>
    );
  }

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
        value={email}
        onChange={handleEmailChange}
        error={!!error}
        helperText={error}
      />
      <Button
        onClick={handleButtonClick}
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
