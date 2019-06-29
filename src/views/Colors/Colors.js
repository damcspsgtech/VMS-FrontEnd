/*
* Theme and Color related functions
*/
export default function parseColor(value) {
  if (value !== undefined && value.toLowerCase() === 'red') {
    value = 'danger';
  }
  else if (value !== undefined && value.toLowerCase() === 'blue') {
    value = 'primary';
  }
  else if (value !== undefined && value.toLowerCase() === 'yellow') {
    value = 'warning';
  }
  else if (value !== undefined && value.toLowerCase() === 'green') {
    value = 'success';
  }
  else if (value !== undefined && value.toLowerCase() === 'white') {
    value = 'light';
  }
  else if (value !== undefined && value.toLowerCase() === 'black') {
    value = 'dark';
  }
  else {
    return 'primary'
  }
  return value;
}