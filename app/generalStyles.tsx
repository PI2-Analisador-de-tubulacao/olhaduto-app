import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const BlueButton = withStyles({
  root: {
    width: '100%',
    height: '40px',
    borderRadius: '20px',
    fontStyle: 'normal',
    backgroundColor: '#44D9E6',
    '&:hover': {
      backgroundColor: '#36abb5',
    },
  },
  label: {
    fontSize: '16px',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    lineHeight: '19px',
    textTransform: 'uppercase',
  },
})(Button);

export default BlueButton;
