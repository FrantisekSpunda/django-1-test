  // GET SEARCH FORM AND PAGE LINKS
  const searchForm = document.getElementById('searchForm')
  const pageLinks = document.getElementsByClassName('page-link')

  // ENSURE SEARCH FORM EXISTS
  if(searchForm) {
    for(let i = 0; pageLinks.length > i; i++) {
      pageLinks[i].addEventListener('click', (e) => {
        e.preventDefault()

        // GET DATA ATTRIBUTE
        let page = pageLinks[i].dataset.page

        // ADD HIDDEN SEARCH INPUT TO FORM
        searchForm.innerHTML += `<input name="page" value="${ page }" hidden />`

        // SUBMIT FORM
        searchForm.submit()
      }) 
    }
  }