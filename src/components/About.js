import React from 'react'

export default function About() {
    
  return (
    <div className='container' >
        <h1 className='my-4'>About Us</h1>
        <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button  className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        About creater
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div  className="accordion-body">
        <strong>Hey! welcome to my website. I am <code>Lalit Kishor</code>. I am a problem solver and passionate of web dev, having knowledge of programming languages like
        <ul>
          <li>C++</li>
          <li>C</li>
          <li>Python</li>
          <li>JavaScript</li>
          <li>TypeScript</li>
          </ul>
          and <b>Technologies and Framework</b> like
          <ul>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Django</li>
            <li>Express.js</li>
            <li>MongoDb</li>
            <li>Mongooes</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>...</li>
            </ul> <br/> I am a 3rd year <i>Undergrad</i> student of <code>NIT Agartala</code> . Persuing <i>B.tech</i> in <code>Computer Science and Engineering</code>. <br></br>NO GREAT ACHIEVEMENT YET...</strong> 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button  className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        About web-app
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div  className="accordion-body">
     <strong> Welcome to iNotebook </strong><br />

<i>iNotebook is a user-friendly web application that features a secure user authentication system. It enables users to
effortlessly manage their notes, ensuring that their thoughts and ideas can be captured, edited, and accessed
anytime, anywhere. Users have the flexibility to edit their existing notes as well as delete ones they no longer need.
This platform provides a seamless experience for efficient note-taking and organization.
</i>
<br /><br />
<strong>Main Features:-</strong><br /><br />

<strong>User-Friendly Interface:</strong><br />
iNotebook offers an intuitive and easy-to-navigate user interface, making it accessible for users of all levels of technical expertise.<br /><br />
<strong>Secure User Authentication:</strong><br />
A robust authentication system ensures that user data and notes are kept secure and private.<br /><br />
<strong>Note Creation and Editing:</strong><br />
Users can effortlessly create new notes and edit them to capture and refine their thoughts and ideas.<br /><br />
<strong>Cloud Storage:</strong><br />
iNotebook stores notes securely in the cloud, allowing users to access their notes from any device with an internet connection.<br />
<br />
<strong>Note Organization:</strong><br />
Users can categorize and organize their notes using tags or categories for easy retrieval.<br />
<br />
<i>iNotebook boasts a clean and intuitive interface, ensuring ease of use for individuals of all skill levels. It emphasizes speed and efficiency in managing and accessing your notes, allowing you to focus on your work and ideas.</i>
      </div>
    </div>
  </div>
  
    </div>
    </div>
  )
}
