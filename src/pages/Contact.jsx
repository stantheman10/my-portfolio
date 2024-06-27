import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Loader from '../components/Loader'
import Banana from '../models/Banana'
import { Canvas } from '@react-three/fiber'
import useAlert from '../hooks/useAlert'
import Alert from '../components/Alert'


const Contact = () => {

  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [animationState, setAnimationState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const { alert,showAlert, hideAlert } = useAlert();


  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
   }

  const handleFocus = () => { 
    const anim = ['Emote Boogie Down', 'Emote AfroHouse'];
    setCurrentAnimation(anim[Math.floor((Math.random()*anim.length))])
  
  }

  const handleBlur = () => { setCurrentAnimation('Static pose') }

  const handleSubmit = (e) => { 
        e.preventDefault();
        setCurrentAnimation('Emote Acrobatic Superhero');
        setIsLoading(true);
        emailjs.send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,

          
          {
            from_name : form.name,
            to_name : 'Stanric',
            from_email : form.email,
            to_email : 'stan.cardozo@gmail.com',
            message : form.message

          },
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        ).then(()=>{
          setIsLoading(false);
          
          //SHow success message

          showAlert({
            show:true, text: 'Message sent successfully', type: 'success'
          })

          setTimeout(()=>{
            hideAlert();
              setCurrentAnimation('Static pose');
          },3750)

          setForm({name:'', email: '', message: ''});

        }).catch((err)=>{
          setIsLoading(false);
          setCurrentAnimation('Static pose');
          showAlert({
            show:true, text: 'Message was not sent', type: 'danger'
          })
          console.log(err);
          //to do message sgow
        })
  }

  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert}/>}
      
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form  onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-14'>
          <label htmlFor="" className="text-black-500 font-semibold">
            Name
            <input type="text" name="name" placeholder="Bro" className="input" required value={form.name} onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label htmlFor="" className="text-black-500 font-semibold">
            Email
            <input type="email" name="email" placeholder="bro@gmail.com" className="input" required value={form.email} onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label htmlFor="" className="text-black-500 font-semibold">
            Your Message
            <textarea name="message" placeholder="let me know how i can help you !" className="input" required value={form.message} onChange={handleChange}
              rows={4} onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type='submit'
            className='btn'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}

          >
            {isLoading? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
          <Canvas
            camera={
              {
                position: [0, 0, 5],
                fov: 75,
                near: 0.1,
                far: 1000
              }
            }
          >
            <directionalLight intensity={0.2} position={[0, 0, 1]} />
            <ambientLight intensity={5} />
            <Suspense fallback={<Loader />}>
                <Banana 
                currentAnimation={currentAnimation}
                position={[0.5,-1.5,0]}
                rotation={[6.2,0.5,0]}
                scale={[1.8, 1.8, 1.8]}
                />
            </Suspense>
          </Canvas>
      </div>

    </section>
  )
}

export default Contact
