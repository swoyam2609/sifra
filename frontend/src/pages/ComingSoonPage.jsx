import React, { useState,useEffect } from 'react'
import Sifra from '/Sifra.png'
import gemini from '/geminiimg.png'
import mobimg from '/mobilebgimg.jpg'


import './ComingSoonPage.css'
const ComingSoonPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [email, setEmail] = useState('');

  const handlenotify = async()=>{
    const emailParam = encodeURIComponent(email);
    const endpoint = `http://127.0.0.1:3000/user/waitlist?email=${emailParam}`;
    const data = { email: email };
    try{
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 400) {
     
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Bad request');
        }else{
          throw new Error('Network response was not ok');}
        }
          
        const result = await response.json();
         console.log(result); // Process the response as needed
         alert('You have been added to the waitlist!'); 
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          // Display the specific error message from the catch block
          alert(error.message);
        }
      }

      useEffect(()=>{
        const handleResize=()=>{
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize',handleResize);
        return()=> window.removeEventListener('resize',handleResize);
      },[]);

      const backgroundImage = windowWidth < 472 ? `url(${mobimg})` : `url(${Sifra})`;
 

  return (
    <div className=" book  w-screen min-h-screen bg-no-repeat bg-center bg-cover flex items-start justify-start mob"
         style={{ backgroundImage: backgroundImage}}>
     <div className='w-screen heading'>
     <div className='flex items-end justify-end gemini '>
    <img src={gemini} alt="Gemini" />
     </div>
      <h1 className="heading text-5xl  text-white leading-normal font-normal "><span className=' text-6xl max-xsm:pl-14 font-bold text-[#AE8DFF] max-xsm:text-4xl'>Hey👋 <br className='res' /></span> am <span className='text-7xl font-bold sifragradient max-xsm:text-4xl big '>Sifra</span>, <br className='res1 ' /><span className='max-xsm:pl-9'>your personal </span> <span className='text-7xl font-bold aibuddygrad max-xsm:text-4xl big '>AI Buddy</span> <br className='res' /> <br className='res1' /></h1>
      <div className='text-4xl pl-11 cominggrad max-xsm:pl-0 max-xsm:text-2xl sm:text-start max-xsm:text-center '>coming soon<span className='com'>.................</span></div>
      <h2 className=' heading max-xsm:text-center max-xsm:px-12 max-xsm:pt-28   mt-9 text-3xl max-xsm:text-xl text-white heading '>About<span className='text-5xl font-bold  sifragradient max-xsm:text-4xl'> Sifra</span></h2>
      <p className=' para1  pr-10 mt-6 text-2xl text-white max-xsm:pl-10 max-xsm:text-xl heading'>Meet Sifra, your 24/7 personal Artificial Intelligence buddy! 🤖✨ <br />
Whether you need help staying organized,<br />
quick answers to burning questions, or just a friendly chat,<br />
Sifra is here to make your day brighter. 🌞💬 </p>
<p className=' para  pr-10 mt-6 text-2xl text-white max-xsm:pl-10 max-xsm:text-xl heading' >Powered by Google’s latest Gemini model, <br />
Sifra not only understands your needs with precision but also <br /> remembers your preferences and past conversations, <br />
ensuring a personalized experience every time. <br />
Let Sifra simplify your life with its intuitive AI capabilities and <br /> friendly demeanor! 🌟🎉</p>

<div className='input max-xsm:flex flex-col justify-center items-center'>
  <input className=' ml-20 mt-10 pr-12 p-1 rounded-lg placeholder-grey-800 max-xsm:ml-12  max-xsm:p-3 max-xsm:mt-0 ' placeholder='email address' type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
  <button className='bg-[#AE8DFF] text-white ml-3 p-2 pr-3 pl-3 rounded-lg border font-semibold notifybtn max-xsm:mt-5 'onClick={handlenotify}>Notify Me</button>
 </div> 
  </div>
  
    </div>
  
  )
}


export default ComingSoonPage