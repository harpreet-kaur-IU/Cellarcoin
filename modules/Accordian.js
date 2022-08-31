import React from 'react'
import FAQAccordian from './FAQAccordian';
import style from './css/Accordian.module.css'
const Accordian = () => {
  return (
        <div>
            <div className='container'>
                <h2 className='font-49 f-600 l-137 text-center mt-64'>Frequently Asked Questions</h2>
                <div className={`${style["faq-accordian-item"]}`}>
                    <FAQAccordian 
                        title="What is Enotecum"
                        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
                        laborum cupiditate possimus labore, hic temporibus velit dicta earum
                        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
                        voluptatem." 
                    />
                    <FAQAccordian 
                        title="What is Enotecum"
                        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
                        laborum cupiditate possimus labore, hic temporibus velit dicta earum
                        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
                        voluptatem." 
                    />
                </div>
            </div>
        </div>
  );
    
      
        
}

export default Accordian