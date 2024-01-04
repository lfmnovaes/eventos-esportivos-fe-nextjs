'use client';

import type {HomeTemplate} from '@/app/lib/definitions';
import {useParams} from 'next/navigation';
import {
  Box,
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl
} from '@mui/material';
import {useAtomValue} from 'jotai';
import {allTemplateDataAtom} from '@/app/atoms';

export default function SignupPage() {
  const {companySlug} = useParams<{companySlug: string}>();
  const allCompaniesTemplateData = useAtomValue(allTemplateDataAtom);
  const companyTemplateData = allCompaniesTemplateData.get(companySlug) as HomeTemplate;

  const {primary_color: primaryColor} = companyTemplateData;

  return (
    <Box sx={{paddingY: 8, backgroundColor: primaryColor}}>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{borderRadius: '16px', backgroundColor: 'background.paper'}}
      >
        <Box sx={{p: 4}} className="min-h-screen flex justify-center">
          <FormControl component="fieldset" className="w-full">
            <Box className="w-full h-full border-2 rounded-2xl p-6 mb-6">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Nome completo"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{shrink: true}}
                placeholder="Digite seu nome completo"
              />
              <TextField
                fullWidth
                required
                id="cpf"
                label="CPF"
                margin="normal"
                autoFocus
                InputLabelProps={{shrink: true}}
                placeholder="Digite seu CPF"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Concordo com os termos & políticas"
                sx={{mb: 2}}
              />
            </Box>
            <Button variant="contained" size="large" sx={{alignSelf: 'flex-end'}}>
              Criar conta
            </Button>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
}
