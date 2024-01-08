import {forwardRef} from 'react';
import {IMaskInput} from 'react-imask';

type MaskDefinitions = {
  number: {[key: string]: RegExp};
  string: {[key: string]: RegExp};
};

const getDefinitions = (type: keyof MaskDefinitions) => {
  const definitionsMap: MaskDefinitions = {
    number: {'#': /[1-9]/},
    string: {'#': /[A-Za-z]/}
  };

  return definitionsMap[type] || definitionsMap.number;
};

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
  mask: string;
  definitionType?: keyof MaskDefinitions;
}

export const TextMask = forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(
  props,
  ref
) {
  const {onChange, mask, definitionType = 'number', ...other} = props;
  const definitions = getDefinitions(definitionType);

  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={definitions}
      inputRef={ref}
      onAccept={(value: any) => onChange({target: {name: props.name, value}})}
      overwrite
    />
  );
});

export default TextMask;
