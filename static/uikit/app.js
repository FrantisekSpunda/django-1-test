let alertWrappers = document.querySelectorAll('.alert');
let alertCloses = document.querySelectorAll('.alert__close');

if(alertWrappers) {
  alertWrappers.forEach(wrapper => {
    alertCloses.forEach(close => {
      close.addEventListener('click', () => {
        wrapper.style.display = 'none';
      })

      setTimeout(() => {
        wrapper.style.display = 'none';
      }, 3000)
    });
  })
}