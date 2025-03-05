import React from 'react'
import Navbar from './../component/navbar'
import Tabs from '../component/Tabs'
import Footer from '../component/footer'




function Fillit() {
  return (
    <div>
<Navbar/>
<span>
<h1> BLog page</h1>
<h2>this is the blog page where you can ......</h2>
</span>
{/* upper  */}
<span>
    <input placeholder='Email'/>
    <button>subscribe</button> 
</span>
{/* innernavbar */}

<span>
<Tabs />
</span>
<hr/>

<Footer/>
    </div>
  )
}

export default Fillit