import type {ChipProps} from '@mui/material';
import {Chip} from '@mui/material';

type SChipProps = ChipProps & {
  color?: string;
  size?: string;
};

export default function SChip({color = 'gray', size = 'small', sx, ...props}: SChipProps) {
  return (
    <Chip
      color={color}
      size={size}
      sx={{
        borderRadius: '4px',
        ...sx
      }}
      {...props}
    />
  );
}
