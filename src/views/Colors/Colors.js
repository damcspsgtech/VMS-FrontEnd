/*
* Theme and Color related functions
*/
export default function parseColor(value) {
  if (value !== undefined && value !== null) {
    if (value.toLowerCase() === 'red') {
      value = 'danger';
    }
    else if (value.toLowerCase() === 'blue') {
      value = 'primary';
    }
    else if (value.toLowerCase() === 'yellow') {
      value = 'warning';
    }
    else if (value.toLowerCase() === 'green') {
      value = 'success';
    }
    else if (value.toLowerCase() === 'white') {
      value = 'light';
    }
    else if (value.toLowerCase() === 'grey') {
      value = 'secondary';
    }
    else if (value.toLowerCase() === 'black') {
      value = 'dark';
    }
    else {
      return 'primary'
    }
  }
  else {
    return 'primary'
  }

  return value;
}