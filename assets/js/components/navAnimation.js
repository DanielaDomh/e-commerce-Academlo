function navAnimation () {
    const header = document.getElementById('header')

    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY >= 50) {
          header.classList.add('nav-animation')
        } else {
          header.classList.remove('nav-animation')
        }
      })
    }
}

export default navAnimation