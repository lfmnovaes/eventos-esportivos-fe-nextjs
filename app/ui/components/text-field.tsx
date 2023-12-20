// Customization needed because of: https://github.com/mui/material-ui/issues/13898

import type {ReactElement} from 'react';
import {useState} from 'react';
import type {TextFieldProps, SvgIconProps, SxProps, Theme} from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

type CustomTextFieldProps = TextFieldProps & {
  startIcon?: ReactElement<SvgIconProps>;
};

export default function CustomTextField({
  startIcon,
  InputProps,
  InputLabelProps,
  sx,
  ...props
}: CustomTextFieldProps) {
  const [shrinkTextFieldLabel, setShrinkTextFieldLabel] = useState(false);

  const customStyles: SxProps<Theme> = startIcon
    ? {
        '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
          transform: 'translate(3rem, 1rem)'
        }
      }
    : {};

  return (
    <TextField
      {...props}
      sx={{...customStyles, ...sx}}
      onFocus={() => setShrinkTextFieldLabel(true)}
      onBlur={(e) => {
        !e.target.value && setShrinkTextFieldLabel(false);
      }}
      InputProps={{
        ...InputProps,
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : null
      }}
      InputLabelProps={{...InputLabelProps, shrink: shrinkTextFieldLabel}}
    />
  );
}
