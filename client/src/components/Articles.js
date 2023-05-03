import React, { useState } from 'react'
import AddArticle from './AddArticle'
import MyArticles from './MyArticles'

function Articles({userDetails, user}) {

  let loggedInUser = userDetails;

  const [open, setOpen] = useState(true)

  return (
    <div>
        <h1 className='pb-6 text-[#F9500D] text-2xl font-bold text-center'>My Articles</h1>
        <div class="flex justify-end">
          <button className='bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] rounded-md font-medium w-[200px] ml-4 my-6 px-1 py-3 text-base'
          onClick={() => setOpen(!open)}
        >
            {open? '+AddArticle' : 'Back'}
          </button>
        </div>
        {open? <MyArticles user = {user} userDetails= {userDetails}/> : <AddArticle user = {user} loggedInUser={loggedInUser} setOpen={setOpen} open={open} />}
    </div>
  )
}

export default Articles